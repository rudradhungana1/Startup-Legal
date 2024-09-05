// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {contracts} from "../../utils/contracts";
import CustomTextField from "../../@core/components/mui/text-field";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import Menu from "@mui/material/Menu";
import {Fragment, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, FormControl, InputLabel,
  ListItemText,
  Select
} from "@mui/material";
import ContractStickyTable from "../../views/components/tables/ContractStickyTable";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import CustomInput from "../../views/components/CustomInput";
import {addDays} from "date-fns";
import {useTheme} from "@mui/material/styles";
import {DateField} from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import {useSession} from "next-auth/react";

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorGroupBy, setAnchorGroupBy] = useState(null)
  const [dateFormat, setDateFormat] = useState(new Date());
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const handleClickFilterDialog = () => setOpenFilterDialog(true)
  const handleCloseFilterDialog = () => setOpenFilterDialog(false);
  const {data:session} = useSession();

  const handleSortingMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleGroupByOpen = event => {
    setAnchorGroupBy(event.currentTarget)
  }

  const handleSortingClose = () => {
    setAnchorEl(null)
  }

  const handleGroupByClose = () =>{
    setAnchorGroupBy(null);
  }

  const contractStatus = [
    {
      label:'Pending',
      value:'pending'
    },
    {
      label:'Approved',
      value:'approved'
    }

  ]

  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');
  const todayStartOfTheDay = today.startOf('day');


  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Typography variant="h1" align="center" gutterBottom>
          Welcome to StartUpLegal
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <Card>
            <CardHeader
              title={<Typography variant={'h4'}>Filtering, Finding and Sorting</Typography>}
              subheader={<Typography variant='subtitle2'>Find Your Specific Contract From Here...</Typography> }
            />
            {/*<CardContent>*/}
            {/*  <Box sx={{display:'flex'}}>*/}
            {/*    <CustomAutocomplete*/}
            {/*      sx={{ width: 250 }}*/}
            {/*      options={contracts}*/}
            {/*      id='autocomplete-custom'*/}
            {/*      getOptionLabel={contract => contract.title || ''}*/}
            {/*      renderInput={params => <CustomTextField {...params} label='Sorting' />}*/}
            {/*    />*/}
            {/*  </Box>*/}
            {/*</CardContent>*/}

            <CardContent>
                <Box sx={{display:'flex', gap:4}}>
                  <Button onClick={handleSortingMenuClick} variant={'contained'} startIcon={<Icon icon={'tabler:arrows-sort'} /> }>Sorting</Button>
                  <Button onClick={handleGroupByOpen} variant={'contained'} startIcon={<Icon icon={'tabler:box-multiple'} /> }>Group By</Button>
                  <Button onClick={handleClickFilterDialog} variant={'contained'} startIcon={<Icon icon={'tabler:adjustments-alt'} /> }>Filtering</Button>

                </Box>

              {/*sorting menu*/}
              <Menu
                keepMounted
                elevation={0}
                anchorEl={anchorEl}
                id='customized-menu'
                onClose={handleSortingClose}
                open={Boolean(anchorEl)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Icon icon='tabler:sort-ascending-2' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Ascending' />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Icon icon='tabler:sort-descending-2' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Descending' />
                </MenuItem>
              </Menu>

              {/*Group By Menu*/}
              <Menu
                keepMounted
                elevation={0}
                anchorEl={anchorGroupBy}
                id='customized-menu'
                onClose={handleGroupByClose}
                open={Boolean(anchorGroupBy)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Icon icon='tabler:calendar-due' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='By Date' />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Icon icon='tabler:brand-redux' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='By Contract Status' />
                </MenuItem>
              </Menu>

              {/*filter dialog*/}
              <Dialog open={openFilterDialog} onClose={handleCloseFilterDialog} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Filter Contract</DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ mb: 3 }}>
                    There are two options to filter out, filter by date and filter by contract status,
                    click on either of both and start filtering
                  </DialogContentText>

                  <DialogContent>
                    <Box sx={{display:'flex'}}>
                      <FormControl>
                        <InputLabel id='select-status'>Select Status</InputLabel>
                        <Select
                          label='Contract Status'
                          defaultValue=''
                          id='demo-simple-select-outlined'
                          labelId='select-status'
                        >
                          {
                            contractStatus.map((status)=>(<MenuItem
                              key={status.value}
                              value={status.value}>{status.label}</MenuItem> ))
                          }
                          <MenuItem value={10}></MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </DialogContent>

                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                  <Button
                    onClick={handleCloseFilterDialog}
                    sx={{backgroundColor: 'primary.main', color:'white', '&:hover':{
                      backgroundColor:'primary.light'
                    }
                    }}>Filter</Button>
                  <Button
                    onClick={handleCloseFilterDialog}
                    sx={{backgroundColor: 'primary.main', color:'white', '&:hover': {
                        backgroundColor: "primary.light",
                      }}}
                    startIcon={<Icon icon={'tabler:x'} />}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>


            </CardContent>
          </Card>
        </Paper>

        <Paper sx={{mt:4}}>
          {contracts.length === 0 ? <Card sx={{p: 10}}>
            <Typography align={'center'}>No Contracts to Show</Typography>
          </Card> :
            <Card>
            <CardHeader title='Contract List' />
            <ContractStickyTable />
            </Card>}
        </Paper>
      </Grid>

    </Grid>
  )
}

export default Home;
