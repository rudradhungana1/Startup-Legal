import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import {CardMedia} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";

const CardContractTemplate = ({ title, subheader, imageSrc, slug }) => {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardMedia component="img" alt={title} height="140" image={imageSrc} />
      <CardContent>
      <Link href={`/contracts/generate/${slug}`}>
        <Button variant="contained" color="primary" >
          Generate Contract
        </Button>
      </Link>
      </CardContent>
    </Card>
  );
}

export default CardContractTemplate;
