// src/auth/auth0-provider-with-history.js
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.NEXT_PUBLIC_REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.NEXT_PUBLIC_REACT_APP_AUTH0_AUDIENCE;

  const history = useRouter();

  const onRedirectCallback = (appState) => {
    if (typeof window !== "undefined") {
      const path = sessionStorage.getItem("redirect_url");
      // sessionStorage.removeItem("redirect_url");
      if (path) {
        history.push(path);
      }
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={typeof window !== "undefined" ? window.location.origin : ""}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        audience: audience,
        scope: "read:client_credentials openid profile email",
      }}
      // audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
