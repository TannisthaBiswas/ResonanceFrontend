import {createContext, useState} from 'react'

export const myContext = createContext();

const ContextApi = ({children}) => {

        const [userData,setUserData] = useState({})
        const [predictData,setPredictData] = useState({})

  return (
    <myContext.Provider value={{userData,setUserData, predictData, setPredictData}}>
        {children}
    </myContext.Provider>
  )
}

export default ContextApi