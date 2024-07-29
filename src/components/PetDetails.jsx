import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPetById } from '../services/api';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPetById(id)
      .then((data) => setPet(data.pets[0]))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!pet) return <div className="text-center">Pet not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <h2 className="text-3xl font-bold mb-4 ">{pet.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div>
          <img src={pet.images[0]} alt={pet.name} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div>
          <p className="text-lg mb-2 "><strong>Animal:</strong> {pet.animal}</p>
          <p className="text-lg mb-2"><strong>Breed:</strong> {pet.breed}</p>
          <p className="text-lg mb-2"><strong>Age:</strong> {pet.age}</p>
          <p className="text-lg mb-2"><strong>Gender:</strong> {pet.gender}</p>
          <p className="text-lg mb-2"><strong>Size:</strong> {pet.size}</p>
          <p className="text-lg mb-2"><strong>Location:</strong> {pet.city}, {pet.state}</p>
          <p className="text-lg mb-4"><strong>Description:</strong> {pet.description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Contact About {pet.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;