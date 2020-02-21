import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { Description, Listing, Title } from "./styled";
import AddListing from "./AddListings/AddListings";

const Listings = () => {
  const { loading, data, refetch } = useQuery(query);

  if (loading) return "Loading....";

  return (
    <React.Fragment>
      <div>
        {data.listings.map(listing => (
          <Listing key={listing.id}>
            <Title>{listing.title}</Title>
            <Description>{listing.description}</Description>
          </Listing>
        ))}
      </div>
      <AddListing onAddListing={() => refetch()} />
    </React.Fragment>
  );
};

const query = gql`
  {
    listings {
      description
      id
      title
    }
  }
`;

export default Listings;
