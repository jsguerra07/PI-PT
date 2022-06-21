import React from "react"
import { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import UserHistory from "./UserHistory"

export default function Ticket(props) {
    const history = useHistory()
    const [tickets, setTickets] = useState([])

    const loadTickets = async () => {
        const response = await fetch(`http://localhost:3001/tickets`)
        const data = await response.json()
        setTickets(data)
        console.log(data)
    }


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/tickets/${id}`, {
                method: "DELETE"
            })
            setTickets(tickets.filter((t) => t.id !== id))
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        loadTickets(props.match.params.id)
    }, [])
    return (
        <>
            <h2>Lista de tickets</h2>
            <UserHistory ></UserHistory>
            {tickets.map((t) => {
                return (
                    <div key={t.id}>
                        <h3>{t.name}</h3>
                        <h4>{t.comments}</h4>
                        <h4>{t.status}</h4>
                        <button onClick={() => history.push(`/ticket/${t.id}/edit`)}>Edit</button>
                        <button onClick={() => handleDelete(t.id)}> Delete</button>
                    </div>
                )

            })
            }
            <br/><br/><br/><br/><br/><br/>
            <Link to = "/home">
                <button>Back</button>
            </Link>
        </>
    )
}