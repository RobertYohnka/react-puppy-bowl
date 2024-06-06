import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import PlayerDetails from './components/PlayerDetails';
import './index.css';

const cohortName = '2401-FTB-MT-WEB-PT';
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const App = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAllPlayers = async () => {
            try {
                const response = await fetch(`${APIURL}/players`);
                const result = await response.json();
                if (result.success) {
                    setPlayers(result.data.players);
                    setFilteredPlayers(result.data.players);
                } else {
                    console.error('Check the fetch call/response structure', result);
                }
            } catch (err) {
                console.error('Trouble fetching players!', err);
            }
        };
        fetchAllPlayers();
    }, []);

    const addPlayer = async (newPlayer) => {
        try {
            const response = await fetch(`${APIURL}/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newPlayer.name,
                    breed: newPlayer.breed,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setPlayers((prevPlayers) => [...prevPlayers, result.data.newPlayer]);
                setFilteredPlayers((prevPlayers) => [...prevPlayers, result.data.newPlayer]);
            } else {
                console.error('Check the fetch call/response structure', result);
            }
        } catch (err) {
            console.error('Unable to add puppy', err);
        }
    };

    const removePlayer = async (id) => {
        try {
            const response = await fetch(`${APIURL}/players/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedPlayers = players.filter(player => player.id !== id);
                setPlayers(updatedPlayers);
                setFilteredPlayers(updatedPlayers);
            } else {
                console.error(`Unable to remove puppyId #${id}.`);
            }
        } catch (err) {
            console.error(`Unable to remove puppyId #${id}.`, err);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = players.filter(player =>
            player.name.toLowerCase().includes(query)
        );
        setFilteredPlayers(filtered);
    };

    return (
        <Router>
            <div>
                <h1>Puppy Bowl</h1>
                <input
                    type="text"
                    placeholder="Search puppies..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <PlayerForm addPlayer={addPlayer} />
                <Routes>
                    <Route
                        path="/"
                        element={<PlayerList players={filteredPlayers} setSelectedPlayer={setSelectedPlayer} removePlayer={removePlayer} />}
                    />
                    <Route
                        path="/players/:id"
                        element={<PlayerDetails player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
Updated PlayerList.jsx:
Ensure that the Link component correctly navigates and the setSelectedPlayer function is properly utilized.

    jsx
Copy code
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