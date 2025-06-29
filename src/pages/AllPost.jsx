import React, { useEffect, useState } from "react";
import Loader from "../components/loaders/loader";
import VideoTable from "../components/VideoTable";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Simulating fetching posts data
  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">All Posts</h1>
      <VideoTable videos={sampleData} />
      <div className="container mx-auto p-4">
        {/* <p className="text-gray-700">
          Here you can view all your scraped posts.
        </p> */}
        {/* Add more details or components related to all posts here */}
        {/* create a card for show a video details which have title description , thumbnail and with a post button and it should a array of posts and should have a multiplse select functionality and post bulk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Map through your posts array and create a card for each post */}
          {Array.isArray(posts) &&
            posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-700">{post.description}</p>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
                  Post
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
