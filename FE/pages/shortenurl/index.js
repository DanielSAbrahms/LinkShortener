import { useState } from "react";
import { Button, Paper, TextField, CircularProgress } from "@material-ui/core";

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
  const [url, setURL] = useState("");
  const [link, setLink] = useState(null);
  let formSubmit = (event) => {
    loading = true;
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ FullURL: url }),
    };
    fetch("https://localhost:5001/api/Link/AddLink", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        loading = false;
        setLink(data.shortURL);
      });
  };
  return (
    <div className="link-shortener-wrapper">
      <URLForm
        onFormSubmit={formSubmit}
        onURLChange={(event) => setURL(event.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : link ? (
        <LinkResult link={link} />
      ) : null}
    </div>
  );
}

export default LinkShortener;
