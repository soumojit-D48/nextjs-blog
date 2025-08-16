import { PostCardPost } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import  Link  from "next/link";
import { formatDate } from "@/lib/utils";


function PostCard({post} : PostCardPost) {
    return ( 
        <Card className="h-full flex flex-col">
            <CardHeader>
                <Link className="hover:underline" href={`/post/${post.slug}`}>
                {/* before it was `/post/${post.id}` but in params we have to send it by slug */}
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                </Link>
                <CardDescription>
                    By {post.author.name} - {formatDate(post.createdAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{post.description}</p>
            </CardContent>
        </Card>
    );
}

export default PostCard;