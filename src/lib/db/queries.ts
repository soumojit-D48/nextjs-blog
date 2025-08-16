import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";

// get all posts
export async function getAllPosts(){
    try {
        const fetchAllPosts = await db.query.posts.findMany({
            orderBy: [desc(posts.createdAt)],
            with: {
                author: true
            }
        })
        return fetchAllPosts
    } catch (e) {
        console.log();
        return []
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const post = await db.query.posts.findFirst({
            where: eq(posts.slug, slug),
            with: {
                author: true
            }
        })
        return post
    } catch (e) {
        console.log();
        return null
    }
}
