import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {loginUser} from '../actions'
import axios from 'axios'
import { connect } from 'react-redux';
import '../styling/Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    onChangeHandler = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = async event => {
        event.preventDefault()
        console.log("LOGIN: onSubmitHandler", this.state)
        const user = await axios.post("http://localhost:5000/api/login", {
            email: this.state.email,
            password: this.state.password
        })
        this.props.loginUser(user.data)
    }

    render() {
        return (
            <div className="mainDiv">
                <div className="navDiv"><Link className="linkDiv" to="/register">Register</Link></div>
                <form className="formElem" onSubmit={this.onSubmitHandler}>
                    <input className="first" name="email" type="text" placeholder="email" onChange={this.onChangeHandler} />
                    <input className="second" name="password" type="password" placeholder="password" onChange={this.onChangeHandler} />
                    <button className="third" type="submit">Login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {
    loginUser
})(Login)