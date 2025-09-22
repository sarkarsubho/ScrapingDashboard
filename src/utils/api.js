import axios from "axios";

async function PublishToWordPress(video) {
  return axios
    .post("/postToWP", {
      id: video._id,
    })
    .then((response) => {
      console.log("Video posted to WordPress successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting video to WordPress:", error);
      return Promise.reject(error);
    });
}

async function BulkPublishToWordPress(videos) {
  return axios
    .post("/bulkPostToWP", {
      ids: videos.map((video) => video._id),
    })
    .then((response) => {
      console.log("Videos posted to WordPress successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting videos to WordPress:", error);
      return Promise.reject(error); 
    });
}

export { PublishToWordPress, BulkPublishToWordPress };
