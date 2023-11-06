import "./App.css";
import { useState } from "react";
import axios from "axios";
import icon from "./icon.jpeg";

function App() {
    const [data, setData] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const search = async () => {
        let url = "/api/weather/";
        if (process.env.NODE_ENV === "development") {
            console.log(process.env.NODE_ENV);
            url = "http://localhost:7000/api/weather/";
        }
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}${inputValue}`);
            console.log(data);
            setLoading(false);
            setData(data);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error.message);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="App">
            <header>
                <img src={icon} width="100" height="100" alt="icon" />
            </header>
            <input
                placeholder="enter city name"
                value={inputValue}
                onChange={({ target }) => setInputValue(target.value)}
            />
            <button onClick={search}>search</button>
            {data.city && (
                <div>
                    <h2>Current Weather at {data.city}</h2>
                    <p>
                        Celzius Temperature: <b>{data.temp_c}</b>
                    </p>
                    <p>
                        Fernhait Temperature: <b>{data.temp_f}</b>
                    </p>
                    <p>
                        last updated at <b>{data.last_updated}</b>
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
