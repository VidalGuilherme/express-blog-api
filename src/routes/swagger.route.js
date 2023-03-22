import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerDocument from "../swagger.json" assert {type: "json"};
import {Router} from 'express';
const router = Router();

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ['./src/swagger/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocs));

export default router;