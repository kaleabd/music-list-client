import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function Allposts() {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
          .get("/posts")
          .then((res) => {
            console.log(res);
            setPosts(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
  return (
    <div className='bg-slate-200 pb-4'>
        <div className="flex gap-4 justify-between p-4">
        <h1>Musics Lists</h1>
        <div className='flex  gap-4'>
            <button onClick={() => navigate('/create')}>
                <p className='font-bold rounded-md text-white bg-indigo-400 px-4 py-2'>
                Create Music List
                </p>
            </button>
            <button onClick={() => navigate('/create/posts')}>
                <p className='font-bold rounded-md text-white bg-indigo-400 px-4 py-2'>
                Edit Music List
                </p>
            </button>
            <button
                onClick={() => navigate('/')}
            >
                <p className='font-bold rounded-md text-white bg-indigo-400 px-4 py-2'>
                Back to home
                </p>
            </button>
        </div>

      </div>
      <div className='pb-4 grid lg:grid-cols-2 lg:justify-center gap-4 mx-6'>
      {posts.map((post) => {
            return (
              <div
                className=" rounded-lg bg-white"
                key={post._id}
              >
                <div className="flex flex-col p-4">
                  <div>
                    <h4 className='font-bold text-2xl'>{post.title}</h4>
                    <p className='text-sm text-slate-500'>from album <span className='underline font-bold'>{post.album}</span></p>
                  </div>
                  <p>{post.description}</p>
                  <div className='flex justify-between '>
                    <p className='bg-slate-500 px-4 py-2 rounded-2xl text-white font-bold'>Artist name: {post.artist}</p>
                    <p className='bg-slate-500 px-4 py-2 rounded-2xl text-white font-bold'># {post.genre}</p>
                  </div>
                  
                  
                </div>
              </div>
            );
          })}
  
      </div>
          
    </div>
  )
}

export default Allposts