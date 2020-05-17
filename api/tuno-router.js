const { Router } = require("express");
const {
  newTuno,
  getTuno,
  updateTuno,
  deleteTuno,
} = require("../database/queries/tuno");
const router = new Router();

router.post("/new", (req, res) => {
  newTuno(req.body)
    .then(({ id }) => {
      res.json({
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
        res.status(400).json({
          error: `No id=${req.params.tunoId} found to selected`,
        });
      }
      res.json({ message: "tuno read", content: tuno });
    })
    .catch((error) => next(error));
});

router.put("/update/:tunoId", (req, res) => {
  updateTuno(req.params.tunoId, req.body)
    .then(({ id, isExisting, firstName, lastName }) => {
      if (!isExisting) {
        res.status(400).json({
          error: `No id=${id} found to update`,
        });
      }
      res.json({
        message: "tuno updated",
        content: { id, firstName, lastName },
      });
    })
    .catch((error) => next(error));
});

router.delete("/:tunoId", (req, res) => {
  deleteTuno(req.params.tunoId)
    .then(({ id, isExisting }) => {
      if (!isExisting) {
        res.status(400).json({
          error: `No id=${id} found to delete`,
        });
      }
      res.json({ message: "tuno deleted", content: { id } });
    })
    .catch((error) => next(error));
});

module.exports = router;
