import { useState } from "react";
import { Button, Paper, TextField, CircularProgress } from "@material-ui/core";

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
  return (
    <Paper elevation={3} className="link-result-wrapper-paper">
      <span>
        Short URL:{" "}
        <a href={props.link} target="_blank">
          {props.link}
        </a>
      </span>
    </Paper>
  );
}

function LinkShortener() {
  let loading = false;
  const [urlBundle, setURLBundle] = useState(new URLBundle());
  let formSubmit = (event) => {
    loading = true;
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(urlBundle),
    };
    fetch("https://localhost:5001/AddLink", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        loading = false;
        setURLBundle({ ...urlBundle, shortURL: data.shortURL });
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
        <LinkResult link={urlBundle.shortURL} />
      ) : null}
    </div>
  );
}

export default LinkShortener;
