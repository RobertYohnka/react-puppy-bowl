import React from 'react';

const PlayerDetails = ({ player, onBack }) => {
    return (
        <>
            <div className="player-details-container">
                <button onClick={onBack} className="back-button">Back to Roster</button>
                <div className="player-details-card">
                    <img src={player.imageUrl} alt={player.name} className="player-details-imnage" />
                    <h2>{player.name}</h2>
                    <p><strong>Breed:</strong> {player.breed}</p>
                    <p><strong>Status:</strong> {player.status}</p>
                    <p><strong>Team ID:</strong> {player.teamId}</p>
                </div>
            </div>
        </>
    );
};

export default PlayerDetails;