import { UserAgentApplication } from "msal";

export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: ["api://717f9b78-22a2-4b89-ae11-ecd2261adea7/.default"],
  },
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: "009f1738-6fcc-4c23-89d8-227e72392fe3",
    authority: "https://login.microsoftonline.com/common",
    validateAuthority: true,
    postLogoutRedirectUri: "http://localhost:3000",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    // This could be localStorage caching, but for testing, i'll keep sessionStorage
    cacheLocation: "sessionStorage",
  },
});
