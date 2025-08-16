export interface PostListProps {
    posts : Array<{
        id: number,
        title: string,
        description: string,
        slug: string,
        createdAt: Date,
        author: {
            name: string
        }
    }>
}
export interface PostCardPost {
    post : {
        id: number,
        title: string,
        description: string,
        slug: string,
        createdAt: Date,
        author: {
            name: string
        }
    }
}

export interface PostConetentProps {
    post : {
        id: number,
        title: string,
        description: string,
        content: string,
        slug: string,
        createdAt: Date,
        updatedAt: Date
        author: {
            name: string
        }
    };
    isAuthor: Boolean
}

export interface DeletePostButtonProps {
    postId: number
}

export interface PostFormProps {
    isEditing? : boolean,
    post?: {
        id: number,
        title: string,
        description: string,
        content: string,
        slug: string
    }
}