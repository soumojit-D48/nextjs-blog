'use client'

import {z} from 'zod'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {Textarea} from '../ui/textarea'
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { createPost } from '@/actions/post-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// post form schema for validation

const postSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 character long!').max(255, 
        'Title must be less than 255 characters!'
    ),
    description: z.string().min(5, 'Description must be at least 5 character long!').max(255, 
        'Description must be less than 255 characters!'
    ),
    content: z.string().min(10, 'Content must be at least 5 character long!'),

})


type PostFormValues = z.infer<typeof postSchema>


function PostForm() {
    const [isPending, startTransition] = useTransition()
    // disabled the button while the form is pending
    const router = useRouter()

    const {register, handleSubmit, formState: {errors}} = useForm<PostFormValues>({
        resolver: zodResolver(postSchema), // to get the errors we use fromstate 
        defaultValues: {
            title: '',
            description: '',
            content: '',
        },
    })

    const onFormSubmit = async (data: PostFormValues) => {
        // console.log(data);
        startTransition(async () => {
            try {
                const formData = new FormData()
                formData.append('title', data.title)
                formData.append('description', data.description)
                formData.append('content', data.content)

                let res 
                res = await createPost(formData)
                console.log(res);

                if(res.success){
                    toast("Post created successfully!")
                    router.refresh()
                    router.push('/')
                } else {
                    toast(res.message)
                }

            } catch (e) {
                toast("Failed to create post! Try again.")                
            }
        })
        
    }
    // if(errors.content){
    //     console.log(errors.content);
    // }
    
    return ( 
        <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
            <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input 
                id='title'
                placeholder='Enter post title'
                {...register('title')}
                disabled={isPending}
                />
                {
                   errors?.title && 
                   <p className='ml-3 text-sm text-red-600'>{errors.title.message}</p>
                }
            </div>
             <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                id='description'
                placeholder='Enter a short post description'
                {...register('description')}
                disabled={isPending}
                />
                {
                   errors?.description && 
                   <p className='ml-3 text-sm text-red-600'>{errors.description.message}</p>
                }
            </div>
            <div className='space-y-2'>
                <Label htmlFor='content'>Content</Label>
                <Textarea
                id='content'
                placeholder='Enter a short post content'
                className='min-h-50 resize-none'
                {...register('content')}
                disabled={isPending}
                />
                {
                   errors?.content && 
                   <p className='ml-3 text-sm text-red-600'>{errors.content.message}</p>
                }
            </div>
            <Button type='submit' disabled={isPending} className='mt-5 w-full'>
                {isPending ? "Saving Post..." : "Create Post"}
            </Button>
        </form>
    );
}

export default PostForm;