import Box from "@mui/material/Box";
import CardContractTemplate from "../../../views/pages/contracts/generate/CardContractTemplate";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {templates} from "../../../utils/contract-templates";


const TemplateList = () => {
  return (
    <Box>
      <Card>
        <CardHeader
          title={<Typography variant={'h5'}>Choose Your Contract Template</Typography>}
        />
        <CardContent>
          <Box sx={{display:'flex', justifyContent:'center', gap: 10}}>
            {templates.map((template, index) => (
              <CardContractTemplate key={index} {...template} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TemplateList
