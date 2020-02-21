import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";

import { clearSession } from "#root/store/ducks/session";

import { Button, Email, Wrapper } from "./styled";

const mutation = gql`
  mutation($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

const Account = () => {
  const dispatch = useDispatch();
  const [deleteUserSession] = useMutation(mutation);
  const session = useSelector(state => state.session);

  const handleOnClick = e => {
    e.preventDefault();
    dispatch(clearSession());

    deleteUserSession({
      variables: {
        sessionId: session.id
      }
    });
  };
  return (
    <Wrapper>
      Logged in as <Email>{session.user.email}</Email>
      <Button onClick={handleOnClick}>(Sing Out)</Button>
    </Wrapper>
  );
};

export default Account;
