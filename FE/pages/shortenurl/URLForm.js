/* eslint-disable react/prop-types */
import { Button, TextField } from "@material-ui/core";

function URLForm(props) {
  return (
    <div className="url-input-wrapper">
      <form className="url-form" onSubmit={props.onURLSubmit}>
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

export default URLForm;
