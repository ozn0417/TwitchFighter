import mongoose, { Schema, Document } from 'mongoose';

/**
 * @swagger
 *
 * definitions:
 *   Stream:
 *     type: object
 *     properties:
 *       twitchUserName:
 *         type: string
 *         example: 'myTwitchName'
 */
export interface Stream extends Document {
    twitchUserName: string;
}

const StreamSchema: Schema = new Schema({
    twitchUserName: { type: String, required: true }
});

export default mongoose.model<Stream>('Stream', StreamSchema, 'streams');
