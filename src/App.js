/* src/App.js */
import React, { useEffect, useState } from 'react'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import Amplify, { API, Auth, graphqlOperation, Hub } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";
import Login from './components/Login'
import Todo from './components/Todo'
import { BrowserRouter as Router ,Switch, Route } from 'react-router-dom'
import Signup from './components/Signup'
import ConfirmSignup from './components/ConfirmSignup'
import PrivateRoute from './components/PrivateRoute'


Amplify.configure(awsExports);

const App = () => {
 
  return (
   <Router>
     <Switch>
      <PrivateRoute exact path="/todo">
      </PrivateRoute>  
       <Route  path ="/login">
         <Login /> 
      </Route>
      <Route exact path="/">
        <Signup/>
      </Route>  
      <Route exact path="/confirm-register">
        <ConfirmSignup/>
      </Route>  
    </Switch>  
  </Router>
  )
}

export default App;