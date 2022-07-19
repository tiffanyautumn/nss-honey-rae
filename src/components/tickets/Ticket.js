import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, isStaff, employees }) => {

    let assignedEmployee = null

    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    return <div className="ticket" key={`ticket--${ticketObject.id}`}>
        <header> 
            {
                isStaff
                ?`Ticket ${ticketObject.id}`
                :<Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
            
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "Yes" : "No"}</section>
        <footer>
            {
                ticketObject.employeeTickets.length
                    ? `Currently being worked on ${assignedEmployee !==null ? assignedEmployee.user.fullName : ""} `
                    : <button>Claim</button>
            }
        </footer>
    </div>
}