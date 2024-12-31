// src/App.js

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ResumeUpload from "./components/ResumeUpload";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";




const App = () => {


  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/resumeupload' element={<ResumeUpload/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
    </div>
    
    </>
    
  );
};

export default App;

/**
 * import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResumeUpload from './components/ResumeUpload';
import JobRecommendations from './components/JobRecommendations';
import { useState } from 'react';

    const [token, setToken] = useState(localStorage.getItem('authToken')); // Store token in localStorage or state

 * <Router>
      <div>
        <h1>Resume Enhancer & Job Recommender</h1>
        <Switch>
          <Route path="/upload">
            <ResumeUpload token={token} />
          </Route>
          <Route path="/jobs">
            <JobRecommendations token={token} />
          </Route>
          <Route path="/">
            <div>
              <h2>Welcome to Resume Enhancer!</h2>
              <p>
                <a href="/upload">Go to Resume Upload</a> |{' '}
                <a href="/jobs">View Job Recommendations</a>
              </p>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
 */