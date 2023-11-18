import express, { json } from "express";
import { getCities, getHotels, getRestaurant, getThingsToDo } from "./data.js";

const app = express();
import cors from "cors";
app.use(cors());
app.get("/hotels", (req, res) => {
  res.json({ hotels: getHotels() });
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;


  if (distance < minDistance) {
    minDistance = distance;
    nearestCity = city;
  }

}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


app.get("/cities", (req, res) => {
  const lat = req.query.lat;
  const lang = req.query.lang;
  let minDistance = Infinity;
  let nearestCity = null;
  const cities =
    lat && lang
      ? getCities.filter((city) =>
          getDistanceFromLatLonInKm(lat, lang, city.latitude, city.longitude)
        )
      : getCities;
  res.json({ cities });
});

app.get("/restaurants", (req, res) => {
  res.json({ restaurants: getRestaurant() });
});

app.get("/thingsToDo", (req, res) => {
  res.json({ todos: getThingsToDo() });
});

app.get("/cities/hotels", (req, res) => {
  const hotelName = req.query.hotelName;
  const cityName = req.query.cityName;
  const cities = getCities();
  const hotels = getHotels();

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes((hotelName || "").toLowerCase())
  );

  const country = cities.find((city) => {
    if (city && city.name) {
      return city.name.toLowerCase() === (cityName || "").toLowerCase();
    }
    return false;
  });

  if (country) {
    const hotelsInCountry = hotels.filter(
      (hotel) => hotel.country_id === country.id
    );
    return res.json({ hotels: hotelsInCountry });
  }

  res.json({ hotels: filteredHotels });
});

app.get("/cities/restaurants", (req, res) => {
  const restaurantName = req.query.restaurantName;
  const cityName = req.query.cityName;
  const cities = getCities();
  const restaurants = getRestaurant();

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes((restaurantName || "").toLowerCase())
  );

  const country = cities.find((city) => {
    if (city && city.name) {
      return city.name.toLowerCase() === (cityName || "").toLowerCase();
    }
    return false;
  });

  if (country) {
    const restaurantsInCountry = restaurants.filter(
      (restaurant) => restaurant.country_id === country.id
    );
    return res.json({ restaurants: restaurantsInCountry });
  }

  res.json({ restaurants: filteredRestaurants });
});

app.get("/cities/thingsToDo", (req, res) => {
  const cityName = req.query.cityName;
  const todoName = req.query.todoName;
  const cities = getCities();
  const thingsToDo = getThingsToDo();

  const filteredToDos = thingsToDo.filter((todo) =>
    todo.name.toLowerCase().includes((todoName || "").toLowerCase())
  );

  const country = cities.find((city) => {
    if (city && city.name) {
      return city.name.toLowerCase() === (cityName || "").toLowerCase();
    }
    return false;
  });

  if (country) {
    const toDosInCountry = thingsToDo.filter(
      (todo) => todo.country_id === country.id
    );
    return res.json({ todos: toDosInCountry });
  }

  res.json({ todos: filteredToDos });
});

app.get("/get/:category", (req, res) => {
  const category = req.params.category;
  const queryName = req.query.queryName;
  const cities = getCities();
  const city = cities.find((city) =>
    city.name.toLocaleLowerCase().includes(queryName.toLowerCase())
  );
  let data;
  switch (category) {
    case "Hotels":
      data = city
        ? getHotels().filter((hotel) => hotel.country_id === city.id)
        : getHotels().filter((hotel) =>
            hotel.name.toLowerCase().includes(queryName.toLowerCase())
          );
      break;
    case "Restaurants":
      data = city
        ? getRestaurant().filter(
            (restaurant) => restaurant.country_id === city.id
          )
        : getRestaurant().filter((restaurant) =>
            restaurant.name.toLowerCase().includes(queryName.toLowerCase())
          );
      break;
    case "ThingsToDo":
      data = city
        ? getThingsToDo().filter((todo) => todo.country_id === city.id)
        : getThingsToDo().filter((todo) =>
            todo.name.toLowerCase().includes(queryName.toLowerCase())
          );
      break;
  }
  res.json({ data });
});

app.listen(8080);
