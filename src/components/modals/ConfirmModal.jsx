import React, { useEffect, useState } from "react";

const ConfirmModal = ({ isOpen, title, message, gifSrc, onConfirm, onCancel }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ">
      <div
        className={`rounded-2xl shadow-xl max-w-sm w-full p-6 transform transition-all duration-300 text-center border-2 border-gray-500 bg-gray-200
        ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <h2 className="text-xl font-bold text-gray-800">????</h2>
        {/* Funny GIF on top */}
        {gifSrc && (
          <img
            src={gifSrc}
            alt="funny confirm gif"
            className="w-40 h-40 mx-auto rounded-xl mb-4 object-cover"
          />
        )}

        {/* Title & Message */}
        {/* <h2 className="text-xl font-bold text-gray-800">{title}</h2> */}
        <p className="text-gray-600 mt-2">{message}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 rounded-xl border border-gray-600 text-gray-600 hover:bg-gray-100 transition cursor-pointer flex-1"
          >
            Nah 😅
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition cursor-pointer flex-1"
          >
            Yep ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
