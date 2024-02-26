import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import JobHeader from './pages/JobHeader.jsx'
import JobList from './pages/JobList.jsx'
import JobDescription from './pages/JobDescription.jsx'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<JobHeader />}>
          <Route path="" element={<JobList />} />
          <Route path=":id" element={<JobDescription />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
