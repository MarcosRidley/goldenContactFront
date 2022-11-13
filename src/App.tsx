import React from 'react';
import CallToLogin from './components/CallTologin';
import ContactList from './components/ContactList/';
import Header from './components/Header';
import { LoginContext } from './Contexts/LoginContext';
import IContact from './interfaces/IContact';

function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [userName, setUserName] = React.useState<string>('');
	const [userContacts, setUserContacts] = React.useState<IContact[]>([]);
	const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);
	const [contactModalOpen, setContactModalOpen] = React.useState<boolean>(false);

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
				}}
			>
				<Header />
				{isLoggedIn ? <ContactList /> : <CallToLogin />}
			</LoginContext.Provider>
		</div>
	);
}

export default App;
