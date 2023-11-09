import { Box, Grid, styled } from '@mui/material'
import React from 'react'
import theme from '../../../utils/themes/theme'
import { useAuth0 } from '@auth0/auth0-react'
import Header from '../../organisms/Header'
import { useNavigate } from 'react-router'
import Footer from '../../organisms/Footer'

export interface HomeTemplateProps {
  contentNode: React.ReactNode
}

const HeaderGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  height: '10%',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 2,
})

const FooterGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '20%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
})

const MainGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.structuralColor.white,
})

const DataGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  position: 'relative',
  backgroundColor: '#FDEDB1',
})

const MainTemplate: React.FC<HomeTemplateProps> = ({
  contentNode,
}: HomeTemplateProps) => {
  const navigate = useNavigate()
  const { loginWithRedirect, logout } = useAuth0()

  return (
    <MainGrid data-testid={'main-grid'}>
      <HeaderGrid>
        <Header
          handleLogoutClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          handleLogoInClick={() => loginWithRedirect()}
          handleHomeClick={() => {
            navigate('/')
          }}
        ></Header>
      </HeaderGrid>
      <DataGrid>{contentNode}</DataGrid>
      <FooterGrid>
        <Footer></Footer>
      </FooterGrid>
    </MainGrid>
  )
}

export default MainTemplate
