import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";

import { Label, LabelText, TextArea, TextInput } from "#root/components/shared";

import { Button, Form } from "./styled";

const AddListing = ({ onAddListing }) => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm();
  const [createListing] = useMutation(mutation);
  const session = useSelector(state => state.session);

  if (!session) return <p>You must login to add new listings</p>;

  const onSubmit = handleSubmit(async ({ title, description }) => {
    await createListing({
      variables: {
        title,
        description
      }
    });

    reset();
    onAddListing();
  });

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        <LabelText>Title</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="title"
          ref={register}
          type="text"
        ></TextInput>
      </Label>
      <Label>
        <LabelText>Description</LabelText>
        <TextArea
          disabled={isSubmitting}
          name="description"
          ref={register}
        ></TextArea>
      </Label>
      <Button disabled={isSubmitting} type="submit">
        Submit
      </Button>
    </Form>
  );
};

const mutation = gql`
  mutation($description: String!, $title: String!) {
    createListing(description: $description, title: $title) {
      id
    }
  }
`;

export default AddListing;
