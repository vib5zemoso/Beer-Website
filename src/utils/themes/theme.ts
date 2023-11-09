import { createTheme } from '@mui/material/styles'
import React from 'react'
declare module '@mui/material/styles' {
  interface Components {
    MuiPickersLayout?: Components['MuiPopover']
    MuiDateCalendar?: Components['MuiPopover']
  }
  interface Palette {
    primaryColor: {
      500?: string
      300?: string
      100?: string
    }
    textColor: {
      highemp?: string
      lowemp?: string
      medemp?: string
    }
    greyColor: {
      stroke1: string
      stroke2: string
      icon01: string
      icon02: string
    }
    structuralColor: {
      background?: string
      buttonhover?: string
      white?: string
      hovercolor?: string
      buttoncolor?: string
    }
  }

  interface PaletteOptions {
    primaryColor?: {
      500?: string
      300?: string
      100?: string
    }
    textColor?: {
      highemp?: string
      lowemp?: string
      medemp?: string
    }
    greyColor: {
      stroke1: string
      stroke2: string
      icon01: string
      icon02: string
    }
    structuralColor: {
      background?: string
      buttonhover?: string
      white?: string
      hovercolor?: string
      buttoncolor?: string
    }
  }

  interface TypographyVariants {
    heading1: React.CSSProperties
    body1: React.CSSProperties
    body2: React.CSSProperties
    body3: React.CSSProperties
    body4: React.CSSProperties
    caption1: React.CSSProperties
    caption2: React.CSSProperties
    linktext: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    heading1: React.CSSProperties
    body1: React.CSSProperties
    body2: React.CSSProperties
    body3: React.CSSProperties
    body4: React.CSSProperties
    caption1: React.CSSProperties
    caption2: React.CSSProperties
    linktext: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heading1: true
    body1: true
    body2: true
    body3: true
    body4: true
    caption1: true
    caption2: true
    linktext: true
  }
}

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 1081,
      lg: 1441,
      xl: 1920,
    },
  },
  spacing: 4,
  palette: {
    primaryColor: {
      500: '#625AFA',
      300: '#9764FF',
      100: '#D9E9FF',
    },
    structuralColor: {
      background: '#F8F9FA',
      buttonhover: '#F4EFFF',
      white: '#FFFFFF',
      hovercolor: '#F3F2F5',
      buttoncolor: '#303D6A',
    },
    textColor: {
      highemp: '#1A1B25',
      medemp: '#414552',
      lowemp: '#6A7383',
    },
    greyColor: {
      stroke1: '#DDDDDD',
      stroke2: '#F6F8FA',
      icon01: '#E8E8E8',
      icon02: '#1A1A1A',
    },
  },

  typography: {
    fontFamily: 'Helvetica',
    heading1: {
      fontWeight: '400',
      fontSize: '28px',
      lineHeight: '32px',
    },
    body1: {
      fontWeight: '400',
      fontSize: '20px',
      lineHeight: '32px',
    },
    body2: {
      fontWeight: '400',
      fontSize: '17px',
      lineHeight: '24px',
    },
    body3: {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
    },
    body4: {
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '18px',
    },
    caption1: {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '20px',
    },
    caption2: {
      fontWeight: '400',
      fontSize: '11px',
      lineHeight: '20px',
    },
    linktext: {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '13.3px',
      textDecoration: 'underline',
    },
  },
})

theme = createTheme({ ...theme })

export default theme
