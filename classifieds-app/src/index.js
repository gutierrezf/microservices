import "@babel/polyfill";

import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "#root/components/GlobalStyle";
import graqhqlClient from "#root/api/graphqlClient";
import Root from "#root/components/Root";

import store from "./store";
import * as theme from "./theme";

render(
  <Provider store={store}>
    <ApolloProvider client={graqhqlClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Root />
      </ThemeProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById("app")
);
