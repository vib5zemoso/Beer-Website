import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Box, MenuItem, Stack } from '@mui/material'
import DisplayCard from '../../components/molecules/DisplayCard'
import CustomTypography from '../../components/atoms/Typography'
import { Next, Prev } from '../../utils/constant'
import MainTemplate from '../../components/templates/MainTemplate'
import { API } from '../../services/API'
import theme from '../../utils/themes/theme'
import { BreweryDetailsType } from '../../utils/types'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilter, setSearchFilter] = useState('by_name')
  const [searchResults, setSearchResults] = useState<BreweryDetailsType[]>([])
  const [perPage, setPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries?${searchFilter}=${searchQuery}&per_page=${perPage}&page=${currentPage}`
        )
        const reviews = await API.get(`/reviews`)
        const revData = reviews.data
        const data = response.data
        setSearchResults(data)
        setReviews(revData)
      } catch (error) {
        console.error('Error searching for breweries:', error)
      } finally {
        setLoading(false)
      }
    }
    handleSearch()
  }, [currentPage, searchQuery, searchFilter, perPage])

  const handlePerPageChange = (e: { target: { value: any } }) => {
    setPerPage(Number(e.target.value))
  }

  const setPageNext = async () => {
    const nextPage = currentPage + 1
    const response = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries?${searchFilter}=${searchQuery}&per_page=${perPage}&page=${nextPage}`
    )
    const data = response.data
    if (data.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  const setPagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <MainTemplate
      contentNode={
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 8px',
            }}
          >
            <Stack direction={'row'}>
              <TextField
                label="Search Term"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                }}
              />
              <TextField
                select
                label="Search Filter"
                variant="outlined"
                fullWidth
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                sx={{ width: '25vw' }}
              >
                <MenuItem value="by_city">By City</MenuItem>
                <MenuItem value="by_name">By Name</MenuItem>
                <MenuItem value="by_type">By Type</MenuItem>
              </TextField>
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              paddingTop: '2rem',
            }}
          >
            {loading && <p>Loading...</p>}
            {searchResults.length === 0 && <p>No results found.</p>}
            <Stack spacing={'1rem'} sx={{ width: '70vw' }}>
              {searchResults.map((brewery) => (
                <DisplayCard
                  key={brewery.id}
                  id={brewery.id}
                  name={brewery.name}
                  address={brewery.address_1}
                  state={brewery.state}
                  city={brewery.city}
                  url={brewery.website_url}
                  phone={brewery.phone}
                  reviews={reviews}
                ></DisplayCard>
              ))}
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2rem 1rem',
            }}
          >
            <TextField
              select
              label="Results Per Page"
              variant="outlined"
              value={perPage}
              onChange={handlePerPageChange}
              sx={{ width: '10rem' }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </TextField>
            <Box>
              <Button onClick={setPagePrev}>
                <CustomTypography
                  variant="body2"
                  color={theme.palette.structuralColor.buttoncolor}
                >
                  {Prev}
                </CustomTypography>
              </Button>
              <Button onClick={setPageNext}>
                <CustomTypography
                  variant="body2"
                  color={theme.palette.structuralColor.buttoncolor}
                >
                  {Next}
                </CustomTypography>
              </Button>
            </Box>
          </Box>
        </Box>
      }
    ></MainTemplate>
  )
}

export default Dashboard
