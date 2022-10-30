import { Container, LinearProgress } from "@mui/material";
import FutureData from "./components/FutureData";
import Main from "./components/Main";
import SearchBar from "./components/SearchBar";
import { WeatherState } from "./WeatherContext";
import atmosphere from './assets/atmosphere.jpg'
import Clouds from './assets/Clouds.jpg'
import Clear from './assets/Clear.jpg'
import Thunderstorm from './assets/Thunderstorm.jpg'
import Drizzle from './assets/Drizzle.jpg'
import Snow from './assets/Snow.jpg'
import Rain from './assets/Rain.jpg'

function App() {

  const { data, loading } = WeatherState();

  const weather = ["Thuderstorm", "Drizzle", "Rain", "Snow", "Clear", "Clouds"]
  const imagesObj = [Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds]

  function weatherImage(string) {
    return imagesObj[weather.indexOf(string)]
  }

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      backgroundImage: `url(${weather.includes(data?.weather[0].main) ? weatherImage(data?.weather[0].main) : atmosphere})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.5)",
      transition: "background-image 1.5s ease-out",
      overflow: "hidden scroll",
    }}>
      <Container>
        <SearchBar />
        {loading ?
          <LinearProgress />
          : (
            <>
              <Main />
              <FutureData />
            </>
          )
        }
      </Container>
    </div>
  );
}

export default App;
