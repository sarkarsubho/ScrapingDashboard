import { useState } from "react";
import { BulkPublishToWordPress, PublishToWordPress } from "../utils/api";
import ConfirmModal from "./modals/ConfirmModal";
import funnyGif from "../assets/are-you-sure.gif";
import Loader from "./loaders/loader";
import BulkUploadStatusModal from "./modals/BulkUploadStatusModal";

const VideoTable = ({ videos, setVideos }) => {
  const [open, setOpen] = useState(false); // For re-upload Confirm Modal
  const [selected, setSelected] = useState([]);
  const [isPosting, setIsPosting] = useState({
    status: false,
    postId: null,
  });
  const [bulkUploadingStatus, setBulkUploadingStatus] = useState({
    open: false,
    pending: false,
    completed: false,
    results: [
      {
        id: "husz7c7z6xczc8zx9c9zxczx9zxchxc88y86",
        status: true,
        message: "Uploaded successfully",
        wordpressResponse: { link: "https://example.com/post1" },
      },
      {
        id: "husz7c7z6xczc8zx9c9zxczx9zxchxc88y87",
        status: false,
        message: "Video not found",
      },
      {
        id: "husz7c7z6xczc8zx9c9zxczx9zxchxc88y88",
        status: false,
        message: "Internal error",
        error: "Database connection failed",
      },
    ],
  });

  const handleConfirm = () => {
    alert("Confirmed!");
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
        setSelected([]);
        alert("Video posted successfully to WordPress!");
      });
  };

  const handlePostSelected = () => {
    const selectedVideos = videos.filter((video) =>
      selected.includes(video._id)
    );
    setBulkUploadingStatus({
      open: true,
      pending: true,
      completed: false,
      results: [],
    });
    console.log("Posting selected videos:", selectedVideos);
    // Batch post to WP here
    BulkPublishToWordPress(selectedVideos)
      .then((response) => {
        console.log("Bulk post response:", response);
        // Update the video list to mark uploaded videos as response.results
        setVideos((prevVideos) =>
          prevVideos.map((video) => {
            let updatedvid = response.results.find(
              (result) => result.id === video._id
            );
            return updatedvid && updatedvid.status
              ? updatedvid.updatedVideo
              : video;
          })
        );

        setBulkUploadingStatus({
          open: true,
          pending: false,
          completed: true,
          results: response.results,
        });
      })
      .catch((error) => {
        console.error("Error posting selected videos to WordPress:", error);
        setBulkUploadingStatus({
          open: true,
          pending: false,
          completed: true,
          results: error.response.data,
        });
      });
  };

  const handleCloseModal = () => {
    setBulkUploadingStatus({
      open: false,
      pending: false,
      completed: false,
      results: [],
    });
    setSelected([]);
  };

  return (
    <div className="p-2 overflow-x-auto ">
      {bulkUploadingStatus.open && (
        <BulkUploadStatusModal
          bulkUploadingStatus={bulkUploadingStatus}
          onClose={handleCloseModal}
        />
      )}
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
          Draft Selected
        </button>
      </div>
      <div className="max-h-[calc(100vh-210px)] overflow-y-auto m-0 p-0 rounded-lg ">
        <table className="min-w-full bg-white shadow-md rounded-lg ">
          <thead className="bg-blue-600 text-white text-center text-sm uppercase sticky top-0 ">
            <tr className="rounded">
              <th className="p-3 rounded-tl-lg">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? videos.map((v) => v._id) : []
                    )
                  }
                  checked={selected.length === videos.length}
                  className="ml-2 p-2 cursor-pointer w-4 h-4"
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
              <th className="p-3 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 text-center">
            {videos.map((video, index) => (
              <tr
                key={video._id}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3">
                  <label className="flex items-center justify-center">
                    <span>{index + 1}.</span>
                    <input
                      type="checkbox"
                      checked={isSelected(video._id)}
                      onChange={() => toggleSelect(video._id)}
                      className="ml-2 p-2 cursor-pointer w-4 h-4"
                    />
                  </label>
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
                      onClick={() => setOpen(true)}
                      className="bg-cyan-600 w-[100px] text-white px-3 py-2 rounded  transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPosting.status && isPosting.postId === video._id
                        ? "Drafting..."
                        : "Re-Draft to WP"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePostToWP(video)}
                      className="bg-green-600 w-[100px] text-white px-3 py-2 rounded hover:bg-green-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPosting.status && isPosting.postId === video._id
                        ? "Drafting..."
                        : "Draft to WP"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={open}
        title="You sure??"
        message="Think twice... this might be your last chance! 🤔"
        gifSrc={funnyGif}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default VideoTable;
