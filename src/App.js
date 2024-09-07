// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherPage from './components/WeatherPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CitiesTable} />
        <Route path="/weather/:city" component={WeatherPage} />
      </Switch>
    </Router>
  );
};

export default App;
