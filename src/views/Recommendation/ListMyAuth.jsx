import React, { useState, useEffect } from "react";
import { getData, urlApi, urls } from "../../lib/utils";

export default function RecommendationListMyAuthView() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      const response = await getData(urlApi + urls.recommandations);
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

  const handleCreate = () => {
    console.log("Creating a new recommendation...");
    // Logic to navigate to a creation form or open a modal
  };

  const handleUpdate = (id) => {
    console.log(`Updating recommendation with id: ${id}`);
    // Logic to navigate to an edit form or open a modal
  };

  const handleDelete = (id) => {
    console.log(`Deleting recommendation with id: ${id}`);
    // Logic to delete the recommendation
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
        <button
          onClick={handleCreate}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Create Recommendation
        </button>
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
                    onClick={() => handleUpdate(rec._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
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