import React from 'react';

const PuppyList = ({ puppies, setSelectedPuppy, removePuppy }) => {
    return (
        <div>
            <h2>Puppies</h2>
            <div className="puppy-container">
                {puppies.map(puppy => (
                    <div key={puppy.id} className="puppy-card">
                        <img src={puppy.imageUrl} alt={puppy.name} />
                        <h3>{puppy.name}</h3>
                        <p>Breed: {puppy.breed}</p>
                        <p>Status: {puppy.status}</p>
                        <button onClick={() => setSelectedPuppy(puppy)}>See Details</button>
                        <button onClick={() => removePuppy(puppy.id)}>Remove Puppy from Roster</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PuppyList;