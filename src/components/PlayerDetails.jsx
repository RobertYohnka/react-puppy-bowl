import React from "react";

const playerDetails = ({ player, onBack }) => {
    return (
        <div className="puppy-datails">
            <img src={player.imageUrl} alt={player.name} />
            <h3>{player.name}</h3>
            <p>Breed: {player.breed}</p>
            <p>Status: {player.status}</p>
            <p>Team ID: {player.teamId}</p>
            <button onClick={onBack}>Back to Roster</button>
        </div>
    );
};

export default playerDetails;