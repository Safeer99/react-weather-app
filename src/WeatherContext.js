import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
const Weather = createContext()

const WeatherContext = ({ children }) => {

    const [data, setData] = useState();
    const [futureData, setFutureData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFutureData = async (location) => {
        const { data } = await axios.get(`${process.env.REACT_APP_WEB_URL}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
        setFutureData(data.list)
        setLoading(false)
    }

    const fetchData = async (location) => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_WEB_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_API_KEY}`)
        setData(data)
        fetchFutureData(location)
    }

    function showError(err) {
        alert(err.message)
    }

    function showPosition(position) {
        const currentLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        fetchData(currentLocation)
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    useEffect(() => {
        getLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Weather.Provider value={{ fetchData, loading, data, futureData }}>
            {children}
        </Weather.Provider>
    )
}

export default WeatherContext;

export const WeatherState = () => {
    return useContext(Weather)
}