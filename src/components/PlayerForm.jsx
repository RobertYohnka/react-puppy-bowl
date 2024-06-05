import React from 'react'

const playerForm = ({ addPlayer }) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPlayer = { name, breed };
        addPlayer(newPlayer);
        setName('');
        setBreed('');
    };


    return (
        <form id="newPuppyForm" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Puppy Name" value={name} onChange={(event) => setName(event.target.value)} required />
            <input type="text" name="breed" placeholder="Puppy Breed" value={breed} onChange={(event) => setBreed(event.target.value)} required />
            <button type="submit">Add Puppy</button>
        </form>
    );
};

export default playerForm;