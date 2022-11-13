import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IContact from '../../interfaces/IContact';
import { Box, Button, TextField } from '@mui/material';
import { LoginContext } from '../../Contexts/LoginContext';
import CreateContactModal from '../CreateContactModal';

export default function ContactList() {

  const { setContactModalOpen } = React.useContext(LoginContext);
	const [userContacts, setUserContacts] = React.useState<IContact[]>([]);
  const [rerenderTrigger, setRerenderTrigger] = React.useState<number>(0);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [filteredContacts, setFilteredContacts] = React.useState<IContact[]>([]);

	React.useEffect(() => {
		const getRequests = async () => {
			try {
				const response = await fetch(
					'https://goldcontactsapi.herokuapp.com/contacts',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `${JSON.parse(localStorage.getItem('token')!)}`,
						},
					}
				);
				if (response.status === 200) {
					const data = await response.json();
					setUserContacts(data);
				} else {
					throw new Error('Failed to fetch contacts');
				}
			} catch (error) {
				console.log(error);
        console.log('tal')
			}
		};
		getRequests();
	}, [rerenderTrigger]);

  React.useEffect(() => {
    //every time the user types something in the search bar, the contacts list will be filtered by the search term and the filtered list will be displayed on the screen 
    const filteredContacts = userContacts.filter((contact) => {
      return contact.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredContacts(filteredContacts);
  }, [userContacts, searchTerm]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formatPhoneNumber = (phoneNumber: string):string => {
    const cleanNumber = phoneNumber.replace(/\D/g, '')
    const firstPart = cleanNumber.substring(0, 5);
    const secondPart = cleanNumber.substring(5, 9);
    return `${firstPart}-${secondPart}`
  }

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<TextField
					label="Type to search"
					id="search"
					sx={{ m: 2, width: '50%' }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
				/>
				<Button
					onClick={() => setContactModalOpen(true)}
					variant="contained"
					sx={{ m: 2, width: '45%', fontWeight: 'bold' }}
				>
					Adicionar
				</Button>
			</Box>
			<CreateContactModal setRerenderTrigger={setRerenderTrigger} />
			<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				{filteredContacts.map((contact) => (
					<React.Fragment key={contact.id}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar
									alt={contact.contactName.toUpperCase()}
									src="/static/images/avatar/1.jpg"
								/>
							</ListItemAvatar>
							<ListItemText
								primary={capitalizeFirstLetter(contact.contactName)}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline', fontWeight: 'bold' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											{` (${contact.areaCode}) ${formatPhoneNumber(
												contact.phoneNumber
											)}`}
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
		</>
	);
}
