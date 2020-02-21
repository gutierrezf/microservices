import styled from "styled-components";

export const Description = styled.p`
  margin-bottom: 0;
`;

export const Listing = styled.div`
  padding: 1rem 0;

  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.veryLightGrey};
  }
`;

export const Title = styled.strong`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`;
