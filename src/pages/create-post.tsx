import React, { useEffect, useState } from "react";
import { storage } from "../server/lib/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const [postsState, setPostsState] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: "",
    status: "active",
    address: "",
  });
  const [file, setFile] = useState<any>(null);

  const handleChange = (e: any) => {
    if (e.target.name !== "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const [imgUrl, setImgUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const handleUpload = async () => {
    console.log(file);
    if (!file) return;
    const storageRef = ref(storage, `files/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setFormData({
            ...formData,
            file: downloadURL,
          });
        });
      }
    );
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
      }),
    });
    res = await res.json();
  };

  return (
    <div>
      <Navbar />
      <div className="my-10 text-center text-4xl font-bold uppercase text-slate-700">
        Add your post
      </div>
      <form className="flex justify-evenly" onSubmit={handleSubmit}>
        {/* Left side */}
        <div className="">
          <div>
            <label className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              className="my-2 h-10 w-80 rounded-3xl border-2 pl-2"
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Description
            </label>
            <input
              className="my-2 h-10 w-80 rounded-3xl border-2 pl-2"
              name="content"
              onChange={handleChange}
              type="text"
              placeholder="Description"
            />
          </div>
          <div>
            <label className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Address
            </label>
            <input
              className="my-2 h-10 w-80 rounded-3xl border-2 pl-2"
              name="address"
              onChange={handleChange}
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="my-4 flex justify-evenly text-lg">
            <button
              className="mr-4 rounded-3xl border-2 border-green-600 py-1 px-4 hover:bg-green-600 hover:text-white"
              type="button"
              name="status"
              onClick={handleChange}
              value="active"
            >
              Active
            </button>
            <button
              className="mr-4 rounded-3xl border-2 border-rose-700 py-1 px-4 hover:bg-rose-700 hover:text-white"
              type="button"
              name="status"
              onClick={handleChange}
              value="inactive"
            >
              Inactive
            </button>
          </div>
          <button
            className="my-2 h-10 w-80 rounded-3xl border-2 border-green-700 text-lg hover:bg-green-700 hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
        {/* Right side */}
        <div className="mt-10">
          <input
            className="mb-10 block w-80  rounded-2xl border-2 py-20"
            name="file"
            type="file"
            onChange={handleChange}
          />
          <button
            type="button"
            className="my-4 h-10 w-80 rounded-3xl border-2 border-green-700 text-lg hover:bg-green-700 hover:text-white"
            onClick={handleUpload}
          >
            upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
