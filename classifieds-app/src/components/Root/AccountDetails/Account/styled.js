import styled from "styled-components";

export const Button = styled.a.attrs({ href: "#" })`
  display: block;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

export const Email = styled.div`
  color: ${props => props.theme.nero};
  font-size: 1rem;
`;

export const Wrapper = styled.div`
  color: ${props => props.theme.mortar};
  font-size: 0.9rem;
`;
