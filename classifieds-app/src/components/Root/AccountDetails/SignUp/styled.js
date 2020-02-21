import styled from "styled-components";

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const SignUpButton = styled.button`
  display: inline-block;
  margin-top: 0.25rem;
`;

const LoginBlock = styled.div`
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
`;
export { Label, LabelText, LoginBlock, SignUpButton };
