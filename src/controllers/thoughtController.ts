//import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Thought from "../models/Thought.js";
import User from '../models/User.js'


// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong when getting all thoughts' });
    }
};

// POST thought
export const createNewThought = async (req: Request, res: Response) => {
    try {
        const newThought = new Thought({ 
            username: req.body.username, 
            thoughtText: req.body.thoughtText,
            userId: req.body.userId,
        });
        
        //Update the user's thoughts
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: {thoughts: newThought._id } },
            { runValidators: true, new: true }
        )
        await newThought.save();
        res.status(200).json({newThought, user});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// PUT (modify) thought
export const modifyThought = async (req: Request, res: Response) => {
    try {
        const result = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { thoughtText: req.body.thoughtText },
            { new: true }
        );
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// DELETE Thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const result = await Thought.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// GET thought by id
export const findThought = async (req: Request, res: Response) => {
    try {
        const result = await Thought.findOne({ _id: req.params.id });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Reactions
// POST add Reaction
// export const addReaction = async (req: Request, res: Response) => {
//     try {
//         const reaction = new Reaction({ 
//             username: req.body.username, 
//             reactionBody: req.body.reactionBody,
//             userId: req.body.userId,
//         });
//         // Update Thoughts with Reaction
//         const thought = await Thought.findOneAndUpdate(
//             { _id: req.params.thoughtId },
//             { $addToSet: reactions: ReactionId},
//             { runValidators: true, new: true }
//             );

//         if (!thought) {
//             res.status(404).json({message: 'Thought not Found'});
//         } else {
//             res.status(200).json(thought);
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Something went wrong when adding the reaction' });
//     }
// };

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username, createdAt: new Date() } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        return res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong when adding the reaction' });
    }
};

// DELETE Reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {reactionId: req.params.reactionId} } },
            {runValidators: true, new: true}
            );

        if (!thought) {
            res.status(404).json({message: 'Thought not found'});
        }
        return res.json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};