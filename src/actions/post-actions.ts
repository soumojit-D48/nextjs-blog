'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { eq } from "drizzle-orm"
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
        console.error(e);
        return {
            success: false,
            message: 'Failed to create new Post! Try again.'
        }
    }
}

