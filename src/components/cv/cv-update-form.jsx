import React, { useState, useEffect } from "react"; 
import { getData, postDataV2, urlApi, urls } from "../../lib/utils";
import FormInput from "../forms/formInput";
import FormTextArea from "../forms/formTextArea";
import FormSelect from "../forms/formSelect";
import { useParams } from "react-router-dom";

export function CvUpdateForm() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState("");
  const [educations, setEducation] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cvId } = useParams(); // Extract ID from the URL

  // Load existing CV data
  useEffect(() => {
    async function fetchCv() {
      try {
        const res = await getData(`${urlApi + urls.cvs}/${cvId}`);
        const response = res.cv;
        if (response) {
          setTitle(response.title || "");
          setSummary(response.summary || "");
          setSkills(response.skills ? response.skills.join(";") : "");
          setExperiences(JSON.stringify(response.experiences || [], null, 2));
          setEducation(JSON.stringify(response.education || [], null, 2));
          setVisibility(response.visibility || "private");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading CV data:", error);
        setError("Error loading data. Please try again.");
        setLoading(false);
      }
    }

    fetchCv();
  }, [cvId]);

  // Handle form submission with updated data
  async function submit(e) {
    e.preventDefault();
    if (!title || !summary || !skills || !experiences || !educations) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);

    const urlApi = import.meta.env.VITE_API_URL;
    const updatedData = {
      title,
      summary,
      skills: skills.split(";").map((skill) => skill.trim()),
      experiences: JSON.parse(experiences),
      educations: JSON.parse(educations),
      visibility,
    };

    try {
      const response = await postDataV2(`${urlApi + urls.cvs}/${cvId}`, updatedData, "PUT");
      console.log("CV updated successfully:", response);
      setLoading(false);
    } catch (error) {
      console.error("Error updating CV:", error);
      setError("Error updating CV. Please try again.");
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Update CV</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={submit} className="space-y-4">
        {/* Title */}
        <FormInput
          label="CV Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Front-End Developer"
        />

        {/* Summary */}
        <FormTextArea
          label="Summary"
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Describe yourself in a few sentences..."
          rows={3}
        />

        {/* Skills */}
        <FormInput
          label="Skills (separated by semicolons)"
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Example: JavaScript; React; Node.js"
        />

        {/* Experiences */}
        <FormTextArea
          label="Experiences (JSON)"
          name="experiences"
          value={experiences}
          onChange={(e) => setExperiences(e.target.value)}
          placeholder='[{"_id":"1", "company":"TechCorp", "position":"Developer"}]'
          rows={5}
        />

        {/* Educations */}
        <FormTextArea
          label="Education (JSON)"
          name="educations"
          value={educations}
          onChange={(e) => setEducation(e.target.value)}
          placeholder='[{"school":"University", "degree":"Master"}]'
          rows={5}
        />

        {/* Visibility */}
        <FormSelect
          label="Visibility"
          name="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          options={[
            { value: "private", label: "Private" },
            { value: "public", label: "Public" },
          ]}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
