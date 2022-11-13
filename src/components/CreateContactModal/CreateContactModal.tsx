import * as React from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress, TextField } from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface CreateContactModalProps {
	setRerenderTrigger: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateContactModal(props: CreateContactModalProps) {
	const {
		contactModalOpen,
		setContactModalOpen,
		isEditingContact,
		contactToEdit,
		setIsEditingContact,
	} = useContext(LoginContext);

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [errorOcurred, setErrorOcurred] = React.useState<boolean>(false);
	const [errorResponse, setErrorResponse] = React.useState<string | null>(null);

	//form handlers
	const [contactName, setContactName] = React.useState<string>('');
	const [contactPhoneNumber, setContactPhoneNumber] =
		React.useState<string>('');
	const [contactAreaCode, setContactAreaCode] = React.useState<string>('');
	//end form handlers

	const handleClose = () => {
		setContactModalOpen(false);
		setIsEditingContact(false);
	};

	const handleAddContact = async (
		contactName: string,
		areaCode: string,
		phoneNumber: string
	) => {
		setIsLoading(true);
		setErrorOcurred(false);

		try {
			const response = await fetch(
				'https://goldcontactsapi.herokuapp.com/contacts',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${JSON.parse(localStorage.getItem('token')!)}`,
					},
					body: JSON.stringify({ areaCode, phoneNumber, contactName }),
				}
			);
			if (response.status === 201) {
				setIsLoading(false);
				setErrorOcurred(false);
				setErrorResponse(null);
				setContactName('');
				setContactAreaCode('');
				setContactPhoneNumber('');
				setContactModalOpen(false);
				props.setRerenderTrigger((prev) => prev + 1);
			} else {
				throw new Error('Failed to create new contact!');
			}
		} catch (error) {
			setIsLoading(false);
			setErrorOcurred(true);
			setErrorResponse('Registration failed. Try again.');
		}
	};

	const handleEditContact = async (
		id: number,
		contactName: string,
		areaCode: string,
		phoneNumber: string
	) => {
		setIsLoading(true);
		setErrorOcurred(false);

		try {
			const response = await fetch(
				'https://goldcontactsapi.herokuapp.com/contacts/' + id,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${JSON.parse(localStorage.getItem('token')!)}`,
					},
					body: JSON.stringify({ areaCode, phoneNumber, contactName }),
				}
			);
			if (response.status === 200) {
				setIsLoading(false);
				setErrorOcurred(false);
				setErrorResponse(null);
				setContactName('');
				setContactAreaCode('');
				setContactPhoneNumber('');
				setContactModalOpen(false);
				props.setRerenderTrigger((prev) => prev + 1);
			} else {
				throw new Error('Failed to edit contact!');
			}
		} catch (error) {
			setIsLoading(false);
			setErrorOcurred(true);
			setErrorResponse('Contact edit failed. Try again.');
		}
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={contactModalOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={contactModalOpen}>
					<Box sx={style}>
						<Typography
							id="transition-modal-title"
							variant="h6"
							component="h2"
							sx={{
								textAlign: 'center',
								fontWeight: 'bold',
								mb: 2,
								fontSize: '2em',
								fontFamily: 'Roboto',
							}}
						>
							{isEditingContact ? 'Edit contact' : 'Add a new contact'}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<TextField
								id="contactName"
								required
								label="Contact Name"
								disabled={isLoading}
								variant="outlined"
								placeholder="John doe"
								inputProps={{ minLength: 4, maxLength: 25 }}
								helperText="Min 4 characters, max 25 characters"
								sx={{ width: '80%', alignSelf: 'center', m: 2 }}
								value={contactName}
								onChange={(e) => setContactName(e.target.value)}
							/>
							<TextField
								id="contactAreaCode"
								required
								disabled={isLoading}
								label="Area Code"
								inputProps={{ minLength: 2, maxLength: 2 }}
								helperText="Area code numbers have 2 digits. Numbers only."
								placeholder="11"
								variant="outlined"
								sx={{ width: '80%', alignSelf: 'center', m: 2 }}
								value={contactAreaCode}
								onChange={(e) => setContactAreaCode(e.target.value)}
							/>
							<TextField
								id="PhoneNumber"
								required
								type={'tel'}
								placeholder="987654321"
								helperText="Phone numbers have 9 digits. Numbers only"
								label="Phone Number"
								inputProps={{ minLength: 9, maxLength: 9 }}
								disabled={isLoading}
								variant="outlined"
								sx={{ width: '80%', alignSelf: 'center', m: 2 }}
								value={contactPhoneNumber}
								onChange={(e) => setContactPhoneNumber(e.target.value)}
							/>

							<Box textAlign="center" sx={{ width: '100%' }}>
								<Button
									variant={'contained'}
									sx={{ width: '45%', m: 2, p: 2 }}
									disabled={isLoading}
									onClick={() => {
										if (!isEditingContact) {
											handleAddContact(
												contactName,
												contactAreaCode,
												contactPhoneNumber
											);
										} else {
											handleEditContact(
												contactToEdit,
												contactName,
												contactAreaCode,
												contactPhoneNumber
											);
										}
									}}
								>
									{!isLoading ? 'Add contact' : <CircularProgress size={24} />}
								</Button>
							</Box>
							{errorOcurred && (
								<Typography sx={{ color: 'red' }}>{errorResponse}</Typography>
							)}
						</Box>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
