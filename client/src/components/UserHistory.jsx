import React from "react"
import {Link} from "react-router-dom"


export default function UserHistory() {
    
    return (
        <div>
            <Link to={"/tickets/new" }>
                <button>New Ticket</button>  
            </Link>
        </div>
    )
}