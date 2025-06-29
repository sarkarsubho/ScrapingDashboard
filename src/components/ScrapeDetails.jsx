import React from "react";
import { useNavigate } from "react-router-dom";

const ScrapeDetails = () => {
  const nevigate = useNavigate();

  const gotoAllPost = () => {
    nevigate("/Allpost");
  };
  return (
    <div>
      <button onClick={gotoAllPost}>Post Videos to wordPress</button>
      <h1 className="text-center text-2xl font-bold my-4">Scrape Details</h1>
      <div className="container mx-auto p-4">
        <p className="text-gray-700">
          Here you can view the details of your scraping tasks.
        </p>
        {/* Add more details or components related to scraping here */}
      </div>
    </div>
  );
};

export default ScrapeDetails;
