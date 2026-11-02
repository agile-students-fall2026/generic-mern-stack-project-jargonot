import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './IntermediateButton.css'

/*
This component represents the link to the intermediate-level summary page. 
It is intended to be present on the beginner summary page to allow users to navigate to the intermediate summary page.
*/

const IntermediateButton = () => {
    // when a user click on the button, it should navigate to the intermediate summary page

    return (
        <Link to="/intermediate-summary">
            Go to Intermediate Summary
        </Link>
    )

}