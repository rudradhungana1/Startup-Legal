import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Home = () => {
  const {data: session} = useSession();

  const router = useRouter();

  useEffect(()=>{
    if(session?.user){
      router.push('/home');
    }
    else{
      router.push('/login');
    }
  },[])

return <>Home Page</>
}

export default Home
