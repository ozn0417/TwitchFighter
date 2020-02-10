import {Express, Request, Response, NextFunction} from 'express';
import Stream, {Stream as StreamInterface} from './stream.model';

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
    export async function getStreams(req: Request, res: Response){
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
    export async function createStream(req: express.Request, res: express.Response){
        const stream: StreamInterface = req.body;
        try{
            const result: StreamInterface[] = await Stream.create([stream]);
            res.json(result);
        }catch(error){
            const e = JSON.stringify(error);
            console.error(`Failed to create user ${e}`);
        }
    }

    /**
     * @swagger
     *
     * /user/{id}:
     *   patch:
     *     description: Update an existing stream
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: stream
     *         description: stream object
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Stream'
     *       - in: path
     *         name: id
     *         description: Stream URL
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/Stream'
     */
    export async function updateStream(req: express.Request, res: express.Response, next: express.NextFunction){
        const id: string = req.params.id;
        const newInfo: StreamInterface = req.body;
        try{
            const oldStream = await Stream.findById(id);

            await oldStream.updateOne({$set: newInfo});

            const newStream = await Stream.findById(id);
            res.json(newStream);
        }catch(error){
            const e = JSON.stringify(error);
            next(console.error(`Failed to update stream ${e}`));
        }
    }
