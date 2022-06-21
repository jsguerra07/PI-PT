import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"


function validate(input) {
    let errors = {};
    let regExpName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regExpNum = /^\d+$/;

    /* if(!input.user){
        errors.user = "Field `Name` is required";
    } else if (!regExpName.test(input.name)){
        errors.name = "Field `Name` not accept special caracters or numbers only letters";
    } else {
        errors.name = ""
    } */

    if (!input.user) {
        errors.user = "Field `User` is required";
    } else {
        errors.user = ""
    }

    if (!input.password) {
        errors.password = "Field `Password` is required";
    } else {
        errors.password = ""
    }

    return errors
}


export default function Login() {
    const history = useHistory()
    const [input, setInput] = useState({
        user: "",
        password: ""
    })
    const [errors, setErrors] = useState({})

    function handleInputChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        /*  const response = await fetch("/urlback", {
             method: "POST",
             body: JSON.stringify(input),
             headers: { "content-type": "application/json" }
         })
         const res = await response.json()
         console.log(res) */
        setInput({
            user: "",
            password: ""
        })

        history.push("/home")
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>User:</label>
                <input name="user" onChange={(e) => handleInputChange(e)} placeholder="E-mail..."></input><br></br>
                {errors.user && (<p>{errors.user}</p>)}
                <label>Password:</label>
                <input name="password" type="password" onChange={(e) => handleInputChange(e)} placeholder="Password..."></input>
                {errors.password && (<p>{errors.password}</p>)}
                <br></br><br></br>
                {errors.user === "" && errors.password === "" ? <div><button type="submit">Send</button></div> : <h3>Form is incomplete</h3>}

            </form>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    )
}