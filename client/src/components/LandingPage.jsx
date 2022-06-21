import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


export default function LandingPage() {

    const [companies, setCompanies] = useState([])

    /* const loadTickets = async () => {
        const response = await fetch("http://localhost:3001/tickets")
        const data = await response.json()
        setTickets(data)
        //console.log(data)
    } */

    /* let loadCompanies = async () => {
        const response = await fetch("http://localhost:3001/companies")
        const data = await response.json()
        //console.log(data, "companies")
        setCompanies(data)
    }

    useEffect(() => {
        loadCompanies()
    }, []) */


    return (
        <div>
            <br></br>
            <div>
                <img src="https://media-exp1.licdn.com/dms/image/C4E0BAQEWo1j-T3mZpg/company-logo_200_200/0/1605844114513?e=2147483647&v=beta&t=SqBXM0LEK1qdZ054lvxBc1ChSf8gKNQpQ3NfQV8yn7c" alt="pi-interactiva-logo" />
            </div>
            <h1>PI INTERACTIVA-LIST</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>SignUp</button>
            </Link>
           {/*  <h2>Companies</h2><hr/>
            {
                companies.length === 0 ? <h3>Companies not found</h3>:companies.map((company) => {
                    return (
                        <div key={company.id}>
                            <h3 > {company.name.toUpperCase()} </h3>
                            <img src={company.image} alt="logo brand" width="125px" />
                            <h5>Nit:{company.nit}</h5>
                            <h5>Phone:{company.phone}</h5>
                            <h5>{company.address}</h5>
                            <h5>{company.email}</h5>
                            <hr/>
                        </div>
                    )
                })
            } */}
        </div>
    )
}
