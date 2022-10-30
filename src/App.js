import { Container, LinearProgress } from "@mui/material";
import FutureData from "./components/FutureData";
import Main from "./components/Main";
import SearchBar from "./components/SearchBar";
import { WeatherState } from "./WeatherContext";

function App() {

  const { data, loading } = WeatherState();

  const weather = ['Thuderstorm', 'Drizzle', 'Rain', 'Snow', 'Clear', 'Clouds']

  const convert = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  return (
    <div className={`container ${weather.includes(data?.weather[0].main) ? convert(data?.weather[0].main) : 'atmosphere'}`}>
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
