// src/components/ResumeUpload.js

import  { useState } from 'react';
import { uploadResume, optimizeResume } from '../services/api';

// eslint-disable-next-line react/prop-types
const ResumeUpload = ({ token }) => {
  const [file, setFile] = useState(null);
  const [optimizedResume, setOptimizedResume] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      await uploadResume(formData, token);
      setError('');
      alert('Resume uploaded successfully!');
    } catch (err) {
      setError('Failed to upload resume: '+err);
    }
  };

  const handleOptimize = async () => {
    try {
      const response = await optimizeResume(token);
      setOptimizedResume(response.optimizedResume);
    } catch (err) {
      setError('Failed to optimize resume: '+err);
    }
  };

  return (
    <div>
      <h2>Upload Your Resume</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleOptimize}>Optimize Resume</button>
      {error && <p className="error">{error}</p>}
      {optimizedResume && (
        <div>
          <h3>Optimized Resume:</h3>
          <p>{optimizedResume}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
