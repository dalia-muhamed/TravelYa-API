// api/index.js
import express from 'express';
import { getCities, getHotels, getRestaurant } from './data.js';
import serverless from 'serverless-http';

const app = express();

app.get('/hotels', (req, res) => {
  res.json({ hotels: getHotels() });
});

app.get('/cities', (req, res) => {
  res.json({ cities: getCities() });
});

app.get('/restaurants', (req, res) => {
  res.json({ restaurants: getRestaurant() });
});

app.get('/cities/:search', (req, res) => {
  const search = req.params.search;
  const cityName = req.query.cityName;
  const country = getCities().find(city => city.name.toLowerCase() === cityName);
  const countryId = country.id;

  switch (search) {
    case 'hotels':
      const hotels = getHotels().filter(hotel => hotel.country_id === countryId);
      return res.json({ hotels });

    case 'restaurants':
      const restaurants = getRestaurant().filter(
        restaurant => restaurant.country_id === countryId
      );
      return res.json({ restaurants });
  }
});

// Wrap the Express app with serverless to create a serverless function
export const handler = serverless(app);
