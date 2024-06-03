import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PuppyForm from './components/PuppyForm'
import PuppyList from './components/PuppyList'
import PuppyDetails from './components/PuppyDetails'
import './index.css'

const cohortName = '2401-FTB-MT-WEB-PT'
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;


const App = () => {
  const [puppies, setPuppies] = useState([]);
  const [filteredPuppies, setFilteredPuppies] = useState([]);
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const response = await axios.get(`${APIURL}/players`);
        if (response.data.success) {
          setPlayers(response.data.data.players);
          setFilteredPlayers(response.data.data.players);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
      }
    };
    fetchAllPlayers();
  }, []);

  const addPuppy = async (puppy) => {
    try {
      const response = await axios.post(`${APIURL}/players`, newPuppy);
      if (response.data.success) {
        const newPuppy = response.data.data.newPuppy;
        setPuppies([...puppies, newPuppy]);
        setFilteredPuppies([...puppies, newPuppy]);
      }
    } catch (err) {
      console.error('Unable to add puppy.', err)
    }
  };

  const removePuppy = async (id) => {
    try {
      const response = await axios.delete(`${APIURL}/players/${id}`);
      if (response.status === 204) {
        const updatedPuppies = puppies.filter(puppy => puppy.id !== id);
        setPuppies(updatedPuppies);
        setFilteredPuppies(updatedPuppies);
      }
    } catch (err) {
      console.error(`Unable to remove puppyId #${id}.`, err);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredPuppies = puppies.filter(puppy =>
      puppy.name.toLowerCase().includes(query)
    );
    setFilteredPuppies(filteredPuppies);
  };

  return (
    <div>
      <h1>Puppy Bowl</h1>
      <input
        type="text"
        placeholder="Search puppies..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <PuppyForm addPuppy={addPuppy} />
      <PuppyList puppies={filteredPuppies} setSelectedPuppy={setSelectedPuppy} removePuppy={removePuppy} />
      {selectedPuppy && <PuppyDetails puppy={selectedPuppy} onBack={() => setSelectedPuppy(null)} />}
    </div>
  );
};

export default App;

