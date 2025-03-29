import { Router } from 'express';
import { getAllThoughts, createNewThought, findThought, modifyThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtController.js';

const router = Router();

// api/thoughts
router.route('/').get(getAllThoughts).post(createNewThought);

// api/thoughts/:id
router.route('/:id').get(findThought).put(modifyThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;