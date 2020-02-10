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
    export async function getStreams(req: any, res: any){
        try{
            const streams = await Stream.find();
            res.json(streams);
        }catch(error){
            const e = JSON.stringify(error);
            console.error(`Failed to get streams ${e}`);
            res.status(500).end();
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
    export async function createStream(req: any, res: any) {
        try{
            const result = await Stream.create(req.body);
            res.json(result);
        }catch(error){
            const e = JSON.stringify(error);
            console.error(`Failed to create user ${e}`);
            res.status(500).end();
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
    export async function updateStream(req: any, res: any){
        const id: string = req.params.id;
        try{
            const updatedStream = await Stream.findByIdAndUpdate(id,req.body,{new: true});
            if(!updatedStream){
                res.status(404).end();
            }
            return res.json(updateStream);
        }catch(error){
            const e = JSON.stringify(error);
            console.error(`Failed to update stream ${e}`);
            res.status(500).end();
        }
    }
