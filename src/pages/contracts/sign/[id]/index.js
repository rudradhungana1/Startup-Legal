import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/router'
import { contracts } from "../../../../utils/contracts";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import SignatureCanvas from "react-signature-canvas";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const SingleContractSign = () => {
  const router = useRouter();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // Filtering specific contracts
    const selectedContract = contracts.find((c) => c.id.toString() === router.query.id);
    setContract(selectedContract);
  }, [contracts])

  return (
    <Box>
      <Card>
        <CardHeader
          title={<Typography variant={'h4'}>Gaming Contract Signing</Typography>}
        />
        <CardContent>
          <Typography variant={'h5'} fontWeight={400}>Player Info</Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <strong>
                Player Name:
              </strong>
              <Typography>John Doe</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <strong>
                Mobile Number:
              </strong>
              <Typography>+44 7911 123456</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <strong>
                Email:
              </strong>
              <Typography>john.doe@example.com</Typography>
            </Box>
          </Box>

          <Typography variant={'h5'} mt={6}>Game Contract Details</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <strong>Game Title: </strong>
            <Typography>{contract?.title}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <strong>Start Date:</strong> {contract?.startDate ?? '2023-12-01'}
            </Typography>
            <Typography variant="body1">
              <strong>End Date:</strong> {contract?.endDate ?? '2023-12-01'}
            </Typography>
          </Box>

          {/* Signature Section */}
          <Typography variant="h5" align="left" gutterBottom sx={{ mt: 6 }}>
            Electronic Signature
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ bgcolor: '#F8F8FF', mt: 2, borderRadius: 2 }}>
              <SignatureCanvas
                penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Grid container justifyContent="start" sx={{ mt: 4 }}>
            <Grid item>
              <Button variant="contained" color="primary" startIcon={<Icon icon={'tabler:signature'} />}>
                Sign Game Contract
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SingleContractSign;
