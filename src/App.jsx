import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlayerForm from './components/PlayerForm'
import PlayerList from './components/PlayerList'
import PlayerDetails from './components/PlayerDetails'
import './index.css'

const cohortName = '2401-FTB-MT-WEB-PT'
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
          // setFilteredPlayers(result.data.players);
        } else {
          console.error('Check the fetch call/response structure', result);
        }
      } catch (err) {
        console.error('Trouble fetching players!', err);
      }
    };
    fetchAllPlayers();
  }, []);

  return (
    <div>
      <h1>Puppy Bowl Puppies</h1>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name} - {player.breed}
          </li>
        ))}
      </ul>
    </div>
  );

  const addPlayer = async (newPlayer) => {
    try {
      const response = await fetch(`${APIURL}/players`,
        {
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
  return (
    <div>
      <h1>Puppy Bowl Puppies</h1>
      <playerForm addPlayer={addPlayer} />
      <PlayerList players={filteredPlayers} />
    </div>
  );
};

// const removePuppy = async (id) => {
//   try {
//     const response = await axios.delete(`${APIURL}/players/${id}`);
//     if (response.status === 204) {
//       const updatedPuppies = puppies.filter(puppy => puppy.id !== id);
//       setPuppies(updatedPuppies);
//       setFilteredPuppies(updatedPuppies);
//     }
//   } catch (err) {
//     console.error(`Unable to remove puppyId #${id}.`, err);
//   }
// };

// const handleSearch = (event) => {
//   const query = event.target.value.toLowerCase();
//   setSearchQuery(query);
//   const filteredPuppies = puppies.filter(puppy =>
//     puppy.name.toLowerCase().includes(query)
//   );
//   setFilteredPuppies(filteredPuppies);
// };

// return (
//   <div>
//     <h1>Puppy Bowl</h1>
//     <input
//       type="text"
//       placeholder="Search puppies..."
//       value={searchQuery}
//       onChange={handleSearch}
//     />
//     <PuppyForm addPuppy={addPuppy} />
//     <PuppyList puppies={filteredPuppies} setSelectedPuppy={setSelectedPuppy} removePuppy={removePuppy} />
//     {selectedPuppy && <PuppyDetails puppy={selectedPuppy} onBack={() => setSelectedPuppy(null)} />}
//   </div>
// );
// };

export default App;

