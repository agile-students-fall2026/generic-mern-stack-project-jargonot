import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './BeginnerButton.css'

/*
This component represents the link to the beginner-level summary page. 
It is intended to be present on the intermediate summary page to allow users to navigate back to the beginner summary page.
*/


const BeginnerButton = () => {
    // when a user click on the button, it should navigate to the beginner summary page

    return (
        <Link to="/beginner-summary">
            Go to Beginner Summary
        </Link>
        
    )

}