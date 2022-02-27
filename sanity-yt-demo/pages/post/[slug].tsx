import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from "react-portable-text"
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}


interface Props {
    post: Post;
}
function Post({ post }: Props) {
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    console.log(post);


    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      fetch("/api/createComment", { method: 'POST', body: JSON.stringify(data), })
            .then(() => {
                console.log(data);
                setSubmitted(true)
            })
            .catch((err) => {
                console.log(err);
                setSubmitted(false)
            })

    }
    return (
        <main>
            <Header />
            {post.mainImage && (
                <img className='h-40 w-full object-cover ' src={urlFor(post.mainImage).url()!} alt="" />
            )}
            <article className='max-w-3xl mx-auto p-5'>
                <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>
                <div>
                    {post.mainImage && (
                        <img className='h-10 w-10 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
                    )}
                    <p className='font-extralight text-sm'>blog post by {""}<span>{post.author.name}</span>published at {new Date(post._createdAt).toLocaleString()}</p>
                </div>
                <div>
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANTIY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANTIY_PROJECT_ID!}
                        content={post.body}
                        serializers={
                            {
                                h1: ({ porps }: any) => (
                                    <h1 className='text-3xl font-bold my-5{...props}' ></h1>

                                ),
                                h2: ({ porps }: any) => (
                                    <h2 className='text-xl font-bold my-5{...props}' />
                                ),
                                li: ({ children }: any) => (
                                    <li className='ml-4 list-disc'>{children}</li>
                                ),
                                link: ({ href, children }: any) => (
                                    < a href={href} className='text-blue-500 hover:underline'>{children}</a>
                                ),

                            }
                        }
                    />
                </div>

            </article>
            <hr className='max-w-lg my-5 mx-auto border border-green-500' />
            {submitted ? (
                <div className='flex flex-col py-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
                    <h3 className='mx-auto text-3xl mb-4'>thank you for summbitting your comment</h3>
                    <p className='mx-auto'>once it has been approved </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10' action="">
                    <h3 className='text-sm text-green-500' >enjoyes this article?</h3>
                    <h4 className='text-3xl font-bold' >leave a commment below</h4>
                    <hr className='py-3 mt-2' />
                    <input {...register("_id")} type="hidden" name="_id" value={post._id} />
                    <label className='block mb-5' htmlFor="">
                        <span className='text-gray-700'>Name</span>
                        <input {...register("name", { required: true })} className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring ' placeholder='jhon applessed' type="text" />
                    </label>
                    <label className='block mb-5' htmlFor="">
                        <span className='text-gray-700'>email</span>
                        <input {...register("email", { required: true })} className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring ' placeholder='jhon applessed' type="email" />
                    </label>
                    <label className='block mb-5' htmlFor="">
                        <span className='text-gray-700'>comment</span>
                        <textarea　{...register("comment", { required: true })} className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='jhon appleseed ' rows={9} />
                    </label>
                    {/* error will return when field validation fails */}
                    <div className='flex flex-col p-5'>
                        {errors.name && (
                            <span className='text-red-500'>the name field is required</span>
                        )}
                        {errors.comment && (
                            <span className='text-red-500'>the comment field is required</span>
                        )}
                        {errors.email && (
                            <span className='text-red-500'>the email field is required</span>
                        )}
                    </div>

                    <input type="submit" className='shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' />

                </form>
            )}
            {/* comment */}
            <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
                <h3 className='text-4xl'>Comment</h3>
                <hr className='pb-2' />
                {post.comments.map((data) => (
                    <div key={data._id}>

                        
                            <p><span className='text-yellow-500'>{data.name}</span> :{data.comment}  
                            <span  className='text-gray-500 '> published at {new Date(post._createdAt).toLocaleString()}</span></p>
                           
                            
                        
                    </div>
                ))}
                 
            </div>


        </main>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        _id,
       slug{
           current
       }
      }`;
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));
    return {
        paths,
        fallback: "blocking"
    };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
        name,
        image
      },
      'comments': *[
          _type == "comment"&&
          post._ref == ^._id 
          ],
      description,
      mainImage,
      slug,
      body,
    }`;
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post,
        },
        revalidate: 60,// after 60 second , itll update the old cached version
    }
}