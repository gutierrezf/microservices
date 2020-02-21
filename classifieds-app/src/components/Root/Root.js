import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useDispatch } from "react-redux";

import graphqlClient from "#root/api/graphqlClient";
import { setSession } from "#root/store/ducks/session";

import { Container, Content, Sidebar, Wrapper } from "./styled";
import AccountDetails from "./AccountDetails";
import Listings from "./Listings";

function Root() {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    graphqlClient
      .query({ query })
      .then(({ data }) => {
        if (data.userSession) {
          dispatch(setSession(data.userSession));
        }
      })
      .finally(() => setInitialized(true));
  }, []);

  if (!initialized) return <span>Loading</span>;

  return (
    <Wrapper>
      <Container>
        <Content>
          <Listings />
        </Content>
        <Sidebar>
          <AccountDetails />
        </Sidebar>
      </Container>
    </Wrapper>
  );
}

const query = gql`
  {
    userSession(me: true) {
      id
      user {
        id
        email
      }
    }
  }
`;

export default Root;
