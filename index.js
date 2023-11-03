import express, { json } from 'express';
import { getCities, getHotels, getRestaurant, getThingsToDo } from './data.js';

const app = express();
import cors from 'cors';
app.use(cors());

app.get('/hotels', (req, res) => {
  res.json({ hotels: getHotels() });
});

app.get('/cities', (req, res) => {
  res.json({ cities: getCities() });
});

app.get('/restaurants', (req, res) => {
  res.json({ restaurants: getRestaurant() });
});

app.get('/thingsToDo', (req, res) => {
  res.json({ todos: getThingsToDo() });
});

app.get('/cities/hotels', (req, res) => {
  const hotelName = req.query.hotelName;
  const cityName = req.query.cityName;
  const cities = getCities();
  const hotels = getHotels();

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes((hotelName || '').toLowerCase())
  );

  const country = cities.find(city => {
    if (city && city.name) {
      return city.name.toLowerCase() === (cityName || '').toLowerCase();
    }
    return false;
  });

  if (country) {
    const hotelsInCountry = hotels.filter(
      hotel => hotel.country_id === country.id
    );
    return res.json({ hotels: hotelsInCountry });
  }

  res.json({ hotels: filteredHotels });
});

app.get('/cities/restaurants', (req, res) => {
  const restaurantName = req.query.restaurantName;
  const cityName = req.query.cityName;
  const cities = getCities();
  const restaurants = getRestaurant();

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes((restaurantName || '').toLowerCase())
  );

  const country = cities.find(city => {
    if (city && city.name) {
      return city.name.toLowerCase() === (cityName || '').toLowerCase();
    }
    return false;
  });

  if (country) {
    const restaurantsInCountry = restaurants.filter(
      restaurant => restaurant.country_id === country.id
    );
    return res.json({ restaurants: restaurantsInCountry });
  }

  res.json({ restaurants: filteredRestaurants });
});

app.get('/cities/thingsToDo', (req, res) => {
  const todoName = req.query.todoName;
  const cityName = req.query.cityName;
  const cities = getCities();
  const thingsToDo = getThingsToDo();

  const filteredToDos = thingsToDo.filter(todo =>
    todo.name.toLowerCase().includes((todoName || '').toLowerCase())
  );

  const country = cities.find(city => {
    if (city && city.name) {
      return city.name.toLowerCase() === (cityName || '').toLowerCase();
    }
    return false;
  });

  if (country) {
    const toDosInCountry = thingsToDo.filter(
      todo => todo.country_id === country.id
    );
    return res.json({ todos: toDosInCountry });
  }

  res.json({ todos: filteredToDos });
});

app.listen(8080);
