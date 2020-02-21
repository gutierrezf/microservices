import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import * as yup from "yup";

import { TextInput } from "#root/components/shared";

import { Label, LabelText, LoginBlock, SignUpButton } from "./styled";

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .required()
    .test("PasswordValidation", "The password does not match", function() {
      return this.parent.password === this.parent.confirmPassword;
    })
});

const SignUp = ({ onShowLogin }) => {
  const [createUser] = useMutation(mutation);
  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
    reset
  } = useForm({ mode: "onChange", validationSchema });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await createUser({ variables: { email, password } });
    reset();
    onShowLogin();
  });

  const handleOnShowLogin = e => {
    e.preventDefault();
    onShowLogin();
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

      <Label>
        <LabelText>Confirm Password</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="confirmPassword"
          type="password"
          ref={register}
        ></TextInput>
      </Label>

      <SignUpButton type="submit" disabled={isSubmitting || !isValid}>
        Sign Up
      </SignUpButton>

      <LoginBlock>
        <span> or </span>
        <a href="#" onClick={handleOnShowLogin}>
          Login
        </a>
      </LoginBlock>
    </form>
  );
};

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

export default SignUp;
