import express from "express";
import { getCities, getHotels, getRestaurant, getThingsToDo } from "./data.js";
const app = express();
import cors from "cors";
app.use(cors());
app.get("/hotels", (req, res) => {
  res.json({ hotels: getHotels() });
});
app.get("/cities", (req, res) => {
  res.json({ cities: getCities() });
});
app.get("/restaurants", (req, res) => {
  res.json({ restaurants: getRestaurant() });
});
app.get("/thingsToDo", (req, res) => {
  res.json({ thingsToDo: getThingsToDo() });
});
app.get('/cities/:search', (req, res) => {
  const search = req.params.search;
  const cityName = req.query.cityName;
  const country = getCities().find(
    city => city.name.toLocaleLowerCase() === cityName.toLocaleLowerCase()
  );
  const countryId = country.id;
  switch (search) {
    case "hotels":
      const hotels = getHotels().filter(
        (hotel) => hotel.country_id === countryId
      );
      return res.json({ hotels });
    case "thingsToDo":
      const thingsToDo = getThingsToDo().filter(
        (thingsToDo) => thingsToDo.country_id === countryId
      );
      return res.json({ thingsToDo });
      case 'restaurants':
        const restaurants = getRestaurant().filter(
          restaurant => restaurant.country_id === countryId
        );
      return res.json({ restaurants });
  }
});

app.listen(8080);
