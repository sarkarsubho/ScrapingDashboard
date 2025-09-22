import React from "react";
import Loader from "../loaders/loader";
import { CheckCheck, CircleX } from "lucide-react";

const BulkUploadStatusModal = ({ bulkUploadingStatus, onClose }) => {
  const truncateText = (text) => {
    // if the text gratter that 20 char then make it like abck....xyz
    if (text.length > 20) {
      return text.substring(0, 8) + "...." + text.substring(text.length - 8);
    }
    return text;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-sm">
      <div
        className={`rounded-2xl shadow-xl max-w-lg w-full transform transition-all duration-300 text-center border-2 border-gray-500 bg-gray-200
        ${
          bulkUploadingStatus.open
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
      >
        <div className="mb-4 border-b-2 pb-2 flex justify-center items-center bg-blue-300 rounded-t-lg ">
          <h2 className="text-xl font-semibold">Bulk Upload Status</h2>
        </div>

        {bulkUploadingStatus.pending && (
          <div className="flex justify-center mt-6">
            <Loader msg={"Please wait while Drafting selected..."}></Loader>
          </div>
        )}

        {bulkUploadingStatus.completed && (
          <div className="max-w-4xl mx-auto p-1">
            <div className="flex  justify-center items-center mb-4 gap-3 text-green-500">
              <CheckCheck className="text-green-500 text-xl" />
              <h2 className="text-xl font-semibold text-center">
                Successfully Drafted{" "}
                {
                  bulkUploadingStatus.results.filter((result) => result.status)
                    .length
                }{" "}
                {bulkUploadingStatus.results.length === 1 ? "video" : "videos"}{" "}
              </h2>
            </div>
            {/* make status true is success and false if error */}
            <div className="flex  justify-center items-center mb-4 gap-3 text-red-500">
              <CircleX className="text-red-500 text-xl" />

              <h2 className="text-xl font-semibold text-center">
                Failed to Draft{" "}
                {
                  bulkUploadingStatus.results.filter((result) => !result.status)
                    .length
                }{" "}
                {bulkUploadingStatus.results.length === 1 ? "video" : "videos"}{" "}
              </h2>
            </div>

            <div className="overflow-x-auto max-h-[400px]">
              <table className="min-w-full bg-white  shadow rounded-b-2xl">
                <thead className="bg-gray-100 text-center">
                  <tr className="border-b">
                    <th className="px-4 py-2 text-center min-w-[150px]">
                      Video ID
                    </th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Message</th>
                    <th className="px-4 py-2 text-center">Details</th>
                  </tr>
                </thead>

                <tbody>
                  {bulkUploadingStatus.results.map((result, index) => {
                    let isLast =
                      index === bulkUploadingStatus.results.length - 1;
                    return (
                      <tr
                        key={index}
                        className={`${
                          result.status ? "bg-green-50 " : "bg-red-50 "
                        }
                          ${isLast ? "rounded-b-4xl" : "border-b"}`}
                      >
                        <td
                          className={`px-4 py-2  ${
                            isLast ? "rounded-bl-2xl" : ""
                          }`}
                        >
                          {truncateText(result.id)}
                        </td>
                        <td
                          className={`font-semibold px-4 py-2 ${
                            result.status ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {result.status ? "Success" : "Error"}
                        </td>
                        <td className="px-4 py-2">{result.message}</td>
                        <td
                          className={`px-4 py-2  ${
                            isLast ? "rounded-br-2xl" : ""
                          }`}
                        >
                          {result.wordpressResponse ? (
                            <a
                              href={result.wordpressResponse.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              View Post
                            </a>
                          ) : (
                            result.error || "-"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="flex justify-center gap-3 mt-6 mb-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition cursor-pointer flex-1 max-w-[90%] mx-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadStatusModal;
