import { Request, Response } from 'express';
import User from '../models/User.js';

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({})
        res.status(200).json(users);
    }catch (err){
        res.status(500).json({ message: 'Something when wrong when getting All Users'})
    }
};

//POST: Create a user
export const createNewUser = async (req: Request, res: Response) => {
    try{
        const newUser = new User({ 
          name: req.body.name,
          email: req.body.email
        });
        await newUser.save();
        res.status(200).json(newUser);
        console.log('INFO: User Saved')
    }catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

//**userId functions**

// GET user by id
  export const findUser = async (req: Request, res:Response ) => {
    try {
        const result = await User.findOne({ _id: req.params.id});
        res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }};

// PUT: Modify user
export const modifyUser = async (req: Request, res: Response) => {
    try {
      const result = await User.findOneAndUpdate(
          { _id: req.params.id },
          { name: req.body.name, email: req.body.email },
          // Sets to true so updated document is returned; Otherwise original document will be returned
          { new: true }
        );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  }

  //DELETE user
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({message: 'User Deleted.'});
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  }
// Test these tomorrow
  //POST add friend
  // Not sure this is quite right
  export const addFriend = async (req: Request, res: Response) => {
    try {
  const user = await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: {friends: req.params.friendId } },
    { runValidators: true, new: true}
  );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID'})
    }
    return res.json(user);
    } catch (err){
      console.log('Uh Oh, something went wrong');
      return res.status(500).json({ message: 'something went wrong' });
    }
  };

  //DELETE friend
  export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate (
          {_id: req.params.userId},
        { $pull: {friends: req.params.friendId} },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID.'});
      }
        return res.json(user);
    } catch (err) {
      console.log ('ERROR: ', err);
      return res.status(500).json ({ message: 'Something went wrong.' })
    }}