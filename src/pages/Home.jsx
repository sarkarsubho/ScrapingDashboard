import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/loaders/loader";

const Home = () => {
  const [url, setUrl] = useState("");
  const [scrapeData, setScrapeData] = useState(null);
  // State to manage loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    setError(null); // Reset error state
    setLoading(true);
    axios
      .post("http://localhost:5000/scrape", { url })
      .then((response) => {
        console.log("Scraping started:", response.data);
        // You can redirect to another page or show a success message
        setScrapeData(response.data);
      })
      .catch((error) => {
        console.error("Error starting scraping:", error);
        // Handle the error, e.g., show an error message
        setError("Failed to start scraping. Please try again. or enter a valid URL.");
      })
      .finally(() => {
        // Optionally, you can reset the form or perform other actions
        setUrl(""); // Clear the input field after submission
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    setUrl(e.target.value);
  };
  return (
    // <div>
    //   <h1>Welcome to the AUTO SCRAP Home Page</h1>
    //   // create a form for which takes a url and a button to submit the url
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="url"
    //       placeholder="Enter URL to scrape"
    //       value={url}
    //       onChange={handleChange}
    //     />
    //     <button type="submit">scrape NOW</button>
    //   </form>
    //   {loading && <Loader />}
    //   {error && <p className="text-red-500">{error}</p>}
    //   {scrapeData && (
    //     <div>
    //       <h2>Scraping Results:</h2>
    //       <pre>{JSON.stringify(scrapeData, null, 2)}</pre>
    //     </div>
    //   )}
    // </div>
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          🚀 Welcome to <span className="text-black">AUTO SCRAP</span>
        </h1>

        {/* URL Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="url"
            placeholder="Enter URL to scrape"
            value={url}
            onChange={handleChange}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Scrape NOW
          </button>
        </form>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center mt-6">
            <Loader />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">
            ⚠️ {error}
          </p>
        )}

        {/* Scraped Data Display */}
        {scrapeData && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              🔍 Scraping Results:
            </h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(scrapeData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
