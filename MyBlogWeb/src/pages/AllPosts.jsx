import React from 'react'
import { useState,useEffect } from 'react'
import appwriteService from '../appwrite/config'



function AllPosts() {
    const [post,setPost]= useState();
    useEffect(()=>{},[]);
    appwriteService.getPost([]).then((post)=>{
        if(post){
            setPost(post.documents)
        }
    });
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                </Container>
        </div>
      )
    }
    
    export default AllPosts