import {createContext, useContext} from "react"

const appContext = createContext();

const AppContextProvider = appContext.Provider;

const useAppContext = ()=>useContext(appContext);


export {AppContextProvider, useAppContext};