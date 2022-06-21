import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

function validate(input) {
    let errors = {};
    let regExpName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regExpNum = /^\d+$/;
    let regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!input.name) {
        errors.name = "Field `Name` is required";
    } else if (!regExpName.test(input.name)) {
        errors.name = "Field `Name` not accept special caracters or numbers only letters";
    } else {
        errors.name = ""
    }

    if (!input.lastName) {
        errors.lastName = "Field `lastName` is required";
    } else if (!regExpName.test(input.lastName)) {
        errors.lastName = "Field `lastName` not accept special caracters or numbers only letters";
    } else {
        errors.lastName = ""
    }

    if (!input.email) {
        errors.email = "Field `email` is required";
    } else if (!regExpEmail.test(input.email)) {
        errors.email = "insert a valid `email`";
    } else {
        errors.email = "";
    }

    if (!input.password) {
        errors.password = "Field `Duration` is required";
    } else if (!regExpNum.test(input.password)) {
        errors.password = "Field `Password` accept only digits"
    } else {
        errors.duration = "";
    }

    return errors;
}


export default function SingUp() {

    const history = useHistory()
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(input, "input")
        const response = await fetch("http://localhost:3001/signup", {
            method: "POST",
            body: JSON.stringify(input),
            //body:input,
            headers: { "content-type": "application/json" }
        })
        const res = await response.json()
        alert("User was created succesfully")
        setInput({
            name: "",
            lastName: "",
            email: "",
            password: ""
        })
        e.target.reset()

        history.push("/")
    }

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

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Name:</label>
                <input name="name" value={input.name} placeholder="Name..." onChange={(e) => handleInputChange(e)}></input>
                {errors.name && (<p>{errors.name}</p>)} 
                <br></br>
                <label>LastName:</label>
                <input name="lastName" value={input.lastName} placeholder="LastName..." onChange={(e) => handleInputChange(e)}></input>
                {errors.lastName && (<p>{errors.lastName}</p>)} 
                <br></br>
                <label>E-mail:</label>
                <input name="email" value={input.email} placeholder="E-mail..." type="email" onChange={(e) => handleInputChange(e)}></input>
                {errors.email && (<p>{errors.email}</p>)} 
                <br></br>
                <label>Password:</label>
                <input name="password" value={input.password} placeholder="Password..." type="password" onChange={(e) => handleInputChange(e)}></input><br></br>
                {errors.password && (<p>{errors.password}</p>)}
                <br /><br />

                <button type="submit">Send</button>

            </form>
            <br /><br />
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    )
}