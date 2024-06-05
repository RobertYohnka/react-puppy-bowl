import React from "react";

const PlayerDetails = ({ player, onBack }) => {
    return (
        <div className="puppy-datails">
            <img src={puppy.imageUrl} alt={puppy.name} />
            <h3>{puppy.name}</h3>
            <p>Breed: {puppy.breed}</p>
            <p>Status: {puppy.status}</p>
            <p>Team ID: {puppy.teamId}</p>
            <button onClick={onBack}>Back to Roster</button>
        </div>
    );
};

export default PlayerDetails;