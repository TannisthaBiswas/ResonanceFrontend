import {createContext, useState} from 'react'

export const myContext = createContext();

const ContextApi = ({children}) => {

        const [userData,setUserData] = useState({})

  return (
    <myContext.Provider value={{userData,setUserData}}>
        {children}
    </myContext.Provider>
  )
}

export default ContextApi