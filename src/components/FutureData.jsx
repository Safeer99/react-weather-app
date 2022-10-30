import React from 'react'
import { WeatherState } from '../WeatherContext'
import { Box, Container, Typography } from '@mui/material'

const FutureData = () => {
  const { futureData } = WeatherState()

  return (
    <Container sx={{ color: '#fff', mb: 3 }}>
      <Typography sx={{ fontSize: 18, mb: 2 }}>Todays Weather</Typography>
      <Box
        sx={{
          display: 'flex',
          overflow: 'auto',
          '::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {futureData?.map((data) => {
          return (
            <div
              key={data.dt}
              style={{
                textAlign: 'center',
                padding: '0px 20px',
                borderRight: '2px solid grey',
              }}
            >
              <Typography sx={{ fontSize: '15px' }}>
                {data.dt_txt.slice(11, 16) === '00:00'
                  ? data.dt_txt.slice(8, 10) + '/' + data.dt_txt.slice(5, 7)
                  : data.dt_txt.slice(11, 16)}
              </Typography>
              <Typography sx={{ fontSize: '18px' }}>
                {(data.main.temp - 273.5).toFixed(0)}&deg;
              </Typography>
              <div>
                <img
                  width="80%"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description}
                />
              </div>
              <Typography sx={{ fontSize: '13px' }}>
                {(data.wind.speed * (18 / 5)).toFixed(1)}Km/h
              </Typography>
            </div>
          )
        })}
      </Box>
    </Container>
  )
}

export default FutureData
