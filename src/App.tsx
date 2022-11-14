import { request } from 'http';
import React from 'react';
import CallToLogin from './components/CallTologin';
import ContactList from './components/ContactList/';
import Header from './components/Header';
import RequestInProgress from './components/RequestInProgress';
import { LoginContext } from './Contexts/LoginContext';
import IContact from './interfaces/IContact';

function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [userName, setUserName] = React.useState<string>('');
	const [userContacts, setUserContacts] = React.useState<IContact[]>([]);
	const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);
	const [contactModalOpen, setContactModalOpen] = React.useState<boolean>(false);
	const [isEditingContact, setIsEditingContact] = React.useState<boolean>(false);
	const [requestInProgress, setRequestInProgress] = React.useState<boolean>(false);
	const [contactToEdit, setContactToEdit] = React.useState<IContact>({
		id: 0,
		areaCode: '00',
		phoneNumber: '0000000000',
		contactName: 'John Doe',
		userId: 0,
	});

	React.useEffect(() => {
		const token = localStorage.getItem('token');
		const userName = localStorage.getItem('userName');
		if (token && userName) {
			setIsLoggedIn(true);
			setUserName(userName);
		} else {
			localStorage.clear();
		}
	}, []);

	return (
		<div className="App">
			<LoginContext.Provider
				value={{
					isLoggedIn,
					setIsLoggedIn,
					userName,
					setUserName,
					userContacts,
					setUserContacts,
					loginModalOpen,
					setLoginModalOpen,
					contactModalOpen,
					setContactModalOpen,
					isEditingContact,
					setIsEditingContact,
					contactToEdit,
					setContactToEdit,
					requestInProgress,
					setRequestInProgress,
				}}
			>
				<Header />
				{ requestInProgress && <RequestInProgress />}
				{isLoggedIn ? <ContactList /> : <CallToLogin />}
			</LoginContext.Provider>
		</div>
	);
}

export default App;
