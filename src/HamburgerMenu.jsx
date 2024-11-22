import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const HamburgerMenu = ({ isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <div className="hamburger-container">
            {/* Hamburger Icon */}
            {isLoggedIn && < div
                className="hamburger-icon"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>}
            {!isLoggedIn && <button onClick={() => navigate('/map')}>Map</button>}

            {/* Menu that appears on hover */}
            <div
                className={`menu ${isOpen ? 'open' : ''}`}
            >
                <ul>
                    <li onClick={() => navigate("/")}>Map</li>
                    <li onClick={() => navigate("/map_add")}>Add Marker</li>
                    <li onClick={() => navigate("/map_edit")}>Edit Marker</li>
                    <li onClick={() => navigate("/map_delete")}> Delete Marker</li>
                </ul>
            </div>
        </div >
    );
}

export default HamburgerMenu;
