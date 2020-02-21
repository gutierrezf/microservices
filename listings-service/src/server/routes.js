import { Listing } from "#root/db/models";

const setupRoutes = app => {
  app.get("/listings", async (req, res, next) => {
    const listings = await Listing.findAll();
    return res.json(listings);
  });

  app.post("/listings", async (req, res, next) => {
    const { description, title } = req.body;

    if (!description || !title) {
      next(new Error("invalid body!"));
    }

    try {
      const newListing = await Listing.create({ description, title });
      return res.json(newListing);
    } catch (e) {
      return next(e);
    }
  });
};

export default setupRoutes;
