import Container from "@/components/layout/container"
import PostForm from "@/components/post/post-form"
import { auth } from "@/lib/auth"
import { getPostBySlug } from "@/lib/db/queries"
import { headers } from "next/headers"
import { notFound, redirect } from "next/navigation"



async function EditPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session || !session.user) {
        redirect('/') // middleware handle before this so unauth user redirect to /auth
    }

    const post = await getPostBySlug(slug)

    if(!post) {
        notFound()
    }

    // if user is not author we didnt gave the edit button but anyone can access that page means /edit page via URL so thats why we have to check
    if(post.authorId !== session.user.id){
        redirect('/')
    }

    return (
        <Container>
            <h1 className="max-w-2xl text-4xl font-bold mb-6 mt-10">Edit Post</h1>
            <PostForm 
                isEditing={true}
                post={{
                    id:post.id,
                    title: post.title,
                    description: post.description,
                    content: post.content,
                    slug: post.slug
                }}
            />
        </Container>
    )
}

export default EditPostPage