// ** React Imports
import { Fragment, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field';

// ** Third Party Imports
import toast from 'react-hot-toast';

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper';
import StepperCustomDot from '../../../components/custom/SteppperCustomDot';

const steps = [
  {
    title: 'Player Information',
    subtitle: 'Enter player details',
  },
  {
    title: 'Game Details',
    subtitle: 'Enter game information',
  },
  {
    title: 'Contract Info',
    subtitle: 'Enter contract information',
  },
];

const GenerateContract = () => {
  // ** States
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [dob, setDob] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [gameGenre, setGameGenre] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [gamePlatform, setGamePlatform] = useState('');
  const [gameReleaseDate, setGameReleaseDate] = useState('');
  const [signingBonus, setSigningBonus] = useState('');
  const [performanceBonus, setPerformanceBonus] = useState('');
  const [equipmentProvided, setEquipmentProvided] = useState('');
  const [healthInsurance, setHealthInsurance] = useState('');
  const [contractTitle, setContractTitle] = useState('');
  const [contractDescription, setContractDescription] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success('Gaming Contract Submitted');
    }
  };

  const handleReset = () => {
    setPlayerName('');
    setGameTitle('');
    setContractTitle('');
    setContractDescription('');
    setContractStartDate('');
    setContractEndDate('');
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Player Name'
                value={playerName}
                placeholder='John Doe'
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='email'
                label='Email'
                value={email}
                placeholder='john@example.com'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='tel'
                label='Mobile Number'
                value={mobile}
                placeholder='+1234567890'
                onChange={(e) => setMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='date'
                label='Date of Birth'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Address'
                value={address}
                placeholder='123 Main St, City, Country'
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
          </Fragment>
        );
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Game Title'
                value={gameTitle}
                placeholder='The Epic Game'
                onChange={(e) => setGameTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Genre'
                value={gameGenre}
                placeholder='Action, Adventure'
                onChange={(e) => setGameGenre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Platform'
                value={gamePlatform}
                placeholder='PC, Xbox, PlayStation'
                onChange={(e) => setGamePlatform(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='date'
                label='Release Date'
                value={gameReleaseDate}
                onChange={(e) => setGameReleaseDate(e.target.value)}
              />
            </Grid>
            {/* New Fields */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Signing Bonus'
                value={signingBonus}
                placeholder='Enter signing bonus'
                onChange={(e) => setSigningBonus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Performance Bonus'
                value={performanceBonus}
                placeholder='Enter performance bonus'
                onChange={(e) => setPerformanceBonus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Equipment Provided'
                value={equipmentProvided}
                placeholder='Enter equipment details'
                onChange={(e) => setEquipmentProvided(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Health Insurance'
                value={healthInsurance}
                placeholder='Enter health insurance details'
                onChange={(e) => setHealthInsurance(e.target.value)}
              />
            </Grid>
          </Fragment>
        );
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField label={'Contract Title'} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField label={'Contract Description'} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField label='Contract Start Date' type='date' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField label='Contract End Date' type='date' fullWidth />
            </Grid>
          </Fragment>
        );
      default:
        return 'Unknown Step';
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      );
    } else {
      return (
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='tonal' color='secondary' disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant='contained' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    }
  };

  return (
    <Fragment>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </StepperWrapper>
      <Card sx={{ mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Fragment>
  );
};

export default GenerateContract;
