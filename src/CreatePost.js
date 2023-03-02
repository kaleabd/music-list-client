import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    artist: "",
    album: "",
    genre: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addMusic = (e) => {
      if(post.title.length > 0 ) {
        axios
          .post("/create", post)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        navigate("/all")
        
       }else {
        alert('fill the form!')
        navigate('')
       }
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center font-bold my-12">Add Musics!</h1>
      <form className="">
        <div className="grid grid-cols-2 gap-4 mx-6 mb-4">
          <input
            name="title"
            value={post.title}
            onChange={handleChange}
            className='border-2 px-4 py-2 rounded-md outline-none'
            placeholder="title"
            required = {true}
          />
          <input
            onChange={handleChange}
            name="description"
            value={post.description}
            className='border-2 px-4 py-2 rounded-md outline-none'
            placeholder="description"
          />
          <input
            onChange={handleChange}
            name="artist"
            value={post.artist}
            className='border-2 px-4 py-2 rounded-md outline-none'
            placeholder="artist"
            required = {true}
          />
          <input
            onChange={handleChange}
            name="album"
            value={post.album}
            className='border-2 px-4 py-2 rounded-md outline-none'
            placeholder="album"
          />

        </div>
        <div className="flex flex-col mx-6 gap-4">
          <input
              onChange={handleChange}
              name="genre"
              value={post.genre}
              className='border-2 px-4 py-2 rounded-md outline-none'
              placeholder="genre"
            />


          <button
            onClick={addMusic}
          >
            <p className='font-bold rounded-md text-white bg-indigo-400 px-4 py-2'>
              Add Music
            </p>
          </button>
        </div>

      </form>
      <button onClick={() => navigate('/create/posts')}>
        <p className='font-bold rounded-md text-white bg-indigo-400 px-4 py-2'>
          Show Musics
        </p>
      </button>
      
    </div>
  );
}

export default CreatePost;
