import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState("")
    const {serviceTicketId} =useParams()
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, assignTicket] = useState({
        description: "",
        emergency: false
    })
  
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?id=${serviceTicketId}`)
                .then(response => response.json())
                .then((data) => {
                    const ticketObject = data[0]
                    console.log(ticketObject)
                    assignTicket(ticketObject)
                })
        },
        [serviceTicketId] 
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")


        return fetch(`http://localhost:8088/serviceTickets/${serviceTicketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
            .then(() => {
                
            })
        
    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
    </div>
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket?.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                               assignTicket(copy)
                            }
                        }>{ticket.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket?.emergency}
                        onChange={
                            (evt) => {
                            const copy = {...ticket}
                            copy.emergency = evt.target.checked
                            assignTicket(copy)
                        }
                     } />
                </div>
            </fieldset>
            <button
                onClick= {(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form></>
    )
}
