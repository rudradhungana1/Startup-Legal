import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TablePendingContracts from "../../../views/components/pages/contracts/pending/TablePendingContracts";

const PendingContract = () => {
  return (
    <Box>

      <Card>
        <CardHeader
          title={<Typography variant={'h4'}>Pending Contracts</Typography>}
        />
        <CardContent>
          <TablePendingContracts />

        </CardContent>
      </Card>

    </Box>
  );
}

export default PendingContract;
