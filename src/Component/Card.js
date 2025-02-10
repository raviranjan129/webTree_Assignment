import React, { useEffect, useState } from 'react';

function Card() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(); 
  }, []); 

  const fetchUser = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mb-[600px]  ml-[200px] mt-2 text-white text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  if (!user) {
    return <div className="text-center">No user data available.</div>;
  }

  return (
    <div className="container mx-auto p-6 w-[500px] bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300 rounded-lg shadow-lg transition duration-300 hover:scale-105"> 
      <div className="flex flex-col md:flex-row items-center mb-6"> 
        <img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-4 shadow-lg border-2 border-gray-300" 
        />
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800"> 
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p className="text-gray-600 mb-1">{user.email}</p>
          <p className="text-gray-600 mb-1">{user.phone}</p>
          <p className="text-gray-600">{user.location.city}, {user.location.country}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4"> 
        <p className="font-semibold text-gray-700">Address:</p> 
        <p className="text-gray-600">{user.location.street.number} {user.location.street.name}</p>
        <p className="text-gray-600">{user.location.postcode}</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6"> 
        <p className="font-semibold text-gray-700">More Information:</p> 
        <p className="text-gray-600">Age: {user.dob.age}</p>
        <p className="text-gray-600">Registered: {new Date(user.registered.date).toLocaleDateString()}</p>
      </div>

      <button
        onClick={fetchUser}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300" 
      >
        Find Other User
      </button>
    </div>
  );
}

export default Card;