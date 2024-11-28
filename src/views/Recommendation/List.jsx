import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData, urlApi, urls } from "../../lib/utils";

export default function RecommendationListView() {
  const { cvId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await getData(urlApi + urls.recommandations + "/cv/" + cvId);
        setRecommendations(response.recommendations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [cvId]);

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
          Recommendations for CV <span className="text-blue-600">{cvId}</span>
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
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recommendations found for this CV.</p>
        )}
      </div>
    </div>
  );
}