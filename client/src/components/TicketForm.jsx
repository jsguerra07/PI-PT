import React from "react"
import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Ticket from "./Ticket"

export default function TicketForm() {

    const history = useHistory()
    const params = useParams()

    const [ticket, setTicket] = useState({
        name: "",
        comments: "",
        status: "activo",
    })

    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    function handleInputChange(e) {
        e.preventDefault()
        setTicket({ ...ticket, [e.target.name]: e.target.value })
    }

    function handleSelectStatus(e) {
        e.preventDefault()
        setTicket({
            ...ticket,
            status: e.target.value
        })

    }

    async function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)

        if (editing) {
            const response = await fetch(`http://localhost:3001/tickets/${params.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(ticket)
            });
            //const data= await response.json()
            console.log("update")
        } else {
            const res = await fetch(`http://localhost:3001/tickets/new`, {
                method: "POST",
                body: JSON.stringify(ticket),
                headers: { "content-type": "application/json" },
            });
            const data = await res.json()
        }

        /* const res = await fetch(`http://localhost:3001/tickets/new`, {
                method: "POST",
                body: JSON.stringify(ticket),
                headers: { "content-type": "application/json" },
         });
        const data = await res.json() */

        setLoading(false)
        console.log(ticket)
        alert("Ticket was created successfully")
        history.push("/home")
    }

    const loadTicket = async (id) => {
        const response = await fetch(`http://localhost:3001/tickets/${id}`)
        const data = await response.json()
        console.log(data)
        setTicket({ name: data.name, comments: data.comments, status: data.status })
        setEditing(true)
    }

    useEffect(() => {
        if (params.id) {
            loadTicket(params.id)

        }

    }, [params.id])

    return (
        <div>

            <h3>Nuevo ticket</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Name:</label>
                <input name="name" placeholder="Name" value={ticket.name} onChange={(e) => handleInputChange(e)}></input>
                <label>Comments:</label>
                <input name="comments" placeholder="Comments" value={ticket.comments} onChange={(e) => handleInputChange(e)}></input>
                <label>Status:</label>
                <select onChange={(e) => handleSelectStatus(e)}>
                    <option value={ticket.status}>{ticket.status}</option>
                    <option value="activo">Active</option>
                    <option value="en proceso">In Process</option>
                    <option value="finalizado">Finished</option>
                </select>

                <button type="submit" disabled={!ticket.name}>{loading === true ? "loading" : "Save"}</button>
            </form>
        </div>
    )
}