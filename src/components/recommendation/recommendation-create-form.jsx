import React, { useState } from "react";

export function RecommendationCreateForm() {
    
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [skills,setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [education,setEducation] = useState([]);
    const [visibility,setVisibility] = useState(["public","private"]);
    return (
    <>
      <h1>form à faire</h1>

    </>
  );
}
