import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData, getData,  urlApi, urls } from "../../lib/utils";
import { Link } from "react-router-dom";

export default function RecommendationListMyAuthView() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchRecommendations = async () => {
    try {
      const response = await getData(urlApi + urls.recommendations);
      setRecommendations(response.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);



  const handleDelete = async (id) => {
    const response = await deleteData(urlApi+urls.recommendations+'/'+id);
    navigate("/Mycvs")
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          My Recommendations
        </h1>

        {recommendations.length > 0 ? (
          <ul className="space-y-4">
            {recommendations.map((rec) => (
              <li
                key={rec._id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
              >
                <div className="mb-2">
                  <strong className="text-lg text-gray-700">
                    {rec.user.firstname} {rec.user.lastname}
                  </strong>
                  <span className="block text-sm text-gray-500">
                    {rec.user.email}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{rec.text}</p>
                <p className="text-gray-800 font-medium">{rec.content}</p>
                <div className="flex space-x-2 mt-4">
                 
                  <button
                    onClick={() => handleDelete(rec._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recommendations found.</p>
        )}
      </div>
    </div>
  );
}