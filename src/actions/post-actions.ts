'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"


export async function createPost(formData: FormData) {
    try {
        // get the current user
        // the middleawre is enable still,
        // we have to check the current user is auth or not then,
        // form the session we can get the user id that we can store in our db
        
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session || !session?.user){
            return {
                success: false,
                message: 'You must be logged in to create a post'
            }
        }

        // get form data 
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const content = formData.get('content') as string

        if(!title || !description || !content) {
            return {
                success: false,
                message: 'Every fields are required'
            }
        }

        // create the slug from post title
        const slug = slugify(title)

        // check if the slug already exists
        const existingPost = await db.query.posts.findFirst({
            where: eq(posts.slug, slug)
        })

        if(existingPost){
            return {
                success: false,
                message: 'A post with the same title already exists! Please try with a diff one'
            }
        }
        const [newPost] = await db.insert(posts).values({
            title,
            description,
            content,
            slug,
            authorId: session.user.id
        }).returning()

        // revalidtae the homepage tp get the latest post
        revalidatePath('/')
        revalidatePath(`/post/${slug}`)
        revalidatePath('/profile')

         return {
            success: true,
            message: 'Post created successfully',
            slug
        }
    } catch (e) {
        console.error(e, 'failed to add');

        return {
            success: false,
            message: 'Failed to create new Post! Try again.'
        }
    }
}

export async function updatePost(postId: number, formData: FormData) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session || !session.user) {
            return {
                success: false,
                message: 'You must logged in to edit a post!'
            }
        }

        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const content = formData.get('content') as string

        if(!title || !description || !content) {
            return {
                success: false,
                message: 'Every fields are required'
            }
        }

        const slug = slugify(title)
        const existingPost = await db.query.posts.findFirst({
            where: and(eq(posts.slug, slug))
        })

        if(existingPost) {
            return {
                success: false,
                message: 'A post with this title already exists!'
            }
        }

        const post = await db.query.posts.findFirst({
            where: eq(posts.id, postId)
        })

        if(post?.authorId !== session.user.id){
            return {
                success: false,
                message: 'You can only edit own posts!'
            }
        }

        await db.update(posts).set({
            title,
            description,
            content,
            slug,
            updatedAt: new Date()
        }).where(eq(posts.id, postId))

        revalidatePath('/')
        revalidatePath(`/post/${slug}`)
        revalidatePath('/profile')

        return {
            success: true,
            message: "Post edited successfully",
            slug
        }
    } catch (e) {
        console.error(e, 'failed to edit');
        return {
            success: false,
            message: 'Failed to update new Post! Try again.'
        }
    }
}

export async function deletePost(postId: number) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session || !session.user) {
            return {
                success: false,
                message: 'You must logged in to delete a post!'
            }
        }

        const postToDelete = await db.query.posts.findFirst({
            where: eq(posts.id, postId)
        })

        if(!postToDelete) {
            return {
                success: false,
                message: 'post not found!'
            }
        }

        if(postToDelete?.authorId !== session.user.id){
            return {
                success: false,
                message: 'You can only delete own posts!'
            }
        }

        await db.delete(posts).where(eq(posts.id, postId))

        revalidatePath('/')
        revalidatePath('/profile')

        return {
            success: true,
            message: "Post deleted successfully!"
        }
    } catch (e) {
        console.error(e, 'failed to edit');
        return {
            success: false,
            message: 'Failed to update new Post! Try again.'
        }
    }
}