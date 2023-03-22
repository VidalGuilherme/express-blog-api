// Routes
/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all Users,
 *      description: Use to requesta all users
 *      tags: ["Users"]
 *      responses:
 *          '200':
 *              description: Asucessful response 
 */
//router.get('/', validAuth, (req,res) => userController.list(req, res));

/**
 * @swagger
 * /users/:id:
 *  get:
 *      summary: Find a User,
 *      description: Use to find a user
 *      tags: ["Users"]
 *      responses:
 *          '200':
 *              description: Asucessful response 
 *          '404':
 *              description: Not Found
 */
//router.get('/:id', validAuth, validId, validUser, (req,res) => userController.find(req, res));

/**
 * @swagger
 * /users/:id:
 *  put:
 *      summary: Update a User,
 *      description: Use to update a user
 *      tags: ["Users"]
 *      responses:
 *          '201':
 *              description: Asucessful response 
 */
//router.put('/:id', validAuth, validId, validUser, (req,res) => userController.find(req, res));

/**
 * @swagger
 * /users/:id:
 *  delete:
 *      summary: Delete a User,
 *      description: Use to delete a user
 *      tags: ["Users"]
 *      responses:
 *          '200':
 *              description: Asucessful response 
 */
//router.delete('/:id', validAuth, validId, validUser, (req,res) => userController.find(req, res));