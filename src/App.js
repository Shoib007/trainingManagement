import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import TrainerDetails from './components/pages/TrainerDetails';
import TrainerRegistration from './components/pages/TrainerRegistration';
import Demo from './components/pages/Demo';
import Schools from './components/pages/Schools';
import Profile from './components/pages/Profile';
import LoginPage from './components/pages/loginPage';
import { AuthContext } from './components/authFolder/AuthContext';
import { useContext } from 'react';
import Sidebar from './components/Navbar';

function App() {
  const Authenticated = useContext(AuthContext).authData;
  return (
    <>
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          {Authenticated && <Sidebar />}
          <div style={{ flex: 1, overflowY: 'auto', height: '100vh' }}>
            <Routes>
              {/* ####################################### Created a protected route to secure my urls */}
              <Route path='/' element={<LoginPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/trainer' element={<TrainerDetails />} />
              <Route path='/registration' element={<TrainerRegistration />} />
              <Route path='/demo' element={<Demo />} />
              <Route path='/school' element={<Schools />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
