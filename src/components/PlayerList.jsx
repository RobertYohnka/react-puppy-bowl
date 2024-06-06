import React from 'react';
import { Link } from 'react-router-dom';

const PlayerList = ({ players, setSelectedPlayer, removePlayer }) => {
    return (
        <div>
            <h2>Puppies</h2>
            <div className="puppy-container">
                <ul>
                    {players.map(player => (
                        <li key={player.id} className="puppy-card">
                            <img src={player.imageUrl} alt={player.name} className="puppy-image" />
                            <h3>{player.name}</h3>
                            <p><strong>Breed:</strong> {player.breed}</p>
                            <p><strong>Status:</strong> {player.status}</p>
                            <p><strong>Team ID:</strong> {player.teamId}</p>
                            <Link to={`/players/${player.id}`} onClick={() => setSelectedPlayer(player)}>
                                <button>See Details</button>
                            </Link>
                            <button onClick={() => removePlayer(player.id)}>Remove from Roster</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayerList;