import express from 'express';
import { getAllBlogs, getBlogById } from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);  // New route for fetching blog by ID

export default router;
