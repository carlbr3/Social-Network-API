import { Schema, model, Document } from 'mongoose';
import reactionSchema from './Reaction.js';

const formatDate = (date: Date): any => {
    return date.toLocaleString(); // Formats like: 4/10/2025, 3:12:48 PM
    // You can customize with Intl.DateTimeFormat or moment.js if you prefer
};

interface IThought extends Document {
    thoughtText: string;
    createdAt: Schema.Types.Date;
    username: string;
    reactions: [typeof reactionSchema];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            type: [reactionSchema]
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;