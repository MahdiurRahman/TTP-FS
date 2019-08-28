import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Register extends Component {
    render() {
        return (
            <div>
                <form onSubmit={() => console.log("REGISTER: onSubmit")}>
                    <input name="firstName" type="text" placeholder="first name" />
                    <input name="lastName" type="text" placeholder="last name" />
                    <input name="email" type="email" placeholder="email" />
                    <input name="password" type="password" placeholder="password" />
                    <input name="passwordCheck" type="password" placeholder="retype password" />
                    <button type="submit">Register</button>
                </form>
                <Link to="/">Login</Link>
            </div>
        )
    }
}

export default Register