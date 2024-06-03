import React from 'react'

const PuppyForm = ({ addPuppy }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPuppy = {
            name: formData.get('name'),
            breed: formData.get('breed'),
            imageUrl: formData.get('imageUrl'),
            status: formData.get('status'),
            team: formData.get('teamID')
        };
        await addPuppy(newPuppy);
        event.target.reset();
    };

    return (
        <form id="newPuppyForm" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Puppy Name" required />
            <input type="text" name="breed" placeholder="Puppy Breed" required />
            <input type="text" name="imageUrl" placeholder="Image URL" required />
            <input type="text" name="status" placeholder="Field or Bench" required />
        </form>
    );
};

export default PuppyForm;
            )