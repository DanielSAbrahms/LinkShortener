/* eslint-disable react/prop-types */
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import URLForm from "./URLForm";
import LinkResult from "./LinkResult";
import PathUpdateSuccessfulMessage from "./PathUpdateSuccessfulMessage";

const apiPath = {
  ADD_LINK: "https://localhost:5001/l/AddLink/",
  SUBMIT_PATH: "https://localhost:5001/l/UpdatePath/",
};

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
};

class URLBundle {
  constructor() {
    this.fullURL = "";
    this.shortURL = null;
  }
}

function LinkShortener() {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorization] = useState(false);
  const [pathUpdateSuccessful, setPathUpdateSuccessful] = useState(false);
  const [urlBundle, setURLBundle] = useState(new URLBundle());
  const [customPath, setCustomPath] = useState("");

  let urlSubmit = (event) => {
    setLoading(true);
    setPathUpdateSuccessful(false);
    event.preventDefault();
    fetch(apiPath.ADD_LINK, {
      ...requestOptions,
      body: JSON.stringify(urlBundle),
    })
      .then((res) => {
        if (res.status === 401) {
          setAuthorization(false);
        } else {
          setAuthorization(true);
          return res.json();
        }
      })
      .then((data) => {
        setLoading(false);
        if (data) {
          setURLBundle({ ...urlBundle, shortURL: data.shortURL });
        }
      });
  };

  let customPathSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    fetch(apiPath.SUBMIT_PATH, {
      ...requestOptions,
      body: JSON.stringify({ newPath: customPath, linkBundle: urlBundle }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (customPath) {
          setPathUpdateSuccessful(true);
          setURLBundle({ ...urlBundle, shortURL: data.shortURL });
        }
        setLoading(false);
      });
  };

  return (
    <div className="link-shortener-wrapper">
      <URLForm
        onURLSubmit={urlSubmit}
        onURLChange={(event) => {
          setURLBundle({ ...urlBundle, fullURL: event.target.value });
          setCustomPath("");
        }}
      />
      {loading ? (
        <CircularProgress />
      ) : urlBundle.shortURL ? (
        <LinkResult
          auth={authorized}
          link={urlBundle.shortURL}
          onPathSubmit={customPathSubmit}
          onPathChange={(event) => setCustomPath(event.target.value)}
        />
      ) : null}
      {pathUpdateSuccessful ? <PathUpdateSuccessfulMessage /> : null}
    </div>
  );
}

export default LinkShortener;
