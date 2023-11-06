const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();

app.get("/api/weather/:city", cors(), async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.weatherapi.com/v1/current.json",
            {
                params: {
                    key: process.env.API_KEY,
                    q: req.params.city,
                },
            }
        );
        const obj = {
            temp_c: response.data.current.temp_c,
            temp_f: response.data.current.temp_f,
            last_updated: response.data.current.last_updated,
            city: response.data.location.name,
        };
        res.json(obj);
    } catch (error) {
        if (error.response.status === 400) {
            res.status(400).send(error.response.data.error.message);
        } else {
            res.status(500).send("failed to fetch data from server");
        }
    }
});
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
});
