// import { fetchRSS } from '../services/rssFetcher.js';
// import { rewriteText } from '../services/aiRewriter.js';
// import { fetchImageUrl } from '../services/imageFetcher.js';
// import Blog from '../models/blogModel.js';
// import connectDB from '../config/db.js';
// import dotenv from 'dotenv';

// dotenv.config();
// connectDB();

// (async () => {
//     console.log("Fetching posts now...");
//     const feeds = ["https://techcrunch.com/feed/"];
//     for (let feed of feeds) {
//         const posts = await fetchRSS(feed);

//         let savedCount = 0;  // counter for saved posts

//         for (let post of posts) {
//             if (savedCount >= 3) break;  // stop after 3 posts

//             const existingPost = await Blog.findOne({ link: post.link });
//             if (existingPost) continue;  // skip duplicates

//             const rewritten = await rewriteText(post.content);
//             const imageUrl = await fetchImageUrl(post.title);

//             await Blog.create({
//                 title: post.title,
//                 content: rewritten,
//                 link: post.link,
//                 imageUrl: imageUrl || '',
//             });

//             savedCount++;
//         }
//     }
//     console.log("✅ Up to 3 posts saved!");
//     process.exit(0);
// })();









import { fetchRSS } from '../services/rssFetcher.js';
import { rewriteText } from '../services/aiRewriter.js';
import Blog from '../models/blogModel.js';
import dotenv from 'dotenv';
import { fetchImageUrl } from '../services/imageFetcher.js';
dotenv.config();

export async function fetchAndSavePost() {
    console.log("Fetching posts now...");
    const feeds = ["https://techcrunch.com/feed/"];
    
    for (let feed of feeds) {
        const posts = await fetchRSS(feed);

        if (posts.length > 0) {
            const post = posts[0];
            const exists = await Blog.findOne({ link: post.link });
            if (exists) {
                console.log("Post already exists, skipping...");
            } else {
                const rewritten = await rewriteText(post.content);
                const imageUrl = await fetchImageUrl(post.title);
                await Blog.create({
                    title: post.title,
                    content: rewritten,
                    link: post.link,
                    imageUrl: imageUrl || '',
                });
                console.log(`Post saved: ${post.title}`);
            }
        } else {
            console.log("No posts found.");
        }
    }

    console.log("✅ 1 Post saved this run!");
}




// export async function fetchAndSavePost() {
//     try {
//         console.log("Fetching posts now...");
//         const feeds = ["https://techcrunch.com/feed/"];
//         let savedCount = 0;
//         const maxPosts = 1;

//         for (let feed of feeds) {
//             const posts = await fetchRSS(feed);

//             if (posts.length > 0) {
//                 for (const post of posts) {
//                     if (savedCount >= maxPosts) break;

//                     const exists = await Blog.findOne({ link: post.link });
//                     if (exists) {
//                         console.log(`Post already exists, skipping: ${post.title}`);
//                     } else {
//                         const rewritten = await rewriteText(post.content);
//                         const imageUrl = await fetchImageUrl(post.title);
//                         await Blog.create({
//                             title: post.title,
//                             content: rewritten,
//                             link: post.link,
//                             imageUrl: imageUrl || '',
//                         });
//                         console.log(`Post saved: ${post.title}`);
//                         savedCount++;
//                     }
//                 }
//             } else {
//                 console.log("No posts found.");
//             }
//             if (savedCount >= maxPosts) break;  // stop if max reached
//         }

//         console.log(`✅ ${savedCount} Post(s) saved this run!`);
//     } catch (error) {
//         console.error("Error fetching and saving posts:", error);
//     }
// }
