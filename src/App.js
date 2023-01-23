import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import UserDetailsRoute from './components/UserDetailsRoute'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute
            exact
            path="/users/:userId"
            component={UserDetailsRoute}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </>
    )
  }
}

export default App
