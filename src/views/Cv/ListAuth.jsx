import React, { useEffect, useState } from "react";
import { getData, urls, urlApi } from "../../lib/utils";
import { Link } from "react-router-dom";

export default function CVListAuthView() {
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCvs() {
            try {
                const response = await getData(`${urlApi +  urls.cvs}`);
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

            {cvs.length === 0 ? (
                <p className="text-gray-500 text-center">No CVs available.</p>
            ) : (
                <ul className="space-y-6">
                    {cvs.map((cv) => (
                        <li
                            key={cv._id}
                            className="p-6 border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-50 hover:bg-gray-100"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {cv.title}
                                    </h2>
                                    <p className="text-gray-600 mt-2">{cv.summary}</p>
                                </div>
                                <Link
                                    to={`/recommendation/create/${cv._id}`}
                                    className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition-colors"
                                >
                                    Add Recommendation
                                </Link>

                                <Link
                                    to={`/recommendations/${cv._id}`}
                                    className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition-colors"
                                >
                                    See
                                </Link>
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
