const { Router } = require("express");
const { acrudEndpoints } = require("./endpoints/acrud");
const router = new Router();

const ENTITY_NAME = "tuno";

router.get("/", (req, res) => {
  return res.json({ message: "Endpoints:", content: tunoEndpoints });
});

router.get("/all", acrudEndpoints(ENTITY_NAME).all);

router.post("/new", acrudEndpoints(ENTITY_NAME).create);

router.get("/:id", acrudEndpoints(ENTITY_NAME).read);

router.put("/update/:id", acrudEndpoints(ENTITY_NAME).update);

router.delete("/:id", acrudEndpoints(ENTITY_NAME).delete);

module.exports = router;

// INTERNALS

const tunoEndpoints = {
  getAllTunos: {
    type: "get",
    endpoint: "/all",
    description: "Retrieve all tunos",
  },
  postTuno: {
    type: "post",
    endpoint: "/new",
    description: "Create a new tuno",
    body: {
      first_name: "example1",
      last_name: "example2",
    },
  },
  getTuno: {
    type: "get",
    endpoint: "/:id",
    description: "Retrieve a tuno",
  },
  updateTuno: {
    type: "put",
    endpoint: "/update/:id",
    description: "Update a tuno",
    body: {
      first_name: "example1",
      last_name: "example2",
    },
  },
  deleteTuno: {
    type: "delete",
    endpoint: "/:id",
    description: "Delete a tuno",
  },
};
