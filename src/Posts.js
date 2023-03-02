import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    title: "",
    description: "",
    artist: "",
    album: "",
    genre: ""
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


    const deletePost = (id) => {
      console.log('this is the id' + id);
  
      axios
        .delete(`/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setPosts(posts.filter(post => post._id !== id))
    };

  const updatePost = (id, title, description, artist, album, genre) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        id: id,
        title: title,
        description: description,
        artist: artist,
        album: album,
        genre: genre
      };
    });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);

    axios
      .put(`/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <>
      <div className="flex gap-4 justify-between m-4">
        <h1>Edit Music Lists</h1>
        <button onClick={() => navigate('/all')}>
        <p className='font-bold rounded-md text-white bg-indigo-400 px-4 py-2'>
          All Musics
        </p>
      </button>
      <button onClick={() => navigate('/create')}>
                <p className='font-bold rounded-md text-white bg-indigo-400 px-4 py-2'>
                Create Music List
                </p>
      </button>
      </div>
    <div  className="flex flex-col justify-center items-center">
      <div className={!show ? `hidden` : `block z-20 absolute top-[25%] bg-slate-200 drop-shadow-lg p-4 rounded-lg`} onHide={handleClose}>
        <h1 className="font-semibold text-xl">Edit Your List</h1>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">Title
          <input
            placeholder="title"
            name="title"
            value={updatedPost.title ? updatedPost.title : ""}
            className='border-2 px-4 py-2 rounded-md outline-none'
            onChange={handleChange}
          />
          </label>
          <label className="flex flex-col">Description
          <input
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={updatedPost.description ? updatedPost.description : ""}
            className='border-2 px-4 py-2 rounded-md outline-none'
          />
          </label>
          <label className="flex flex-col">Artist
          <input
            placeholder="artist"
            name="artist"
            onChange={handleChange}
            value={updatedPost.artist ? updatedPost.artist : ""}
            className='border-2 px-4 py-2 rounded-md outline-none'
          />
          </label>
          <label className="flex flex-col">Album
          <input
            placeholder="album"
            name="album"
            onChange={handleChange}
            value={updatedPost.album ? updatedPost.album : ""}
            className='border-2 px-4 py-2 rounded-md outline-none'
          />
          </label>
          <label className="flex flex-col">Genre
          <input
            placeholder="genre"
            name="genre"
            onChange={handleChange}
            className='border-2 px-4 py-2 rounded-md outline-none'
            value={updatedPost.genre ? updatedPost.genre : ""}
          />
          </label>

        </div>
        <div className="flex justify-around mt-4">
          <button
              onClick={handleClose}
            >
              <p className='font-bold rounded-md text-white bg-red-600 px-4 py-2'>
                Close
              </p>
          </button>
          <button
              onClick={saveUpdatedPost}
            >
              <p className='font-bold rounded-md text-white bg-indigo-600 px-4 py-2'>
                Save
              </p>
          </button>
          
        </div>
      </div>
      <div className="w-[60vw]">
      {posts ? (
        <div className="flex flex-col gap-6 ">
          {posts.map((post) => {
            return (
              <div
                className="flex flex-col p-4 bg-white rounded-lg drop-shadow-md"
                key={post._id}
              >
                <div className="">
                  <h4 className="font-semibold">Music title: <span className="font-medium">{post.title}</span></h4>
                  <p className="font-semibold">Description: <span className="font-medium">{post.description}</span></p>
                  <p className="font-semibold">Artist name: <span className="font-medium">{post.artist}</span></p>
                  <p className="font-semibold">Album name: <span className="font-medium">{post.album}</span></p>
                  <p className="font-semibold">Genre: <span className="font-medium">{post.genre}</span></p>
                </div>

                <div
                  className="flex gap-4"
                >
                  <button
                    variant="outline-info"
                    onClick={() =>
                      updatePost(post._id, post.title, post.description, post.artist, post.album, post.genre)
                    }
                    className='py-2 w-full font-bold text-indigo-700 border-2 rounded-lg border-indigo-700'
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) =>{
                      deletePost(post._id)
                      e.preventDefault()
                    } }
                    className='py-2 w-full font-bold text-red-600 border-2 rounded-lg border-red-600'
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        "loading..."
      )}
    </div>
    </div>    
    </>
    
  );
}

export default Posts;
