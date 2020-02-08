import * as mongoose from 'mongoose';

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
 *       streamUrl:
 *         type: string
 *         example: 'https://twitch.com/s/myTwitchName'
 */
export interface Stream extends mongoose.Document {
    twitchUserName: string;
    streamUrl: string;
}

const StreamSchema: mongoose.Schema = new mongoose.Schema({
    twitchUserName: { type: String, required: true },
    streamUrl: { type: String, required: true}
});

export default mongoose.model<Stream>('Stream', StreamSchema, 'streams');
