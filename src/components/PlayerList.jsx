import React from 'react';

const playerList = ({ players, setSelectedPlayer, removePlayer }) => {
    return (
        <div>
            <h2>Puppies</h2>
            <div className="puppy-container">
                <ul>
                    {players.map(player => (
                        <li key={player.id} className="puppy-card">
                            <img src={player.imageUrl} alt={player.name} />
                            <h3>{player.name}</h3>
                            <p>Breed: {player.breed}</p>
                            <p>Status: {player.status}</p>
                            <button onClick={() => setSelectedPlayer(player)}>See Details</button>
                            <button onClick={() => removePlayer(player.id)}>Remove Puppy from Roster</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default playerList;