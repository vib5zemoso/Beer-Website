import { Typography, TypographyProps, TypographyTypeMap } from '@mui/material'
import React from 'react'

export interface CustomTypographyProps extends TypographyProps {
  variant: TypographyTypeMap['props']['variant']
  children: React.ReactNode
  style?: React.CSSProperties
}

const CustomTypography = (props: CustomTypographyProps) => {
  const { style, variant, children, color } = props
  return (
    <Typography variant={variant} style={style} color={color}>
      {children}
    </Typography>
  )
}

export default CustomTypography
