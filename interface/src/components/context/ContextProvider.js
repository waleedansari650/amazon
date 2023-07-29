import React, { createContext, useState } from 'react'
export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [successfullRegister, setSuccessfullRegister] = useState(false);

    return (
        <>
            <LoginContext.Provider value={{ account, setAccount, successfullRegister, setSuccessfullRegister }}>
                {children}
            </LoginContext.Provider>


        </>
    )
}

export default ContextProvider


