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
            redirect: false
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
        console.log("REGISTER: onSubmitHandler", this.state)

        const newUser = await axios.post("http://localhost:5000/api/users", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            balance: 5000
        })
        if (newUser.status === 200) {
            this.setState({
                redirect: true
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