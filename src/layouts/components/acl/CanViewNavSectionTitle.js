// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import {useSession} from "next-auth/react";

const CanViewNavSectionTitle = props => {
  // ** Props
  const { children, navTitle } = props

  const {data:session} = useSession();

  // ** Hook
  const ability = useContext(AbilityContext)
  if (navTitle) {
    return <>{children}</>
  } else {
    return ability && ability.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null
  }
}

export default CanViewNavSectionTitle
