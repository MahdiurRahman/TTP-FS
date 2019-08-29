import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordCheck: ''
        }
    }

    onChangeHandler = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    onSubmitHandler = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <input name="firstName" type="text" placeholder="first name" onChange={this.onChangeHandler} />
                    <input name="lastName" type="text" placeholder="last name" onChange={this.onChangeHandler} />
                    <input name="email" type="email" placeholder="email" onChange={this.onChangeHandler} />
                    <input name="password" type="password" placeholder="password" onChange={this.onChangeHandler} />
                    <input name="passwordCheck" type="password" placeholder="retype password" onChange={this.onChangeHandler} />
                    <button type="submit">Register</button>
                </form>
                <Link to="/">Login</Link>
            </div>
        )
    }
}

export default Register