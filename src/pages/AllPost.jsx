import React, { useEffect, useState } from "react";
import Loader from "../components/loaders/loader";
import VideoTable from "../components/VideoTable";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import Pagination from "../components/Pagination";

// Sample data for demonstration purposes
const sampleData = [
  {
    id: 1,
    title: "Demo Video 1",
    description: "An amazing video about scraping!",
    url: "https://example.com/video1",
    thumbnail: "https://via.placeholder.com/100",
    categories: ["Scraping", "Tutorial"],
  },
  {
    id: 2,
    title: "Demo Video 2",
    description: "Another cool video on web scraping!",
    url: "https://example.com/video2",
    thumbnail: "https://via.placeholder.com/100",
    categories: ["Tech", "React"],
  },
];

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Simulating fetching posts data
  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchPosts = async () => {
      // try {
      //   const response = await fetch("/api/posts");
      //   const data = await response.json();
      //   setPosts(data);
      // } catch (error) {
      //   setError("Failed to fetch posts");
      // } finally {
      //   setLoading(false);
      // }
      setLoading(true);
      setError(null);
      axios
        .get(`/getVideos?page=${currentPage}&vidPerPage=${postsPerPage}`)
        .then((response) => {
          setPosts(response.data.data);
          console.log("Fetched posts:", response.data.data);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
        })
        .catch((error) => {
          setError("Failed to fetch posts");

          console.error("Error fetching posts:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchPosts();
  }, [currentPage, postsPerPage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">All Posts</h1>
      <VideoTable videos={posts} setVideos={setPosts} />
      <Pagination
        currentPage={Number(currentPage)}
        totalPages={Number(totalPages)}
        postsPerPage={postsPerPage}
        setPostsPerPage={setPostsPerPage}
        onPageChange={setCurrentPage}
      />
      <div className="container mx-auto p-4">
        {/* <p className="text-gray-700">
          Here you can view all your scraped posts.
        </p> */}
        {/* Add more details or components related to all posts here */}
        {/* create a card for show a video details which have title description , thumbnail and with a post button and it should a array of posts and should have a multiplse select functionality and post bulk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Map through your posts array and create a card for each post */}
          {/* {
    "filename": "this is the title",
    "url": "https://www.youtube.com/watch?v=lp_JhAFwz5A&list=RDlp_JhAFwz5A&start_radio=1",
    "thumbnail":"https://images.unsplash.com/photo-1750524446387-188372eb8e42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
    "tags": [1,2,3,4],
    "categorys": [1,2,3,4],
    "description": "this is the video description ",
    "isuploadedtowp": false,
    "uploadedBy": "admin"} */}
          {Array.isArray(posts) &&
            posts.map((post) => (
              // <div key={post.id} className="border rounded-lg p-4">
              //   <h2 className="text-xl font-bold">{post.filename}</h2>

              //   <img
              //     src={post.thumbnail}
              //     alt={post.title}
              //     className="w-full h-48 object-cover"
              //   />
              //   <video
              //     src={post.url}
              //     controls
              //     className="w-full h-48 object-cover"
              //   ></video>
              //   <p className="text-gray-700">{post.description}</p>
              //   <div className="flex flex-wrap mt-2">
              //     Tags:- {post.tags.map((tag) => (
              //       <span
              //         key={tag}
              //         className="bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm mr-2"
              //       >
              //         {tag}
              //       </span>
              //     ))}
              //   </div>
              //   <div className="flex flex-wrap mt-2">
              //     Categories:- {post.categorys.map((category) => (
              //       <span
              //         key={category}
              //         className="bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm mr-2"
              //       >
              //         {category}
              //       </span>
              //     ))}
              //   </div>
              //   <div className="flex justify-between items-center mt-4">
              //     <span className="text-gray-600">
              //       Uploaded by: {post.uploadedBy}
              //     </span>
              //   </div>
              //   <button className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 cursor-pointer">
              //     Post
              //   </button>
              // </div>
              <VideoCard key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
