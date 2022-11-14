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
  isEditingContact: boolean;
  setIsEditingContact: (bool:boolean) => void;
  contactToEdit: IContact;
  setContactToEdit: (contact:IContact) => void;
}

const defaultIcontact:IContact = {
  id: 0,
  areaCode: "00",
  phoneNumber: "0000000000",
  contactName: "John Doe",
  userId: 0,
}

export const LoginContext = createContext<LoginContextProps>({ isLoggedIn : false, setIsLoggedIn: () => {}, userName: "", setUserName: () => {}, userContacts: [], setUserContacts: () => {}, loginModalOpen: false, setLoginModalOpen: () => {}, contactModalOpen: false, setContactModalOpen: (bool) => {}, isEditingContact: false, setIsEditingContact: (bool) => {},
contactToEdit: defaultIcontact, setContactToEdit(id) {
  
}, });