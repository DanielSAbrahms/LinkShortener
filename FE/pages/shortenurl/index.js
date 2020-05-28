import { useState } from "react";
import { Button, Paper, TextField, CircularProgress } from "@material-ui/core";

const apiPath = "https://localhost:5001/l/AddLink/";

class URLBundle {
  constructor() {
    this.fullURL = "";
    this.shortURL = null;
  }
}

function URLForm(props) {
  return (
    <div className="url-input-wrapper">
      <form className="url-form" onSubmit={props.onFormSubmit}>
        <TextField
          className="url-text-field"
          label="Enter URL"
          variant="outlined"
          onChange={props.onURLChange}
          fullWidth
          xs={12}
        />
        <Button
          className="url-form-submit-button"
          type="submit"
          value="Submit"
          variant="outlined"
          color="primary"
          xs={6}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

function LinkResult(props) {
  return props.auth ? (
    <Paper elevation={3} className="link-result-wrapper-paper">
      urlBundle.shortURL ?
      <span>
        Short URL:{" "}
        <a href={props.link} target="_blank">
          {props.link}
        </a>
      </span>
      : null
    </Paper>
  ) : (
    <NotAuthorizedMessage />
  );
}

function LinkShortener() {
  let loading = false;
  let authorized = false;
  const [urlBundle, setURLBundle] = useState(new URLBundle());
  let formSubmit = (event) => {
    loading = true;
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(urlBundle),
    };
    fetch(apiPath, requestOptions)
      .then((res) => {
        if (res.status === 401) {
          authorized = false;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        authorized = true;
        loading = false;
        if (data) {
          setURLBundle({ ...urlBundle, shortURL: data.shortURL });
        }
      });
  };
  return (
    <div className="link-shortener-wrapper">
      <URLForm
        onFormSubmit={formSubmit}
        onURLChange={(event) =>
          setURLBundle({ ...urlBundle, fullURL: event.target.value })
        }
      />
      {loading ? (
        <CircularProgress />
      ) : urlBundle.shortURL ? (
        <LinkResult auth={authorized} link={urlBundle.shortURL} />
      ) : null}
    </div>
  );
}

function NotAuthorizedMessage() {
  return (
    <Paper elevation={3} className="not-authorized-wrapper-paper">
      <span>You are not authorized</span>
    </Paper>
  );
}

export default LinkShortener;
