import './Card.css';
import React from "react";

const Card = ({ name, description, image }) => {
    return (
        <div className="card">
            <img src={image} alt="Picture" className="profile-pic" />
            <div className="about-card-content">
                <h3 className="name"><u>{name}</u></h3>
                <p className="description">"{description}"</p>
            </div>
        </div>
    );
};

export default Card;
