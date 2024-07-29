import React, { useState, useEffect } from 'react';
import { fetchBreeds } from '../services/api';
import { usePetContext } from '../context/PetContext';

const SearchForm = ({ onSearch }) => {
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const { setLoading, setError } = usePetContext();

  useEffect(() => {
    if (animal) {
      setLoading(true);
      fetchBreeds(animal)
        .then((data) => setBreeds(data.breeds))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setBreeds([]);
    }
  }, [animal, setLoading, setError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ animal, breed, location, age, size });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-wrap -mx-2 mb-4 text-gray-300">
        <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
          <label htmlFor="animal" className="block mb-2 ">Animal</label>
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            className="w-full p-2 border rounded text-gray-500"
          >
            <option value="">Select an animal</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
          </select>
        </div>
        <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0 ">
          <label htmlFor="breed" className="block mb-2">Breed</label>
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full p-2 border rounded text-gray-500"
            disabled={!animal}
          >
            <option value="">Select a breed</option>
            {breeds.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
          <label htmlFor="location" className="block mb-2 ">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
            className="w-full p-2 border rounded text-gray-500"
          />
        </div>
        <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
          <label htmlFor="age" className="block mb-2">Age</label>
          <select
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded text-gray-500"
          >
            <option value="">Any age</option>
            <option value="baby">Baby</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
          <label htmlFor="size" className="block mb-2">Size</label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border rounded text-gray-500"
          >
            <option value="">Any size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">Extra Large</option>
          </select>
        </div>
        <div className="w-full md:w-1/6 px-2 flex items-end">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;