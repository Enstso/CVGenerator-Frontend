import React, { useState, useCallback } from "react";
import { postDataV2, urlApi, urls } from "../../lib/utils";
import FormInput from "../forms/formInput";
import FormTextArea from "../forms/formTextArea";
import FormSelect from "../forms/formSelect";

export function CvCreateForm() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    skills: "",
    experiences: "",
    educations: "",
    visibility: "private",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const parseJsonInput = (input) => {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, summary, skills, experiences, educations, visibility } = formData;

    const payload = {
      title,
      summary,
      skills: skills ? skills.split(";").map((s) => s.trim()) : [],
      experiences: parseJsonInput(experiences),
      educations: parseJsonInput(educations),
      visibility,
    };

    const response = await postDataV2(urlApi + urls.cvs, payload);
    console.log(response);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a CV</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="CV Title"
          name="title"
          value={formData.title}
          placeholder="Example: Front-End Developer"
          onChange={handleChange}
        />
        <FormTextArea
          label="Summary"
          name="summary"
          value={formData.summary}
          rows={3}
          placeholder="Describe yourself in a few sentences..."
          onChange={handleChange}
        />
        <FormInput
          label="Skills (separated by semicolon)"
          name="skills"
          value={formData.skills}
          placeholder="Example: JavaScript; React; Node.js"
          onChange={handleChange}
        />
        <FormTextArea
          label="Experiences (JSON)"
          name="experiences"
          value={formData.experiences}
          rows={5}
          placeholder='[{"_id":"1", "company":"TechCorp", "position":"Developer"}]'
          onChange={handleChange}
        />
        <FormTextArea
          label="Education (JSON)"
          name="educations"
          value={formData.educations}
          rows={5}
          placeholder='[{"school":"University", "degree":"Master"}]'
          onChange={handleChange}
        />
        <FormSelect
          label="Visibility"
          name="visibility"
          value={formData.visibility}
          options={[
            { value: "private", label: "Private" },
            { value: "public", label: "Public" },
          ]}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
