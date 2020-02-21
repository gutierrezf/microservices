import gql from "graphql-tag";
import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";

import { setSession } from "#root/store/ducks/session";
import { Label, LabelText, TextInput } from "#root/components/shared";

import { LogginButton, SignUpBlock } from "./styled";

const Login = ({ onShowSignUp }) => {
  const [createUserSession] = useMutation(mutation);
  const dispatch = useDispatch();
  const {
    formState: { isSubmitting },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const {
      data: { createUserSession: session }
    } = await createUserSession({
      variables: {
        email,
        password
      }
    });

    dispatch(setSession(session));
  });

  const handleOnShowSignUp = e => {
    e.preventDefault();
    onShowSignUp();
  };

  return (
    <form onSubmit={onSubmit}>
      <Label>
        <LabelText>Email</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="email"
          type="email"
          ref={register}
        ></TextInput>
      </Label>

      <Label>
        <LabelText>Password</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="password"
          type="password"
          ref={register}
        ></TextInput>
      </Label>

      <LogginButton type="submit" disabled={isSubmitting}>
        Login
      </LogginButton>

      <SignUpBlock>
        <span> or </span>
        <a href="#" onClick={handleOnShowSignUp}>
          Sign up
        </a>
      </SignUpBlock>
    </form>
  );
};

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        email
        id
      }
    }
  }
`;

export default Login;
