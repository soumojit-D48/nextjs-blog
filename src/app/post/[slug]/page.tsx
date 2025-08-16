import PostContent from "@/components/post/post-content"
import { auth } from "@/lib/auth"
import { getPostBySlug } from "@/lib/db/queries"
import { headers } from "next/headers"
import { notFound } from "next/navigation"


async function PostDetailsPage({
    params,
} : {
    params: Promise<{slug: string}>
}) {
    const {slug} = await params
    const post = await getPostBySlug(slug) // or, (await params).slug direct in parameter

    const session = await auth.api.getSession({
        headers: await headers() 
    }) // this session info has the user info and that user info have the id

    if(!post) {
        notFound()
    }

    //get author information
    // we have to check the user visit this post details page is author or not 
    // cause if he is not then he can't edit or delete that post

    const isAuthor = session?.user?.id === post.authorId 


    return (
        <main className="py-10">
            <div  className="max-w-4xl mx-auto">
                <PostContent post={post} isAuthor={isAuthor}/>
            </div>

        </main>
    )
}

export default PostDetailsPage