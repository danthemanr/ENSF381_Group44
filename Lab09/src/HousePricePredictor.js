import React, { useState } from 'react';
import './HousePricePredictor.css';

function Price({price}) {
  return <div className="prediction">Predicted Rental Price: {price}</div>
}

export default function HousePricePredictor() {
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [lease_term, setTerm] = useState('');
  const [type, setType] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [sq_feet, setArea] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [smoking, setSmoking] = useState(false);
  const [pets, setPets] = useState(false);

  const [price, setPrice] = useState('0');

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("sending an event");
  
    const backendEndpoint = 'http://127.0.0.1:5001/predict_house_price';
    try {
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({city, province, latitude, longitude, lease_term, type, beds, baths, sq_feet, furnishing, smoking, pets}),
        credentials: "include",
      });

      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        console.log('Form submitted successfully!');
        setPrice(data.predicted_price);
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  }

  return (
    <div className="HousePricePredictor">
      <form id="predictionForm" onSubmit={(e) => handleSubmit(e)}>
        <label>City:</label>
        <input id="city" type="text" onChange={(e) => setCity(e.target.value)}/>
        <label>Province:</label>
        <input id="province" type="text" onChange={(e) => setProvince(e.target.value)}/>
        <label>Latitude:</label>
        <input id="latitude" type="text" onChange={(e) => setLatitude(e.target.value)}/>
        <label>Longitude:</label>
        <input id="longitude" type="text" onChange={(e) => setLongitude(e.target.value)}/>
        <label>Lease Term:</label>
        <input id="lease_term" type="text" onChange={(e) => setTerm(e.target.value)}/>
        <label>Type of House:</label>
        <input id="type" type="text" onChange={(e) => setType(e.target.value)}/>
        <label>Number of Beds:</label>
        <input id="beds" type="text" onChange={(e) => setBeds(e.target.value)}/>
        <label>Number of Baths:</label>
        <input id="baths" type="text" onChange={(e) => setBaths(e.target.value)}/>
        <label>Square Feet:</label>
        <input id="sq_feet" type="text" onChange={(e) => setArea(e.target.value)}/>
        <label>Furnishing:</label>
        <select id="furnishing" onChange={(e) => setFurnishing(e.target.value)}>
          <option value="unfurnished">Unfurnished</option>
          <option value="partially">Partially Furnsihed</option>
          <option value="fully">Fully Furnished</option>
        </select>
        <label>Smoking:</label>
        <input id="smoking" type="checkbox" onChange={(e) => setSmoking(e.target.checked)}/>
        <label>Pets:</label>
        <input id="pets" type="checkbox" onChange={(e) => setPets(e.target.checked)}/>
        <button id="predictButton" type="sumbit">Predict</button>
      </form>
      <Price price={price}/>
    </div>
  );
}