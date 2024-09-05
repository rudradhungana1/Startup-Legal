// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import themeConfig from "../../configs/themeConfig";
import MenuItem from "@mui/material/MenuItem";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/slices/auth/auth";
import Alert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))


const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    confirmEmail: yup.string().email().oneOf([yup.ref('email'), null], 'Emails must match').required('Email confirmation is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().min(8, 'Password must be at least 8 characters').oneOf([yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    userType: yup.string().required('User Type is required'),
  });

  const defaultValues = {
    confirmEmail: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    userType: "offerer"
  }


  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues:defaultValues
  })

  const onSubmit = data => {
    console.log(data);
    dispatch(registerUser(data));
    reset();
    setOpenAlert(true); // Open the alert

  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <RegisterIllustration
            alt='register-illustration'
            src={`/images/pages/registerbg.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <img src={'/images/logo/logo1.png'} style={{height:200, width:200, marginLeft:'20%'}}/>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Contract From {themeConfig.templateName}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Contract from today with all ease and fun!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{display:'flex', gap:2}}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({
                             field: { onChange, onBlur, value, name, ref },
                             fieldState: { invalid, isTouched, isDirty, error },
                             formState,
                           }) => (
                    <CustomTextField
                      autoFocus fullWidth
                      sx={{ mb: 4 }}
                      value={value}
                      onChange={onChange}
                      label='First Name'
                      placeholder='john'
                      error={Boolean(errors.email)}
                      {...(errors.firstNme && { helperText: errors.firstName.message })}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      autoFocus
                      fullWidth
                      sx={{ mb: 4 }}
                      label='Last Name'
                      placeholder='doe'
                    />
                  )}
                />
              </Box>

              <Controller
                control={control}
                name="userType"
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    defaultValue=''
                    label='User Type'
                    id='custom-select'
                    sx={{ mb: 4 }}
                  >
                    <MenuItem value={'offerer'}>Offerer</MenuItem>
                    <MenuItem value={'offeree'}>Offeree</MenuItem>
                  </CustomTextField>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Email'
                    sx={{ mb: 4 }}
                    placeholder='user@email.com'
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmEmail"
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Confirm Email'
                    sx={{ mb: 4 }}
                    placeholder='user@email.com'
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Password'
                    id='auth-login-v2-password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Confirm Password'
                    id='auth-login-v2-password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ mt: 2 }}
                  />
                )}
              />

              <Controller
                control={control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize } }}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'text.secondary' }}>I agree to</Typography>
                        <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                          privacy policy & terms
                        </Typography>
                      </Box>
                    }
                  />
                )}
              />
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography component={LinkStyled} href='/login'>
                  Sign in instead
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={()=>handleAlertClose()} severity="success">
          User successfully added!
        </Alert>
      </Snackbar>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
