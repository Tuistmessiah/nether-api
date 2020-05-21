const { Router } = require("express");
const { acrudEndpoints } = require("./endpoints/acrud");
const router = new Router();

const ENTITY_NAME = "section";

router.get("/", (req, res) => {
  return res.json({ message: "Endpoints:", content: sectionEndpoints });
});

router.get("/all", acrudEndpoints(ENTITY_NAME).all);

router.post("/new", acrudEndpoints(ENTITY_NAME).create);

router.get("/:id", acrudEndpoints(ENTITY_NAME).read);

router.put("/update/:id", acrudEndpoints(ENTITY_NAME).update);

router.delete("/:id", acrudEndpoints(ENTITY_NAME).delete);

module.exports = router;

// INTERNALS

const sectionEndpoints = {
  getAllSections: {
    type: "get",
    endpoint: "/all",
    description: "Retrieve all sections",
  },
  postSection: {
    type: "post",
    endpoint: "/new",
    description: "Create a new section",
    body: {},
  },
  getSection: {
    type: "get",
    endpoint: "/:id",
    description: "Retrieve a section",
  },
  updateSection: {
    type: "put",
    endpoint: "/update/:id",
    description: "Update a section",
    body: {},
  },
  deleteSection: {
    type: "delete",
    endpoint: "/:id",
    description: "Delete a section",
  },
};
