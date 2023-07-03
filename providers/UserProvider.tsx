import React, { createContext, useEffect, useState } from 'react';
import { StorageItems, useStorageItem } from '../storage/localStorage';

export interface UserContextProps {
    isLoggedIn: boolean,
    userName: string,
    handleLogin: (userName: string) => void,
    handleLogout: () => void,
}

const initialUserContext = {
    isLoggedIn: false,
    userName: '',
    handleLogin: () => { },
    handleLogout: () => { },
}

const UserContext = createContext<UserContextProps>(initialUserContext)

const UserProvider = ({ children }) => {
    const [localUser, setLocalUser] = useStorageItem(StorageItems.user)
    const [isLoggedIn, setIsLoggedIn] = useState(initialUserContext.isLoggedIn)
    const [userName, setUserName] = useState(initialUserContext.userName)

    useEffect(() => {
        if(localUser.length > 0) {
            handleLogin(localUser)
        }
    }, [localUser])

    const handleLogin = (userName: string) => {
        setIsLoggedIn(true)
        setUserName(userName)
        setLocalUser(userName)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setUserName('')
        setLocalUser('')
    }

    const value = {
        isLoggedIn,
        userName,
        handleLogin,
        handleLogout,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }