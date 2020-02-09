import mongoose from 'mongoose';

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *         example: 'Tom'
 *       lastName:
 *         type: string
 *         example: 'Brady'
 *       email:
 *         type: string
 *         example: 'someEmail@TwitchFighter.com'
 *       twitchUsername:
 *         type: string
 *         example: tbradyFight
 *       userId:
 *          type: string
 *          example: b91186b4-f2f6-45b3-b67f-b12e47b85198
 */
export interface User extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    twitchUsername: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    twitchUsername: { type: String, required: true, unique: true },
});

export default mongoose.model<User>('User', UserSchema, 'users');
