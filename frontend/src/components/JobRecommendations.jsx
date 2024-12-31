// src/components/JobRecommendations.js

import { useState, useEffect } from 'react';
import { getJobRecommendations } from '../services/api';

// eslint-disable-next-line react/prop-types
const JobRecommendations = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobRecommendations(token);
        setJobs(response.recommendedJobs);
      } catch (err) {
        setError('Failed to get job recommendations: '+err);
      }
    };

    fetchJobs();
  }, [token]);

  return (
    <div>
      <h2>Recommended Jobs</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <li key={index}>
              <h4>{job.title}</h4>
              <p>{job.company}</p>
              <p>{job.description}</p>
            </li>
          ))
        ) : (
          <p>No job recommendations available.</p>
        )}
      </ul>
    </div>
  );
};

export default JobRecommendations;
