import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/404-error.png"; // Update path as per your project

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-xl">
        <img
          src={notFoundImage}
          alt="404 Not Found"
          className="mx-auto w-72 mb-8 w-[40%] md:w-1/3 lg:w-1/4 xl:w-1/5"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          ⬅️ Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
