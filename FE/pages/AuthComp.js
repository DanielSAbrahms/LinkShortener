import React, { Component } from "react";
import { msalApp, GRAPH_REQUESTS } from "../auth-utils";

export default (AuthComp) => {
  class AuthProvider extends Component {
    constructor(props) {
      super(props);
      state = {
        account: null,
        error: null,
      };
    }

    async acquireToken(request, redirect) {
      return msalApp.acquireTokenSilent(request).catch((error) => {
        if (requiresInteraction(error.errorCode)) {
          return redirect
            ? msalApp.acquireTokenRedirect(request)
            : msalApp.acquireTokenPopup(request);
        }
      });
    }

    async onSignIn() {
      return msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
    }

    onSignOut() {
      msalApp.logout();
    }

    async componentDidMount() {
      msalApp.handleRedirectCallback((error) => {
        if (error) {
          const errorMessage = error.errorMessage
            ? error.errorMessage
            : "Unable to acquire access token.";
          this.setState({
            error: errorMessage,
          });
        }
      });

      const account = msalApp.getAccount();
      if (account) {
        this.setState({
          account,
        });
      } else {
        this.onSignIn();
      }
    }

    render() {
      const { account, error } = this.state;
      return (
        <AuthComp
          {...this.props}
          accountInfo={account}
          error={error}
          onSignIn={() => this.onSignIn()}
          onSignOut={() => this.onSignOut()}
        />
      );
    }
  }
};
