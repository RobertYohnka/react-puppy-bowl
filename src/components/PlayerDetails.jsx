import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerDetails = ({ players, onBack }) => {
    const { id } = useParams();
    const player = players.find((player) => player.id === parseInt(id));

    if (!player) {
        return <p>Loading...</p>;
    }

    return (
        <div className="player-details">
            <img src={player.imageUrl} alt={player.name} />
            <h3>{player.name}</h3>
            <p><strong>Breed:</strong> {player.breed}</p>
            <p><strong>Status:</strong> {player.status}</p>
            <p><strong>Team ID:</strong> {player.teamId}</p>
            <button onClick={onBack}>Back to Roster</button>
        </div>
    );
};

export default PlayerDetails;