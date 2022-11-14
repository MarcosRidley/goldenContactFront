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
import WhatsappBtn from './WhatsappBtn/WhatsappBtn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ContactList() {
	const { setContactModalOpen, setIsEditingContact, setContactToEdit } =
		React.useContext(LoginContext);
	const [userContacts, setUserContacts] = React.useState<IContact[]>([]);
	const [rerenderTrigger, setRerenderTrigger] = React.useState<number>(0);
	const [searchTerm, setSearchTerm] = React.useState<string>('');
	const [filteredContacts, setFilteredContacts] = React.useState<IContact[]>(
		[]
	);

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
			}
		};
		getRequests();
	}, [rerenderTrigger]);

	React.useEffect(() => {
		//every time the user types something in the search bar, the contacts list will be filtered by the search term and the filtered list will be displayed on the screen
		const filteredContacts = userContacts.filter((contact) => {
			return contact.contactName
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		});
		setFilteredContacts(
			filteredContacts.sort((a, b) =>
				a.contactName.localeCompare(b.contactName)
			)
		);
	}, [userContacts, searchTerm]);

	const handleEdit = async (contact: IContact) => {
		setIsEditingContact(true);
		setContactToEdit(contact);
		setContactModalOpen(true);
	};

	const handleDelete = async (contact: IContact) => {
		await fetch(`https://goldcontactsapi.herokuapp.com/contacts/${contact.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${JSON.parse(localStorage.getItem('token')!)}`,
			},
		});
		setRerenderTrigger((prevState) => prevState + 1);
	};

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const formatPhoneNumber = (phoneNumber: string): string => {
		const cleanNumber = phoneNumber.replace(/\D/g, '');
		const firstPart = cleanNumber.substring(0, 5);
		const secondPart = cleanNumber.substring(5, 9);
		return `${firstPart}-${secondPart}`;
	};

	const handleCopy = (event: any, contact: IContact) => {
		event.target.textContent = 'Copied!';
		navigator.clipboard.writeText(
			` (${contact.areaCode}) ${formatPhoneNumber(contact.phoneNumber)}`
		);
		setTimeout(() => {
			event.target.textContent = ` ${contact.areaCode}) ${formatPhoneNumber(
				contact.phoneNumber
			)}`;
		}, 3000);
	};

	return (
		<section style={{ backgroundColor: '#DDD', height: '100vh' }}>
			<Box sx={{ display: 'flex', backgroundColor: '#EEE' }}>
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
					Add contact
				</Button>
			</Box>
			<CreateContactModal setRerenderTrigger={setRerenderTrigger} />
			{userContacts.length === 0 ? (
				<Typography variant="h5" sx={{ textAlign: 'center', mt: 5 }}>
					You have no contacts yet. Click the Add button to create one.
				</Typography>
			) : null}
			<List
				sx={{
					width: '100%',
					bgcolor: '#DDD',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				{filteredContacts.map((contact) => (
					<React.Fragment key={contact.id}>
						<ListItem
							alignItems="center"
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							<ListItemAvatar>
								<Avatar
									alt={contact.contactName.toUpperCase()}
									src="/static/images/avatar/1.jpg"
									sx={{
										width: '60px',
										height: '60px',
										fontSize: '30px',
										fontWeight: 'bold',
										color: '#DDD',
										backgroundColor: 'brown',
										marginRight: '0.8em',
									}}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={capitalizeFirstLetter(contact.contactName)}
								primaryTypographyProps={{
									variant: 'body1',
									fontWeight: 'bold',
									color: '#111',
								}}
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									width: '100%',
								}}
								secondary={
									<React.Fragment>
										<span
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<Typography
												sx={{
													display: 'inline',
													fontWeight: 'bold',
													fontSize: '1.2em',
													color: '#222',
													'&:hover': {
														cursor: 'pointer',
														textDecoration: 'underline',
													},
												}}
												component="span"
												variant="body2"
												color="text.primary"
												onClick={(e) => handleCopy(e, contact)}
											>
												{` (${contact.areaCode}) ${formatPhoneNumber(
													contact.phoneNumber
												)}`}
											</Typography>
											<span
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'space-between',
													width: '100%',
												}}
											>
												<Button sx={{ fontWeight: 'bold' }}>
													{
														<WhatsappBtn
															areaCode={contact.areaCode}
															number={contact.phoneNumber}
														/>
													}
												</Button>
												<Button
													sx={{ fontWeight: 'bold' }}
													onClick={() => handleEdit(contact)}
												>
													<EditIcon color="action" fontSize="large"></EditIcon>
												</Button>
												<Button
													sx={{ fontWeight: 'bold' }}
													onClick={() => handleDelete(contact)}
												>
													<DeleteIcon color="error" fontSize="large" />
												</Button>
											</span>
										</span>
									</React.Fragment>
								}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
		</section>
	);
}
