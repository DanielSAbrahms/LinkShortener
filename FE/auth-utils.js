import { UserAgentApplication } from "msal";

export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: ["User.ReadWrite.All"],
  },
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: "009f1738-6fcc-4c23-89d8-227e72392fe3",
    authority: "https://login.microsoftonline.com/common",
    validateAuthority: true,
    redirectUri: "https:localhost:3000",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    // This could be localStorage caching, but for testing, i'll keep sessionStorage
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
});
