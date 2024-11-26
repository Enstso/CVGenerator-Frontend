import React, { useEffect, useState } from "react";
import { getData, postDataV2, urls } from "../../lib/utils";
import FormTextArea from "../forms/formTextArea";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

export function RecommendationUpdateForm({ recommendationId }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [selectedCv, setSelectedCv] = useState(null);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recommendation and CV data
  useEffect(() => {
    async function fetchData() {
      try {
        const urlApi = import.meta.env.VITE_API_URL;

        // Fetch the recommendation
        const recommendationResponse = await getData(
          `${urlApi + urls.recommendations}/${recommendationId}`
        );
        if (recommendationResponse) {
          setContent(recommendationResponse.content || "");
          setRating(recommendationResponse.rating || 1);
          setSelectedCv(recommendationResponse.cvId || null);
        }

        // Fetch the CVs
        const cvResponse = await getData(`${urlApi + urls.cvs}`);
        if (cvResponse) {
          setCvs(cvResponse.cvs || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error loading data. Please try again.");
        setLoading(false);
      }
    }

    fetchData();
  }, [recommendationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || !selectedCv) {
      alert("Please provide all required fields.");
      return;
    }

    const updatedRecommendation = {
      content,
      rating,
      cvId: selectedCv,
    };

    try {
      const urlApi = import.meta.env.VITE_API_URL;
      const response = await postDataV2(
        `${urlApi + urls.recommendations}/${recommendationId}`,
        updatedRecommendation,
        "PUT"
      );
      console.log("Recommendation updated successfully:", response);
    } catch (error) {
      console.error("Error updating recommendation:", error);
      setError("Error updating recommendation. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Update Recommendation
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CV Selection */}
        <FormSelect
          label="Select CV"
          name="cv"
          value={selectedCv}
          onChange={(e) => setSelectedCv(e.target.value)}
          options={cvs.map((cv) => ({ value: cv._id, label: cv.title }))}
        />

        {/* Recommendation Content */}
        <FormTextArea
          label="Recommendation Content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your recommendation..."
          rows={5}
        />

        {/* Rating */}
        <FormSelect
          label="Rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
          ]}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Update Recommendation
          </button>
        </div>
      </form>
    </div>
  );
}
