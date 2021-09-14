import { useEffect, useState, useRef, useMemo } from "react";
import { accountsSdk } from "@livechat/accounts-sdk";

export const useAuth = (type = "token") => {
  const [auth, setAuth] = useState({
    isLoggingIn: true,
    isLoggedIn: false,
    code: null,
    accessToken: null,
    agentId: null,
    license: null,
    isAdmin: false,
  });

  const instance = useRef(null);

  useEffect(() => {
    instance.current = accountsSdk.init({
      backendAddress: process.env.REACT_APP_ACCOUNTS_URL,
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: type,
      onIdentityFetched: async (error, data) => {
        if (data && (data.code || data.access_token)) {
          const { access_token: accessToken, code, entity_id, license } = data;

          setAuth({
            isLoggingIn: false,
            isLoggedIn: true,
            code,
            accessToken,
            agentId: entity_id,
            license,
            agentData: data,
          });
        } else {
          // eslint-disable-next-line no-console
          console.log("error", error);
          setAuth({
            isLoggingIn: false,
            isLoggedIn: false,
            code: null,
            accessToken: null,
            agentId: null,
            license: null,
          });
          window.location.href = `https://accounts.livechatinc.com?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${window.location.href}`;
        }
      },
    });
  }, [type]);

  return useMemo(() => ({ ...auth, instance }), [instance, auth]);
};
