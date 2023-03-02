import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import TrainerDetails from './components/pages/TrainerDetails';
import TrainerRegistration from './components/pages/TrainerRegistration';
import Demo from './components/pages/Demo';
import Schools from './components/pages/Schools';
import Profile from './components/pages/Profile';
import LoginPage from './components/pages/loginPage';
import ProtectedRoute from './components/SecurePath';
import { Fragment } from 'react';
import { AuthContext } from './components/authFolder/AuthContext';
import { useContext } from 'react';

function App() {
 const Authenticated = useContext(AuthContext).authData;
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <Fragment>
            <>
              <Navbar />
            </>

            {/* ####################################### Created a protected route to secure my urls */}

            <ProtectedRoute path='/dashboard' component={Dashboard} isAuthenticated={Authenticated} />
            <ProtectedRoute path='/trainer' component={TrainerDetails} isAuthenticated={Authenticated} />
            <ProtectedRoute path='/registration' component={TrainerRegistration} isAuthenticated={Authenticated} />
            <ProtectedRoute path='/demo' component={Demo} isAuthenticated={Authenticated} />
            <ProtectedRoute path='/school' component={Schools} isAuthenticated={Authenticated} />
            <ProtectedRoute path='/profile' component={Profile} isAuthenticated={Authenticated} />
          </Fragment>
        </Switch>
      </Router>
    </>
  );
}

export default App;
