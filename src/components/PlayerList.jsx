import React from 'react';

const PlayerList = ({ players, setSelectedPlayer, removePlayer }) => {
    return (
        <div>
            <h2>Puppies</h2>
            <div className="puppy-container">
                {players.map(player => (
                    <div key={player.id} className="puppy-card">
                        <img src={player.imageUrl} alt={player.name} className="puppy-image" />
                        <h3>{player.name}</h3>
                        <p>Breed: {player.breed}</p>
                        <p>Status: {player.status}</p>
                        <button onClick={() => setSelectedPlayer(player)}>See Details</button>
                        <button onClick={() => removePlayer(player.id)}>Remove from Roster</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerList;