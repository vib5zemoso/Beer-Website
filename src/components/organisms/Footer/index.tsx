import { Box, Link, styled } from '@mui/material'
import CustomTypography from '../../atoms/Typography'
import { MadeBy, Tagline } from '../../../utils/constant'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const StyledFooterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: '#E68250',
  justifyContent: 'center',
  alignItems: 'center',
})

const Footer = () => {
  return (
    <StyledFooterBox>
      <CustomTypography variant="h2">{Tagline}</CustomTypography>
      <CustomTypography variant="caption1">{MadeBy}</CustomTypography>
      <Link
        href="https://www.linkedin.com/in/vibhuti-narayan-patel-0a3452197/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <LinkedInIcon />
      </Link>
    </StyledFooterBox>
  )
}

export default Footer
