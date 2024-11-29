import React, { useEffect, useState } from "react";
import { getData, postDataV2, urls } from "../../lib/utils";  // Assuming getData and postDataV2 are available in utils
import FormTextArea from "../forms/formTextArea";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
import { useParams } from "react-router-dom";

export function RecommendationCreateForm() {
  const [cvs, setCvs] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {cvId} = useParams(); 
  // Load existing CV data
  useEffect(() => {
    async function fetchCv() {
      try {
        const urlApi = import.meta.env.VITE_API_URL;
        const response = await getData(`${urlApi + urls.cvs}`);
        if (response) {
          setCvs(response.cvs || []);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading CV data:", error);
        setError("Error loading data. Please try again.");
        setLoading(false);
      }
    }

    fetchCv();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("vbbbb");
    if (!content) {
      alert("Please select a CV and provide feedback.");
      return;
    }

    const recommendationData = {
      content,
      rating,
      cvId: cvId,
    };

    try {
      const urlApi = import.meta.env.VITE_API_URL;
      const response = await postDataV2(urlApi + urls.recommendations, recommendationData);
      console.log("Recommendation submitted:", response);
      // Optionally, reset form fields after successful submission
      setContent("");
      setRating(1);
 
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      setError("Error submitting recommendation. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading CVs...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a Recommendation</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">


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
            Submit Recommendation
          </button>
        </div>
      </form>
    </div>
  );
}
