const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./db.json");
const { json, query} = require("express");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/destination", (req, res) => {
    res.json(data.destination);
});

app.get("/hotels", (req, res) => {
    const { page= 1, limit = 6, sort } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);

    let sortedHotels = [...data.hotels];

    if (sort === "priceLowest") {
        sortedHotels.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHighest") {
        sortedHotels.sort((a, b) => b.price - a.price);
    }

    if (sort === "ratingHigh") {
        sortedHotels.sort((a, b) => b.hotel_rating - a.hotel_rating);
    } else if (sort === "ratingLow") {
        sortedHotels.sort((a, b) => a.hotel_rating - b.hotel_rating);
    }

    const paginatedHotels = sortedHotels.slice(startIndex, endIndex);

    res.status(200).json ({
        hotels: paginatedHotels,
        total: data.hotels.length,
    })
});

app.get("/hotels/:id", (req, res) => {
    const { id } = req.params;
    const hotel = data.hotels.find((hotel) => hotel.id === parseInt(id, 10));

    if (hotel) {
        res.json(hotel);
    } else {
        res.status(404).json({ message: "Hotel not found" });
    }
});

app.get("/search", (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: "Потрібно ввести назву готелю" });
    }

    const hotels = data.hotels
        .filter((hotel) => hotel.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 4);

    res.json(hotels);
})

app.post("/hotels", (req, res) => {
    const { city } = req.body;
    const hotels = data.hotels.filter((hotel) => hotel.city === city);

    res.status(200).json(hotels);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));