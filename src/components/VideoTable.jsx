import { useState } from "react";
import { PublishToWordPress } from "../utils/api";

const VideoTable = ({ videos, setVideos }) => {
  const [selected, setSelected] = useState([]);
  const [isPosting, setIsPosting] = useState({
    status: false,
    postId: null,
  });

  const toggleSelect = (videoId) => {
    setSelected((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const isSelected = (videoId) => selected.includes(videoId);

  const handlePostToWP = async (video) => {
    console.log("Posting to WP:", video);
    // Your API call here
    setIsPosting({ status: true, postId: video._id });
    await PublishToWordPress(video)
      .then((response) => {
        console.log("Video posted to WordPress successfully:", response);
        let updatedVideo = videos.map((v) =>
          v._id === video._id ? { ...v, isuploadedtowp: true } : v
        );
        // Update the state or perform any other action with updatedVideo
        setSelected((prev) => prev.filter((id) => id !== video._id));
        console.log("Updated video state:", updatedVideo);
        setVideos(updatedVideo);
      })
      .catch((error) => {
        console.error("Error posting video to WordPress:", error);
      })
      .finally(() => {
        setIsPosting({ status: false, postId: null });
        alert("Video posted successfully to WordPress!");
      });
  };

  const handlePostSelected = () => {
    const selectedVideos = videos.filter((video) =>
      selected.includes(video.id)
    );
    console.log("Posting selected videos:", selectedVideos);
    // Batch post to WP here
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          📋 Video Upload Tracking
        </h2>
        <button
          onClick={handlePostSelected}
          disabled={selected.length === 0}
          className={`px-4 py-2 rounded-md text-white ${
            selected.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Post Selected
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white text-center text-sm uppercase">
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelected(e.target.checked ? videos.map((v) => v.id) : [])
                }
                checked={selected.length === videos.length}
              />
            </th>
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Video URL</th>
            <th className="p-3">Thumbnail</th>
            <th className="p-3">Categories</th>
            <th className="p-3">Tags</th>
            <th className="p-3">Uploaded By</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 text-center">
          {videos.map((video) => (
            <tr
              key={video._id}
              className="border-t hover:bg-gray-50 transition duration-150"
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={isSelected(video.id)}
                  onChange={() => toggleSelect(video.id)}
                />
              </td>
              <td className="p-3 max-w-[100px] truncate">{video._id}</td>
              <td className="p-3">{video.filename}</td>
              <td className="p-3 truncate max-w-xs">{video.description}</td>
              <td className="p-3">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View
                </a>
              </td>
              <td className="p-3">
                <img
                  src={video.thumbnail}
                  alt="Thumbnail"
                  className="w-20 h-auto rounded-md shadow-sm"
                />
              </td>
              <td className="p-3">{video.categorys.join(", ")}</td>
              <td className="p-3">{video.tags.join(", ")}</td>
              <td className="p-3">{video.uploadedBy}</td>
              <td className="p-3">
                {video.isuploadedtowp ? (
                  <button
                    disabled
                    className="bg-cyan-600 w-[100px] text-white px-3 py-2 rounded  transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Posted
                  </button>
                ) : (
                  <button
                    onClick={() => handlePostToWP(video)}
                    className="bg-green-600 w-[100px] text-white px-3 py-2 rounded hover:bg-green-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPosting.status && isPosting.postId === video._id
                      ? "Posting..."
                      : "Post to WP"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
