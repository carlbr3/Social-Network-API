import { Schema, Document, Types } from 'mongoose';

const formatDate = (date: Date): any => {
    return date.toLocaleString(); // Formats like: 4/10/2025, 3:12:48 PM
    // You can customize with Intl.DateTimeFormat or moment.js if you prefer
};

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        }
    }, 
    {
        toJSON: {
            getters: true
        }
    }
)

export default reactionSchema;