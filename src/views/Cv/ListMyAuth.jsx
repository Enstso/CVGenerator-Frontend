import React, { useEffect, useState } from "react";
import { getData,deleteData, urls,urlApi } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";

export default function CVListMyAuthView() {
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCvs() {
            try {
                const response = await getData(`${urlApi + urls.myCvs}`);
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
        if (window.confirm("Are you sure you want to delete this CV?")) {
            try {
                const response = await deleteData(urlApi+urls.cvs+'/'+cvId)
 
                if (response.success) {
                    setCvs(cvs.filter((cv) => cv._id !== cvId)); // Update the list after deletion
                    navigate("/Mycvs")
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
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-md">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">CV List</h1>

            {/* Create Button */}
            <div className="mb-6 text-right">
                <Link
                    to="/cv/create"
                    className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Create New CV
                </Link>
            </div>

            {cvs.length === 0 ? (
                <p className="text-gray-500 text-center">No CVs available.</p>
            ) : (
                <ul className="space-y-6">
                    {cvs.map((cv) => (
                        <li
                            key={cv._id}
                            className="p-6 border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-50 hover:bg-gray-100"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {cv.title}
                                    </h2>
                                    <p className="text-gray-600 mt-2">{cv.summary}</p>
                                </div>
                                <div className="flex space-x-4">
                                    {/* Update Button */}
                                    <Link
                                        to={`/cv/update/${cv._id}`}
                                        className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Update
                                    </Link>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(cv._id)}
                                        className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
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
