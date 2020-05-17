const { Router } = require("express");
const {
  getTunos,
  newTuno,
  getTuno,
  updateTuno,
  deleteTuno,
} = require("../database/queries/tuno");
const router = new Router();

router.get("/", (req, res) => {
  return res.json({ message: "Endpoints:", content: tunoEndpoints });
});

router.get("/all", (req, res, next) => {
  getTunos(req.params.tunoId)
    .then(({ tunos }) => {
      return res.json({ message: "tunos read", content: { tunos } });
    })
    .catch((error) => next(error));
});

router.post("/new", (req, res, next) => {
  newTuno(req.body)
    .then(({ id }) => {
      return res.json({
        message: "tuno created",
        content: id,
      });
    })
    .catch((error) => next(error));
});

router.get("/:tunoId", (req, res, next) => {
  getTuno(req.params.tunoId)
    .then(({ tuno, isExisting }) => {
      if (!isExisting) {
        return res.status(400).json({
          error: `No 'tuno' with id ${req.params.tunoId} found`,
        });
      }
      return res.json({ message: "tuno read", content: tuno });
    })
    .catch((error) => next(error));
});

router.put("/update/:tunoId", (req, res, next) => {
  updateTuno(req.params.tunoId, req.body)
    .then(({ id, isExisting, object }) => {
      if (!isExisting) {
        return res.status(400).json({
          error: `No 'tuno' id ${id} found`,
        });
      }
      return res.json({
        message: "tuno updated",
        content: { id, ...object },
      });
    })
    .catch((error) => next(error));
});

router.delete("/:tunoId", (req, res, next) => {
  deleteTuno(req.params.tunoId)
    .then(({ id, isExisting }) => {
      if (!isExisting) {
        return res.status(400).json({
          error: `No 'tuno' id ${id} found`,
        });
      }
      return res.json({ message: "tuno deleted", content: { id } });
    })
    .catch((error) => next(error));
});

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
      firstname: "example1",
      lastName: "example2",
    },
  },
  getTuno: {
    type: "get",
    endpoint: "/:tunoId",
    description: "Retrieve a tuno",
  },
  updateTuno: {
    type: "put",
    endpoint: "/update/:tunoId",
    description: "Update a tuno",
    body: {
      firstname: "example1",
      lastName: "example2",
    },
  },
  deleteTuno: {
    type: "delete",
    endpoint: "/:tunoId",
    description: "Delete a tuno",
  },
};
