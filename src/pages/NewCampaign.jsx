import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewCampaign = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('YOUR_BACKEND_API_URL/campaigns', { name, description })
      .then(response => {   
        console.log(Response, response);   
        navigate('/');
      })
      .catch(error => {
        console.error("There was an error creating the campaign!", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Campaign Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Campaign</button>
      </form>
    </div>
  );
};

export default NewCampaign;
