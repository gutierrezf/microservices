import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  margin-top: 0.25rem;
`;

const Form = styled.form`
  background-color: ${props => props.theme.whiteSmoke};
  margin-top: 1rem;
  padding: 1rem;
`;

export { Button, Form };
