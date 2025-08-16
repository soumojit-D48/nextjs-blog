import { PostConetentProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeletePostButton from "./delete-post-button";



function PostContent({post, isAuthor}: PostConetentProps) {
    return ( 
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">
                    {post.title}
                </CardTitle>
                <CardDescription>
                    By {post.author.name} - {formatDate(post.createdAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text- mb-6">{post.description}</p>
                <p className="text-muted-foreground font-bold text-4xl mb-6 break-words">{post.content}</p>
                {/* <p className=" text-muted-foreground font-bold text-4xl mb-6 overflow-y-auto">{post.content}</p> */}
            </CardContent>
            {
                isAuthor && (
                    <CardFooter>
                        <div className="flex gap-2">
                            <Button asChild variant='outline' size='sm'>
                                <Link href={`/post/edit/${post.slug}`}>
                                    <Pencil className="h-4 w-4 mr-2"/>
                                    Edit
                                </Link>
                            </Button>
                            <DeletePostButton postId={post.id}/>
                        </div>
                    </CardFooter>
                )
            }
        </Card>
    );
}

export default PostContent;