import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlayerDetails = ({ players }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const player = players.find((player) => player.id === parseInt(id));

    if (!player) {
        return <p>Enter a puppy name.</p>;
    }

    const handleBackToRoster = () => {
        window.location.href = '/'; //This forces the page to reload.
    };
    return (
        <div className="player-details-container">
            <div className="player-details-card">
                <img src={player.imageUrl} alt={player.name} className="player-details-image" />
                <h3>{player.name}</h3>
                <p><strong>Breed:</strong> {player.breed}</p>
                <p><strong>Status:</strong> {player.status}</p>
                <p><strong>Team ID:</strong> {player.teamId}</p>
                <button onClick={handleBackToRoster}>Back to Roster</button>
            </div>
        </div>
    );
};

export default PlayerDetails;
