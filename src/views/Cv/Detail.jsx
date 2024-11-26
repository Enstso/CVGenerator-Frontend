import React, { useEffect, useState } from "react";
import { getData, urls } from "../../lib/utils";
import { useParams } from "react-router-dom";

export default function CVDetailView() {
  const { cvId } = useParams(); // Extract ID from the URL
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "Not specified";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateStr));
  };

  useEffect(() => {
    async function fetchCvDetails() {
      try {
        const urlApi = import.meta.env.VITE_API_URL;
        const response = await getData(`${urlApi + urls.cvs}/${cvId}`);
        if (response) {
          setCv(response.cv);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CV details:", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    }
    fetchCvDetails();
  }, [cvId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!cv) {
    return <div className="text-gray-500">CV not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{cv.title}</h1>

      {/* User email */}
      <p className="mb-4 text-gray-700">
        <strong>Email: </strong> {cv.user?.email || "Not specified"}
      </p>

      {/* Summary */}
      <p className="mb-4 text-gray-700">
        <strong>Summary:</strong> {cv.summary || "No summary provided."}
      </p>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <ul className="list-disc ml-5">
          {cv.skills && cv.skills.length > 0 ? (
            cv.skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills listed.</li>
          )}
        </ul>
      </div>

      {/* Experiences */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        <ul className="list-disc ml-5">
          {cv.experiences && cv.experiences.length > 0 ? (
            cv.experiences.map((exp, index) => (
              <li key={index}>
                <strong>{exp.position}</strong> at <strong>{exp.company}</strong>
                <br />
                <span className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </li>
            ))
          ) : (
            <li>No work experience listed.</li>
          )}
        </ul>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <ul className="list-disc ml-5">
          {cv.education && cv.education.length > 0 ? (
            cv.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree}</strong> at <strong>{edu.school}</strong>
                <br />
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </li>
            ))
          ) : (
            <li>No education information provided.</li>
          )}
        </ul>
      </div>

      {/* Creation and update dates */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>Created on:</strong> {formatDate(cv.createdAt)}
        </p>
        <p>
          <strong>Last updated:</strong> {formatDate(cv.updatedAt)}
        </p>
      </div>
    </div>
  );
}
