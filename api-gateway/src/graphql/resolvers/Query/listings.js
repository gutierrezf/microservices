import ListingsService from "#root/adapters/ListingsService";

const listingsResolver = async () => {
  return ListingsService.fetchAll();
};

export default listingsResolver;
