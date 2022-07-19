import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"
import { useState } from "react"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
            <TicketSearch setterFunction={setSearchTerms}/>
            <TicketList searchTermState={searchTerms}/>
    </>
}