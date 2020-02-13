import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div>
      <Switch>
        <Route excat path='/' render={(props) => <Dashboard {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
