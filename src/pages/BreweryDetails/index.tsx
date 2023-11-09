import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import MainTemplate from '../../components/templates/MainTemplate'
import {
  Alert,
  Box,
  CircularProgress,
  Link,
  Paper,
  Rating,
  Snackbar,
  Stack,
} from '@mui/material'
import BeerBackgound from '../../../public/assets/image/Back.jpg'
import CustomTypography from '../../components/atoms/Typography'
import {
  Add,
  AddButton,
  Address,
  AlertMessage,
  Back,
  Phone,
  Reviews,
  Type,
  Website,
  ZipCode,
} from '../../utils/constant'
import { API } from '../../services/API'
import { useAuth0 } from '@auth0/auth0-react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import theme from '../../utils/themes/theme'
import Button from '../../components/atoms/Button'
import TextField from '../../components/atoms/InputField'
import { BreweryDetailsType, RatingType } from '../../utils/types'

const BreweryDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [breweryDetails, setBreweryDetails] = useState<BreweryDetailsType>({})
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState<RatingType[]>([])
  const [updateReview, setUpdateReview] = useState(false)
  const [isAddReviewEnabled, setIsAddReviewEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, user } = useAuth0()
  const [ratingValue, setRatingValue] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    async function fetchBreweryDetails() {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        )
        const data = response.data
        setBreweryDetails(data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchBreweryDetails()
  }, [id])

  useEffect(() => {
    async function reviewDetails() {
      try {
        const reviews = await API.get(`/reviews/${id}`)
        const reviewData = reviews.data.breweryReview
        setReviews(reviewData)
      } catch (error) {
        console.error(error)
      }
    }
    reviewDetails()
  }, [updateReview])

  const handleAddReview = async () => {
    if (isAuthenticated) {
      try {
        API.get(`/reviews/${id}`)
          .then((response) => {
            const reviews = response.data
            const breweryReview = reviews.breweryReview
            const breweryReviewId =
              breweryReview.length > 0
                ? reviews.breweryReview[breweryReview.length - 1].id
                : 0

            const newReview = {
              id: breweryReviewId + 1,
              rating: reviewRating,
              name: user?.name,
              description: reviewText,
            }

            breweryReview.push(newReview)
            API.put(`/reviews/${id}`, reviews)
              .then(() => {
                setUpdateReview(!updateReview)
              })
              .catch((error) => {
                console.error('Error updating data on the server:', error)
              })
          })
          .catch((error) => {
            console.error('Error fetching data:', error)
          })
        setReviews([...breweryReview, newReview])
      } catch {
        const reviewStructure = {
          id: id,
          totalRating: 0,
          breweryReview: [],
        }
        API.post(`/reviews`, reviewStructure)
          .then(() => {
            handleAddReview()
          })
          .catch((error) => {
            console.error('Error updating data on the server:', error)
          })
      }
      setReviewRating(0)
      setReviewText('')
    } else {
      setSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleRatingChange = (event, newValue) => {
    setReviewRating(newValue)
    setIsAddReviewEnabled(newValue > 0 && reviewText.trim() !== '')
  }

  const handleTextChange = (event) => {
    const newText = event.target.value
    setReviewText(newText)
    setIsAddReviewEnabled(newText.trim() !== '' && reviewRating > 0)
  }

  const calculateOverallRating = () => {
    if (reviews.length === 0) {
      return 0
    } else {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      )
      const finalRating = totalRating / reviews.length
      return finalRating
    }
  }

  useEffect(() => {
    const overallRating = calculateOverallRating()
    setRatingValue(overallRating)
    try {
      if (reviews.length > 0) {
        API.patch(`/reviews/${id}`, { totalRating: overallRating })
      }
    } catch (error) {
      console.error(error)
    }
  }, [reviews])

  return (
    <div>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <MainTemplate
          contentNode={
            <Box>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
              >
                <Alert
                  elevation={6}
                  variant="filled"
                  onClose={handleSnackbarClose}
                  severity="warning"
                >
                  {AlertMessage}
                </Alert>
              </Snackbar>
              <Paper
                style={{
                  backgroundImage: `url(${BeerBackgound})`,
                  height: 350,
                  borderRadius: '0px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  paddingBottom: '40px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    height: '100%',
                    paddingLeft: '40px',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#f3cd4880',
                      padding: '5px',
                    }}
                  >
                    <CustomTypography
                      variant="h2"
                      color="#08415C"
                      style={{ textShadow: `0 0 5px #F9E900` }}
                    >
                      {breweryDetails.name}
                    </CustomTypography>
                  </Box>
                </Box>
              </Paper>
              <Box sx={{ padding: '10px 10px' }}>
                <Box>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    variant="outlined"
                  >
                    {Back}
                  </Button>
                </Box>
                <Stack sx={{ py: '1rem' }}>
                  <CustomTypography variant="body3">
                    {Type}
                    <CustomTypography
                      variant="body3"
                      color={theme.palette.textColor.medemp}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {breweryDetails.brewery_type}
                    </CustomTypography>
                  </CustomTypography>
                  <CustomTypography variant="body3">
                    {Website}
                    {breweryDetails.website_url ? (
                      <Link
                        href={breweryDetails.website_url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {breweryDetails.website_url}
                      </Link>
                    ) : (
                      'NO WEBSITE'
                    )}
                  </CustomTypography>
                  <Box>
                    <CustomTypography variant="body3">
                      {Address}
                      <CustomTypography
                        variant="body3"
                        color={theme.palette.textColor.medemp}
                      >
                        {' '}
                        {breweryDetails.address_1}
                        {', '} {breweryDetails.city}
                        {', '} {breweryDetails.state} {', '}
                        {breweryDetails.country}
                      </CustomTypography>
                    </CustomTypography>
                  </Box>
                  <CustomTypography variant="body3">
                    {ZipCode}
                    <CustomTypography
                      variant="body3"
                      color={theme.palette.textColor.medemp}
                    >
                      {breweryDetails.postal_code}
                    </CustomTypography>
                  </CustomTypography>
                  <CustomTypography variant="body3">
                    {Phone}
                    <CustomTypography
                      variant="body3"
                      color={theme.palette.textColor.medemp}
                    >
                      {breweryDetails.phone}
                    </CustomTypography>
                  </CustomTypography>
                </Stack>
                <Box>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <CustomTypography variant="h5">Rating</CustomTypography>
                    <Rating
                      sx={{ paddingLeft: '10px' }}
                      precision={0.5}
                      name="overall-rating"
                      value={ratingValue}
                      readOnly
                    />
                    <Box
                      sx={{
                        padding: '8px',
                        backgroundColor: '#428490',
                        marginLeft: '10px',
                        borderRadius: '4px',
                      }}
                    >
                      {ratingValue.toFixed(1)}
                    </Box>
                  </Box>
                  <Stack sx={{ width: '50vw', py: '1rem' }}>
                    <CustomTypography variant="h5">{Add}</CustomTypography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingBottom: '5px',
                      }}
                    >
                      <Rating
                        precision={0.5}
                        name="review-rating"
                        value={reviewRating}
                        onChange={handleRatingChange}
                      />
                      <Button
                        onClick={handleAddReview}
                        disabled={!isAddReviewEnabled}
                        variant="contained"
                        color="primary"
                      >
                        {AddButton}
                      </Button>
                    </Box>
                    <TextField
                      label="Review"
                      variant="outlined"
                      multiline
                      value={reviewText}
                      onChange={handleTextChange}
                    />
                  </Stack>
                  <CustomTypography variant="h5">{Reviews}</CustomTypography>

                  {reviews.map((review: RatingType, index) => (
                    <div key={index}>
                      <Stack
                        sx={{
                          border: '1px solid #7C8A9D',
                          borderRadius: '8px',
                          width: '49.5vw',
                          padding: '5px',
                          my: '2px',
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={review.rating}
                          precision={0.5}
                          readOnly
                        />
                        <CustomTypography
                          variant="body4"
                          color={theme.palette.textColor.medemp}
                        >
                          By {review.name}
                        </CustomTypography>
                        <CustomTypography variant="body3">
                          {review.description}
                        </CustomTypography>
                      </Stack>
                    </div>
                  ))}
                </Box>
              </Box>
            </Box>
          }
        ></MainTemplate>
      )}
    </div>
  )
}

export default BreweryDetails
