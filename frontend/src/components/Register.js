import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordCheck: '',
            redirect: false,
            emailAlreadyExists: false
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
        if (this.state.password === this.state.passwordCheck) {
            const newUser = await axios.post("http://localhost:5000/api/users", this.state)
            console.log(newUser)
        }
        else {
            this.setState({
                passwordsDontMatch: true
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <input name="firstName" type="text" placeholder="first name" onChange={this.onChangeHandler} />
                    <input name="lastName" type="text" placeholder="last name" onChange={this.onChangeHandler} />
                    <input name="email" type="email" placeholder="email" onChange={this.onChangeHandler} />
                    <input name="password" type="password" placeholder="password" onChange={this.onChangeHandler} />
                    <button type="submit">Register</button>
                </form>
                <Link to="/">Login</Link>
            </div>
        )
    }
}

export default Register