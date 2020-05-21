const {
  allEntity,
  createEntity,
  readEntity,
  updateEntity,
  deleteEntity,
} = require("../../database/queries/generic");

module.exports = { acrudEndpoints };

function acrudEndpoints(entityName) {
  return {
    all: (req, res, next) => {
      allEntity(entityName)
        .then((content) => {
          return res.json({
            message: `${entityName + "s"} read`,
            content,
          });
        })
        .catch((error) => next(error));
    },
    create: (req, res, next) =>
      createEntity(entityName, req.body)
        .then(({ id }) => {
          return res.json({
            message: `${entityName} created`,
            content: id,
          });
        })
        .catch((error) => next(error)),
    read: (req, res, next) => {
      readEntity(entityName, req.params.id)
        .then(({ id, isExisting, content }) => {
          if (!isExisting) {
            throw notFound(entityName, id);
          }
          return res.json({ message: `${entityName} read`, content });
        })
        .catch((error) => next(error));
    },
    update: (req, res, next) => {
      updateEntity(entityName, req.params.id, req.body)
        .then(({ id, isExisting, content }) => {
          if (!isExisting) {
            throw notFound(entityName, id);
          }
          return res.json({
            message: `${entityName} updated`,
            content: { id, ...content },
          });
        })
        .catch((error) => next(error));
    },
    delete: (req, res, next) => {
      deleteEntity(entityName, req.params.id)
        .then(({ id, isExisting }) => {
          if (!isExisting) {
            throw notFound(entityName, id);
          }
          return res.json({
            message: `${entityName} deleted`,
            content: { id },
          });
        })
        .catch((error) => next(error));
    },
  };
}

// INTERNALS
// TODO This should be a utils for the API
function notFound(entityName, id) {
  return { status: 404, message: `No '${entityName}' id ${id} found` };
}
