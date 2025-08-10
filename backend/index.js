import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';               // <--- import cors
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import cron from 'node-cron';
import { fetchAndSavePost } from './cronJobs/postFetcher.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));  // <--- enable CORS for your frontend
app.use(express.json());

// Routes
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Schedule the post fetcher to run every hour at minute 0
  cron.schedule('0 * * * *', async () => {
    console.log('Running scheduled post fetcher');
    try {
      await fetchAndSavePost();
    } catch (error) {
      console.error('Error running post fetcher:', error);
    }
  });
});
