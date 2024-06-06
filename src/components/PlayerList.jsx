import React from 'react';
import { Link } from 'react-router-dom';

const PlayerList = ({ players, removePlayer }) => {
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
                        <Link to={`/player/${player.id}`}>
                            <button>See Details</button>
                        </Link>
                        <button onClick={() => removePlayer(player.id)}>Remove Puppy from Roster</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerList;