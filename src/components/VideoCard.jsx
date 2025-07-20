import { useState } from "react";
import { PlayCircle } from "lucide-react"; // Optional icon library (Tailwind Lucide)
import { PublishToWordPress } from "../utils/api";

const VideoCard = ({ post }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePostToWP = async (video) => {
    console.log("Posting to WP:", video);
    // Your API call here
    await PublishToWordPress(video)
      .then((response) => {
        console.log("Video posted to WordPress successfully:", response);
      })
      .catch((error) => {
        console.error("Error posting video to WordPress:", error);
      });
  };

  return (
    <div className="border rounded-2xl p-4 shadow-lg mw-[100px] hover:shadow-xl transition duration-300 bg-white transform hover:scale-[1.01]">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.filename}</h2>

      <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
        {!isVideoPlaying ? (
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setIsVideoPlaying(true)}
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle
                size={64}
                className="text-white opacity-90 group-hover:scale-110 transition duration-300"
              />
            </div>
          </div>
        ) : (
          <video
            // src={post.url}
            src={
              "https://pub-6a689a155a6a474db5dd6f2079744df9.r2.dev/rulebucket/1748241489508-blitzo%20fucks%20loona.mp4"
            }
            type="video/mp4"
            controls
            autoPlay
            className="w-full h-full object-cover rounded"
          />
        )}
      </div>

      <p className="text-gray-700 mb-2">{post.description}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        <span className="font-medium text-gray-600">Tags:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        <span className="font-medium text-gray-600">Categories:</span>
        {post.categorys.map((category) => (
          <span
            key={category}
            className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-sm"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
        <span>
          Uploaded by: <span className="font-medium">{post.uploadedBy}</span>
        </span>
      </div>

      <button
        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:scale-105 transition duration-300 focus:outline-none"
        onClick={() => handlePostToWP(post)}
      >
        Post
      </button>
    </div>
  );
};

export default VideoCard;
