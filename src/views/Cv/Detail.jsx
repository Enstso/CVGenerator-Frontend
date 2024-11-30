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
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!cv) {
    return <div className="text-gray-500 text-center">CV not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">{cv.title}</h1>

      {/* User email */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">
          <strong className="font-medium text-gray-800">Email:</strong> {cv.user?.email || "Not specified"}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">
          <strong className="font-medium text-gray-800">Summary:</strong> {cv.summary || "No summary provided."}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
        <ul className="list-disc ml-6 text-sm text-gray-700">
          {cv.skills && cv.skills.length > 0 ? (
            cv.skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills listed.</li>
          )}
        </ul>
      </div>

      {/* Experiences */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>
        <ul className="list-none ml-6 text-sm text-gray-700">
          {cv.experiences && cv.experiences.length > 0 ? (
            cv.experiences.map((exp, index) => (
              <li key={index} className="mb-4">
                <div className="font-semibold text-gray-800">{exp.position}</div>
                <div className="text-gray-600">{exp.company}</div>
                <span className="text-xs text-gray-500">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </li>
            ))
          ) : (
            <li>No work experience listed.</li>
          )}
        </ul>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
        <ul className="list-none ml-6 text-sm text-gray-700">
          {cv.education && cv.education.length > 0 ? (
            cv.education.map((edu, index) => (
              <li key={index} className="mb-4">
                <div className="font-semibold text-gray-800">{edu.degree}</div>
                <div className="text-gray-600">{edu.school}</div>
                <span className="text-xs text-gray-500">
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
      <div className="mt-6 text-xs text-gray-500">
        <p>
          <strong className="font-medium text-gray-800">Created on:</strong> {formatDate(cv.createdAt)}
        </p>
        <p>
          <strong className="font-medium text-gray-800">Last updated:</strong> {formatDate(cv.updatedAt)}
        </p>
      </div>
    </div>
  );
}
