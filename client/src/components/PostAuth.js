import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import api from "../apis/api";
import LoadingDiv from "./LoadingDiv";

const PostAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();

  if (!user) return <LoadingDiv />;

  api
    .post("/createUser", {
      email: user.email,
    })
    .then(() => {
      history.push("/available");
    })
    .catch((err) => {
      console.log(err);
    });

  return <LoadingDiv />;
};

export default PostAuth;
