import { createContext } from "react";
import IContact from "../interfaces/IContact";

interface LoginContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userName: string;
  setUserName: (userName: string) => void;
  userContacts: IContact[];
  setUserContacts: (useContacts: IContact[]) => void;
  loginModalOpen: boolean;
  setLoginModalOpen: (loginModalOpen: boolean) => void;
  contactModalOpen: boolean;
  setContactModalOpen: (bool:boolean) => void;
}

export const LoginContext = createContext<LoginContextProps>({ isLoggedIn : false, setIsLoggedIn: () => {}, userName: "", setUserName: () => {}, userContacts: [], setUserContacts: () => {}, loginModalOpen: false, setLoginModalOpen: () => {}, contactModalOpen: false, setContactModalOpen: (bool) => {} });