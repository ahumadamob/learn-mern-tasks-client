import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alert/alertState';
import AuthState from './context/auth/authState';
import PrivateRoute from './components/routes/PrivateRoute';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Projects from './components/projects/Projects';

import tokenAuth from './config/token';

// Revisar si hay un token de usuario
const token = localStorage.getItem('mern_projects_token');
if(token){
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>           
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
