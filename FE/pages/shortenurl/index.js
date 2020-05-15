import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { Button, Paper } from "@material-ui/core";

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
        />
        <Button
          className="url-form-submit-button"
          type="submit"
          value="Submit"
          variant="outlined"
          color="primary"
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
  const [url, setURL] = useState("");
  const [link, setLink] = useState(null);
  let formSubmit = (event) => {
    event.preventDefault();
    console.log(`URL: ${url}`);
    setLink(url);
  };
  return (
    <div className="link-shortener-wrapper">
      <URLForm
        onFormSubmit={formSubmit}
        onURLChange={(event) => setURL(event.target.value)}
      />
      {link ? <LinkResult link={link} /> : null}
    </div>
  );
}

export default LinkShortener;
