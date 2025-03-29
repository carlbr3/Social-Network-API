import { Router } from 'express';
import { getAllUsers, createNewUser, findUser, modifyUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userControllers.js';

const router = Router();

// GET all users and POST new user
router.route('/').get(getAllUsers).post(createNewUser);

// GET, PUT, and DELETE user by id
router.route('/:id').get(findUser).put(modifyUser).delete(deleteUser);

// POST and DELETE friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

export default router;