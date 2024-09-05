import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Contracts = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/home');
  },[])

return (
    <>
      TODO this will be the contract list page
    </>
  );
}

/////////////

export default Contracts;
