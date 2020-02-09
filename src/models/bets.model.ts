import mongoose from 'mongoose';
import { User } from './user.model';
import { Stream } from './stream.model';

/**
 * @swagger
 *
 * definitions:
 *   Bet:
 *     type: object
 *     properties:
 *       userId:
 *         type: string
 *         example: 'b91186b4-f2f6-45b3-b67f-b12e47b85198'
 *       streamId:
 *         type: string
 *         example: 'b91186b4-f2f6-45b3-b67f-b12e47777777'
 *       matchId:
 *         type: string
 *         example: 'b913b2-eeee-bbb3-24424-b12e47b85198'
 *       betToWin:
 *         type: string
 *         example: 'b91183-f2f6-45b3-b687f-236236236236'
 *       betAmount:
 *         type: numeric
 *         example: 23.52
 *       betResult:
 *          type: string
 *          example: 'win'
 */

export interface Bets extends mongoose.Document {
    userId: User['_id'], // mongo id to string from users coll to string
    streamId: Stream['_id'], // mongo id to string from streams coll to string
    matchId: string, // mongo id to string from match coll to string
    dateTime: Date,
    betToWin: string,
    betAmount: number,
    betResult: string
}

const BetsSchema: mongoose.Schema = new mongoose.Schema({
    userId: { type: String, required: true },
    streamId: { type: String, required: true },
    matchId: { type: String, required: true, unique: false },
    dateTime: { type: Date, default: Date.now },
    betToWin: { type: String, required: true, unique: false },
    betAmount: { type: String, required: true, unique: false },
    betResult: { type: String, required: true, unique: false },
});

export default mongoose.model<Bets>('Bets', BetsSchema, 'bets');
