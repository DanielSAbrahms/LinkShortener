import { Button, Paper, TextField } from "@material-ui/core";
import NotAuthorizedMessage from "./NotAuthorizedMessage";
/* eslint-disable react/prop-types */

function getPathFromURL(fullURL) {
  const routeEnd = "/l/";
  return fullURL.substr(fullURL.indexOf(routeEnd) + routeEnd.length);
}

function LinkResult(props) {
  return props.auth ? (
    <Paper elevation={3} className="link-result-wrapper-paper">
      {props.link ? (
        <div>
          <div className="label short-url-label">
            Short URL:{" "}
            <a href={props.link} target="_blank" rel="noreferrer">
              {props.link}
            </a>
          </div>
          <div className="label edit-url-label">(Optional) Edit URL path</div>
          <form className="url-form" onSubmit={props.onPathSubmit}>
            <TextField
              className="url-custom-path-field"
              defaultValue={getPathFromURL(props.link)}
              variant="outlined"
              onChange={props.onPathChange}
              fullWidth
              xs={12}
            />
            <Button
              className="custom-path-submit-button"
              type="submit"
              value="Submit"
              variant="outlined"
              color="secondary"
              xs={6}
            >
              Submit New Path
            </Button>
          </form>
        </div>
      ) : null}
    </Paper>
  ) : (
    <NotAuthorizedMessage />
  );
}

export default LinkResult;
