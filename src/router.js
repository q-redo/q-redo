import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//import Components to be rendered here
import StudentView from './components/StudentView';

export default (
  <BrowserRouter>
    <div>
      <Route component={StudentView} exact path="/student" />
    </div>
  </BrowserRouter>
);
