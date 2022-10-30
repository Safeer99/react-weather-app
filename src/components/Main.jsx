import { Container, styled, Typography } from '@mui/material'
import React from 'react'
import { WeatherState } from '../WeatherContext'

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Main = () => {
  const { data } = WeatherState()

  const date = () => {
    return new Date(new Date().getTime() + data?.timezone)
  }

  const secondsToTime = (timeInSec) => {
    return new Date(timeInSec * 1000 + data?.timezone * 1000)
      .toISOString()
      .slice(11, 16)
  }

  const Details = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  }))

  const LeftBar = styled('div')(({ theme }) => ({
    flex: '1',
    height: '250px',
    borderRight: '2px solid grey',
    padding: '10px 0px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      borderRight: 'none',
      borderBottom: '2px solid grey',
    },
  }))
  const RightBar = styled('div')(({ theme }) => ({
    flex: '1',
    height: '250px',
    padding: '10px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      borderBottom: '2px solid grey',
    },
  }))

  const styles = {
    row: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0px',
    },
    column: {
      flex: '1',
      textAlign: 'center',
    },
  }

  return (
    <Container sx={{ color: '#fff' }}>
      {data && (
        <>
          <div>
            <Typography sx={{ fontSize: 35 }}>
              {data?.name}, {data?.sys.country}
            </Typography>
            <Typography sx={{ fontSize: 18 }}>
              {days[date().getDay()]} {date().toISOString().slice(8, 10)}{' '}
              {months[date().getMonth()]}
            </Typography>
          </div>
          <Details>
            <LeftBar>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '50%',
                }}
              >
                <img
                  style={{ objectFit: 'cover' }}
                  width="70%"
                  src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  alt={data?.weather[0].description}
                />
              </div>
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography sx={{ fontSize: 60, pr: 2 }}>
                  {(data?.main.temp - 273.15).toFixed(1)}&deg;
                </Typography>
                <Typography sx={{ fontSize: '20px', pb: 4 }}>
                  {data?.weather[0].description}
                </Typography>
              </div>
            </LeftBar>
            <RightBar>
              <div style={styles.row}>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {(data?.main.temp_max - 273.15).toFixed(1)}&deg;
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>High</Typography>
                </div>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {(data?.wind.speed * (18 / 5)).toFixed(1)}Km/h
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Wind</Typography>
                </div>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {secondsToTime(data?.sys.sunrise)}
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Sunrise</Typography>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {(data?.main.temp_min - 273.15).toFixed(1)}&deg;
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Low</Typography>
                </div>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {data?.clouds.all}%
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Rain</Typography>
                </div>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {secondsToTime(data?.sys.sunset)}
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Sunset</Typography>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {data?.main.pressure}{' '}
                    <span style={{ fontSize: '15px' }}>mbar</span>
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Pressure</Typography>
                </div>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {data?.main.humidity}%
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Humidity</Typography>
                </div>
                <div style={styles.column}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {(data?.main.feels_like - 273.15).toFixed(1)}&deg;
                  </Typography>
                  <Typography sx={{ fontSize: '15px' }}>Feels Like</Typography>
                </div>
              </div>
            </RightBar>
          </Details>
        </>
      )}
    </Container>
  )
}

export default Main
