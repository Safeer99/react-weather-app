import { Search } from '@mui/icons-material'
import { Container, InputBase, styled, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { WeatherState } from '../WeatherContext'
import axios from 'axios'

const SearchBar = () => {
  const value = useRef()
  const [fetched, setFetched] = useState(false)
  const [cities, setCities] = useState()

  const { fetchData } = WeatherState()

  const handleClick = (cityData) => {
    fetchData(cityData)
    setFetched(false)
  }

  const handleSearch = async () => {
    const { data } = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value.current}`,
      {
        headers: {
          'X-RapidAPI-Key':
            '3bfdbc5059msh05bd2403548e75bp1d939bjsn5868540d4f83',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      },
    )
    setCities(data.data)
    setFetched(true)
  }

  const SearchWrapper = styled('div')({
    height: '45px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    margin: '0px 20px',
    borderRadius: fetched ? 'none' : '0px 0px 15px 15px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
  })

  const styles = {
    dropBoxWrapper: {
      margin: '0px 20px',
      position: 'relative',
    },
    dropBox: {
      position: 'absolute',
      width: '100%',
    },
    dropboxElement: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderTop: '2px solid black',
      padding: '5px 0px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
    },
  }

  return (
    <Container style={{ maxWidth: '800px', marginBottom: '20px' }}>
      <SearchWrapper>
        <InputBase
          placeholder="Search for a city"
          sx={{
            border: 'none',
            ml: 3,
            mr: 1,
            width: '85%',
            fontSize: '20px',
            fontWeight: '500',
          }}
          ref={value}
          onChange={(e) => (value.current = e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search
          sx={{
            width: '15%',
            fontSize: '35px',
            cursor: 'pointer',
          }}
        />
      </SearchWrapper>
      <div style={styles.dropBoxWrapper}>
        <div style={styles.dropBox}>
          {fetched
            ? cities?.map((city) => {
                return (
                  <Container
                    key={city.id}
                    sx={styles.dropboxElement}
                    onClick={() => handleClick(city)}
                  >
                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: '500',
                      }}
                    >
                      {city.city}, {city.country}
                    </Typography>
                  </Container>
                )
              })
            : null}
        </div>
      </div>
    </Container>
  )
}

export default SearchBar
