import React from 'react';
import './App.css';
import {Redirect} from 'react-router'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'

// Components
import Login from './components/Login'
import Register from './components/Register'
import Portfolio from './components/Portfolio'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // Render Variables
    const RegisterPage = () => (<Register />)

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => {
              if (this.props.user.email == undefined) {
                return <Login />
              }
              else {
                return <Portfolio />
              }
            }} />
            <Route exact path="/register" render={() => {
              if (this.props.user.email == undefined) {
                return <Register />
              }
              else {
                return <Redirect to="/" />
              }
            }} />
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
