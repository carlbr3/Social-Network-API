//import mongoose, {Schema, Document } from "mongoose";
import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: String,
    userId: String,
    reactions: IReaction[],
};

// should be a subdocument
interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string, 
    username: string,
    createdAt: Date,
}
const reactionSchema = new Schema<IReaction>({
    reactionId: { 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId() 
    },
    reactionBody: {
        type: String,
        required: true, 
        maxlength: 280
    },
    username: {
        type: String,
         required: true
        },
        // TODO: getter method required for createdAt. Unclear exactly what is meant by this.
    createdAt: {
        type: Date,
        default: Date.now },
});

const thoughtSchema = new Schema<IThought>({
    thoughtText: { 
        type: String, 
        required: true, 
        minLength: 1, 
        maxLength: 280},
    // TODO: getter method required for createdAt. Unclear exactly what is meant by this.
    createdAt: {
        type: Date, 
        default: Date.now 
    },
    username: {
        type: String, 
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
  )
  thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  }); 



const Thought = model ('Thought', thoughtSchema);

export default Thought;

// const Thought = model<IThought>('Thought', thoughtSchema);

// export { Thought, reactionSchema };