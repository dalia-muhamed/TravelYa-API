import express from 'express';
import { getCities, getHotels, getRestaurant } from './.vercel/api/data.js';
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
  const country = getCities().find(
    city => city.name.toLocaleLowerCase() === cityName
  );
  const countryId = country.id;
  switch (search) {
    case 'hotels':
      const hotels = getHotels().filter(
        hotel => hotel.country_id === countryId
      );
      return res.json({ hotels });
    case 'restaurants':
      const restaurants = getRestaurant().filter(
        restaurant => restaurant.country_id === countryId
      );
      return res.json({ restaurants });
  }
});

app.listen(3000);
