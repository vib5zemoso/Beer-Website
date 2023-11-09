import { Box, styled } from '@mui/material'
import Icon from '../../atoms/Icon'
import Button from '../../atoms/Button'
import CustomTypography from '../../atoms/Typography'
import BeerLogo from '../../../../public/assets/image/BeerLogo.png'
import { Home, Login, Logout, Welcome } from '../../../utils/constant'
import { useAuth0 } from '@auth0/auth0-react'
import theme from '../../../utils/themes/theme'

interface HeaderProps {
  handleHomeClick: () => void
  handleLogoutClick: () => void
  handleLogoInClick: () => void
}

const StyledOuterBox = styled(Box)({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  backgroundColor: '#E68250',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 0px',
})

const StyledLogoBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  paddingLeft: '5px',
})

const Header = (props: HeaderProps) => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <StyledOuterBox>
      <StyledLogoBox>
        <Icon
          src={BeerLogo}
          style={{ height: '60px', width: '60px', borderRadius: '50%' }}
        ></Icon>
        <Button onClick={props.handleHomeClick}>
          <CustomTypography
            variant="body1"
            color={theme.palette.structuralColor.buttoncolor}
          >
            {Home}
          </CustomTypography>
        </Button>
      </StyledLogoBox>
      <Box>
        {isAuthenticated ? (
          <StyledLogoBox>
            <CustomTypography variant="body1" color={'#FAE6A3'}>
              {Welcome}
              {user?.name}
            </CustomTypography>
            <Button onClick={props.handleLogoutClick} sx={{ py: 0 }}>
              <CustomTypography
                variant="body1"
                color={theme.palette.structuralColor.buttoncolor}
              >
                {Logout}
              </CustomTypography>
            </Button>
          </StyledLogoBox>
        ) : (
          <Button onClick={props.handleLogoInClick}>
            <CustomTypography
              variant="body1"
              color={theme.palette.structuralColor.buttoncolor}
            >
              {Login}
            </CustomTypography>
          </Button>
        )}
      </Box>
    </StyledOuterBox>
  )
}

export default Header
