import React, { useEffect, useState } from "react";
import { getData, urls } from "../../lib/utils";
import { Link } from "react-router-dom";

export default function CVListView() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCvs() {
      try {
        const urlApi = import.meta.env.VITE_API_URL;
        const response = await getData(`${urlApi + urls.cvs}`);
        if (response && response.cvs) {
          setCvs(response.cvs);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CVs:", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    }

    fetchCvs();
  }, []);

  // Function to handle CV deletion
  const handleDelete = async (cvId) => {
    const urlApi = import.meta.env.VITE_API_URL;

    if (window.confirm("Are you sure you want to delete this CV?")) {
      try {
        const response = await fetch(`${urlApi + urls.cvs}/${cvId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCvs(cvs.filter((cv) => cv._id !== cvId)); // Update the list after deletion
        } else {
          throw new Error("Failed to delete CV.");
        }
      } catch (error) {
        console.error("Error deleting CV:", error);
        setError("Could not delete the CV. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">CV List</h1>

      {cvs.length === 0 ? (
        <p className="text-gray-500">No CVs available.</p>
      ) : (
        <ul className="space-y-4">
          {cvs.map((cv) => (
            <li
              key={cv._id}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {cv.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{cv.summary}</p>
                </div>
                <div className="flex space-x-2">
                  {/* Update Button */}
                  <Link
                    to={`/cv/update/${cv._id}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    Update
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(cv._id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* View Details */}
              <Link
                to={`/cvs/${cv._id}`}
                className="text-blue-500 hover:underline text-sm mt-4 inline-block"
              >
                View Details →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
