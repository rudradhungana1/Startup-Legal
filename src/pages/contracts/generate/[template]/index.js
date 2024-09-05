import Box from "@mui/material/Box";
import GenerateContract from "../../../../views/pages/contracts/generate/GenerateContract";
import GenerateGamingContract from "../../../../views/pages/contracts/generate/GenerateGamingContract";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {templates} from "../../../../utils/contract-templates";

const CreateContractPage = () =>{
  const router = useRouter();
  const {template} = router.query;

  const singleTemplate = templates.find((a)=>a.slug === template);

  return (
    <Box>
      {singleTemplate.slug === 'gaming-contract' ? <GenerateGamingContract/> : <GenerateContract />}
    </Box>
  )
}

export default CreateContractPage;
