const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger.json");
const router = require('express').Router();

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ['./src/swagger/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocs));

module.exports = router;