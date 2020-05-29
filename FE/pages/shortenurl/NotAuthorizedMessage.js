import { Paper } from "@material-ui/core";

function NotAuthorizedMessage() {
  return (
    <Paper elevation={3} className="not-authorized-wrapper-paper">
      <span>401: Not Authorized</span>
    </Paper>
  );
}

export default NotAuthorizedMessage;
