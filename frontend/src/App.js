import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'

// Components
import Login from './components/Login'
import Register from './components/Register'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // Render Variables
    const LoginPage = (<Login />)
    const RegisterPage = () => (<Register />)

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => {
              console.log(this.props.user.email)
              if (this.props.user.email == undefined) {
                console.log("No user")
                return LoginPage
              }
              else {
                console.log("Logged in")
                return <div>Logged In</div>
              }
            }} />
            {/* {
              this.props.user == {} ?
              <Route exact path="/" render={LoginPage} />
              :
              <Route exact path="/" render={() => <div>Logged in</div>} />
            } */}
            <Route exact path="/register" render={RegisterPage} />
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
