import { Button as MuiButton, ButtonProps, styled } from '@mui/material'

const StyledButton = styled(MuiButton)({
  textTransform: 'capitalize',
})

const Button = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button
