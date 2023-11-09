import { Box, Link as MuiLink, Rating, Stack } from '@mui/material'
import CustomTypography from '../../atoms/Typography'
import LaunchIcon from '@mui/icons-material/Launch'
import { Address, City, Phone, State } from '../../../utils/constant'
import { Link } from 'react-router-dom'

interface DisplayCardProps {
  id: string
  name: string
  address: string
  state: string
  city: string
  url: string
  phone: string
  reviews: Array<{
    id: string
    totalRating: number
    breweryReview: Array<{
      id: number
      name?: string
      rating: number
      description: string
    }>
  }>
}

const DisplayCard = (props: DisplayCardProps) => {
  const breweryReview = props.reviews.find((review) => review.id === props.id)

  const displayRating = breweryReview ? breweryReview.totalRating : 0

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        margin: '2px',
        padding: '10px 8px',
        background: `linear-gradient(0.25turn,#A3EAD8, #B1DCE2, #70B3C0)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <CustomTypography variant="body1" color={'Aqua'}>
            <Link to={`/brewery/${props.id}`} style={{ color: '#08415C' }}>
              {props.name}
            </Link>
          </CustomTypography>
          <Box sx={{ paddingLeft: '10px' }}>
            <MuiLink href={props.url} rel="noopener noreferrer" target="_blank">
              <LaunchIcon />
            </MuiLink>
          </Box>
        </Stack>

        <Rating
          precision={0.5}
          value={displayRating}
          defaultValue={2}
          readOnly
        />
      </Box>
      <Stack>
        <Box>
          <CustomTypography variant="body3">
            {Address}
            {props.address}
          </CustomTypography>
        </Box>
        <CustomTypography variant="body3">
          {State}
          {props.state}
        </CustomTypography>
        <CustomTypography variant="body3">
          {City}
          {props.city}
        </CustomTypography>
        <CustomTypography variant="body3">
          {Phone}
          {props.phone}
        </CustomTypography>
      </Stack>
    </Box>
  )
}

export default DisplayCard
