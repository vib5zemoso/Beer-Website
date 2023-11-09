import { TextField as MuiTextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'
import React, { ReactNode } from 'react'
import theme from '../../../utils/themes/theme'

interface InputFieldProps
  extends Omit<TextFieldProps, 'startAdornment' | 'endAdornment'> {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  width?: string
  height?: string
}

const TextField = ({
  startAdornment,
  endAdornment,
  ...props
}: InputFieldProps) => {
  return (
    <MuiTextField
      {...props}
      autoComplete={'off'}
      InputProps={{
        startAdornment,
        endAdornment,
        sx: {
          color: props.value
            ? theme.palette.textColor.highemp
            : theme.palette.textColor.medemp,
        },
      }}
    ></MuiTextField>
  )
}

export default TextField
