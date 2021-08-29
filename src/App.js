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


Amplify.configure(awsExports);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
      AssessLoggedInState()    
  })
  const AssessLoggedInState = () => {
    Auth.currentAuthenticatedUser().then(() => {
      setLoggedIn(true)
    }).catch(() => {
      setLoggedIn(false)
    })
  }

  const onSignIn = () => {
    setLoggedIn(true)
  }


  console.log(loggedIn);
 
  return (
   <Router>
     <Switch>
      <Route exact path="/">
        <Todo/>
      </Route>  
       <Route  path ="/login">
         <Login onSignIn={onSignIn}/> 
      </Route>

    </Switch>
     
     
  
      {/*  */}
    </Router>
  )
}

export default App;