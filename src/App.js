import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import TrainerDetails from './components/pages/TrainerDetails';
import TrainerRegistration from './components/pages/TrainerRegistration';
import Demo from './components/pages/Demo';
import Schools from './components/pages/Schools';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/trainer' component={TrainerDetails} />
          <Route path='/registration' component={TrainerRegistration}/>
          <Route path='/demo' component={Demo}/>
          <Route path='/school' component={Schools}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
