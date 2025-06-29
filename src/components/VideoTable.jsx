import { useState } from "react";

const VideoTable = ({ videos }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (videoId) => {
    setSelected((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const isSelected = (videoId) => selected.includes(videoId);

  const handlePostToWP = (video) => {
    console.log("Posting to WP:", video);
    // Your API call here
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
        <thead className="bg-blue-600 text-white text-left text-sm uppercase">
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
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {videos.map((video) => (
            <tr
              key={video.id}
              className="border-t hover:bg-gray-50 transition duration-150"
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={isSelected(video.id)}
                  onChange={() => toggleSelect(video.id)}
                />
              </td>
              <td className="p-3">{video.id}</td>
              <td className="p-3">{video.title}</td>
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
              <td className="p-3">{video.categories.join(", ")}</td>
              <td className="p-3">
                <button
                  onClick={() => handlePostToWP(video)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Post to WP
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
