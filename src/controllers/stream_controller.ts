import * as express from 'express';
import {ControllerRouter} from './controller_router';
import Stream, {Stream as StreamInterface} from '../models/stream.model';

export class StreamController implements ControllerRouter {
    public router = express.Router();
    public route = '/stream';

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.getStreams);
        this.router.post('/', this.createStream);
        this.router.patch('/:id', this.updateStream);
    }


    /**
     * @swagger
     *
     * /stream:
     *   get:
     *     description: Gets all stream data
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Stream'
     */
    async getStreams(req: express.Request, res: express.Response, next: express.NextFunction){
        try{
            const streams = await Stream.find();
            res.json(streams);
        }catch(error){
            const e = JSON.stringify(error);
            console.error(`Failed to get streams ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /stream:
     *   get:
     *     description: creates a stream object
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: streamURL
     *         description: Stream object
     *         required: true
     *         type: string
     *         schema:
     *            $ref: '#/definitions/Stream'
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Stream'
     */
    async createStream(req: express.Request, res: express.Response, next: express.NextFunction){
        const stream: StreamInterface = req.body;
        try{
            const result: StreamInterface[] = await Stream.create([stream]);
            res.json(result);
        }catch(error){
            const e = JSON.stringify(error);
            console.error(`Failed to create user ${e}`);
        }
    }
    async updateStream(req: express.Request. res: express.Response, next: express.NextFunction){
        
    }
}
