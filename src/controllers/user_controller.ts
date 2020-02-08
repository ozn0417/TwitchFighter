import * as express from 'express';
import { ControllerRouter } from './controller_router';
import User, { User as UserInterface } from '../models/user.model';

export class UserController implements ControllerRouter {
    public router = express.Router();
    public route = '/user';

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.getUsers);
        this.router.post('/', this.createUser);
        this.router.patch('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser)
    }

    /**
     * @swagger
     *
     * /user:
     *   get:
     *     description: Get all current users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/User'
     */
    async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to get users ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /user:
     *   post:
     *     description: Create a new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: User object
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *             $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/User'
     */
    async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user: UserInterface = req.body;
        try {
            const result: UserInterface[] = await User.create([user]);
            res.json(result);
        }
        catch (error) {
            const e = JSON.stringify(error);
            console.error(`Failed to create user ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /user/{id}:
     *   patch:
     *     description: Update an existing User
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: user
     *         description: User object
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *       - in: path
     *         name: id
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/User'
     */
    async updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        const newInfo: UserInterface = req.body;
        try {
            const oldUser = await User.findById(id);

            // remember to use $set!!
            await oldUser.updateOne({$set: newInfo});

            // findByIdAndUpdate will give you the old record
            const newUser = await User.findById(id);
            res.json(newUser);
        }
        catch (error) {
            const e = JSON.stringify(error);
            next(console.error(`Failed to update user ${e}`));
        }
    }

    /**
     * @swagger
     *
     * /user/{id}:
     *   delete:
     *     description: Delete user bt id
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/User'
     */
    async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        try {
            await User.findByIdAndDelete(id);
            res.status(204).send();
        }
        catch (error) {
            const e = JSON.stringify(error);
            next(console.error(`Failed to update user ${e}`));
        }
    }
}
