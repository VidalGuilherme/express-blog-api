// Routes
/**
 * @swagger
 * /news:
 *  get:
 *      summary: Get all News,
 *      description: Use to requesta all News
 *      tags: ["News"]
 *      responses:
 *          '200':
 *              description: Asucessful response 
 */
//router.get('/', validAuth, (req,res) => newsController.list(req, res));

/**
 * @swagger
 * /news/:id:
 *  get:
 *      summary: Find a News,
 *      description: Use to find a News
 *      tags: ["News"]
 *      responses:
 *          '200':
 *              description: Asucessful response 
 *          '404':
 *              description: Not Found
 */
//router.get('/:id', validAuth, validId, validNews, (req,res) => newsController.find(req, res));

/**
 * @swagger
 * /news/:id:
 *  put:
 *      summary: Update a News,
 *      description: Use to update a News
 *      tags: ["News"]
 *      responses:
 *          '201':
 *              description: Asucessful response 
 */
//router.put('/:id', validAuth, validId, validNews, (req,res) => newsController.find(req, res));

/**
 * @swagger
 * /news/:id:
 *  delete:
 *      summary: Delete a News,
 *      description: Use to delete a News
 *      tags: ["News"]
 *      responses:
 *          '200':
 *              description: Asucessful response 
 */
//router.delete('/:id', validAuth, validId, validNews, (req,res) => newsController.find(req, res));