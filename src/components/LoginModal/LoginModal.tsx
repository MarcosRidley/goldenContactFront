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

export default function LoginModal() {
	const { loginModalOpen, setLoginModalOpen, setIsLoggedIn } =
		useContext(LoginContext);
	const [isLogin, setIsLogin] = React.useState<boolean>(false);
	const handleClose = () => setLoginModalOpen(false);
	const [userName, setUserName] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [errorOcurred, setErrorOcurred] = React.useState<boolean>(false);
	const [errorResponse, setErrorResponse] = React.useState<string | null>(null);

	const handleRegister = async (userName: string, password: string) => {
		setIsLoading(true);

		try {
			const registration = await fetch(
				'https://goldcontactsapi.herokuapp.com/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userName: userName, password: password }),
				}
			);
			if (registration.status === 201) {
				const data = await registration.json();
				setIsLoading(false);
				setErrorOcurred(false);
				setErrorResponse(null);
				localStorage.setItem('token', JSON.stringify(data.token));
				localStorage.setItem('userName', JSON.stringify(data.userName));
				setIsLoggedIn(true);
				setLoginModalOpen(false);
			} else {
				throw new Error('Registration failed');
			}
		} catch (error) {
			setIsLoading(false);
			setErrorOcurred(true);
			setErrorResponse('Registration failed. Try again.');
		}
	};

	const handleLogin = async (userName: string, password: string) => {
		setIsLoading(true);
		try {
			const login = await fetch('https://goldcontactsapi.herokuapp.com/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userName: userName, password: password }),
			});
			if (login.status === 200) {
				const data = await login.json();
				setIsLoading(false);
				setErrorOcurred(false);
				setErrorResponse(null);
				localStorage.setItem('token', JSON.stringify(data.token));
				localStorage.setItem('userName', JSON.stringify(userName));
				setIsLoggedIn(true);
				setLoginModalOpen(false);
			} else {
				throw new Error('Login failed');
			}
		} catch (error) {
			setIsLoading(false);
			setErrorOcurred(true);
			setErrorResponse('Login failed. Try again.');
		}
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={loginModalOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={loginModalOpen}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							<Box textAlign="center" sx={{ width: '100%' }}>
								<Button
									variant={!isLogin ? 'contained' : 'outlined'}
									sx={{ width: '45%', mx: 0.5 }}
									disabled={isLoading}
									onClick={() => {
										//userName and password clear upon switching between login and register, this behavior can be changed if needed
										setUserName('');
										setPassword('');
										setIsLogin(false);
									}}
								>
									Register
								</Button>
								<Button
									variant={isLogin ? 'contained' : 'outlined'}
									sx={{ width: '45%', mx: 0.5 }}
									disabled={isLoading}
									onClick={() => {
										//userName and password clear upon switching between login and register, this behavior can be changed if needed
										setUserName('');
										setPassword('');
										setIsLogin(true);
									}}
								>
									Login
								</Button>
								<Button />
							</Box>
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<TextField
								id="userName"
								required
								label="Username"
								disabled={isLoading}
								variant="outlined"
								sx={{ width: '80%', alignSelf: 'center', m: 2 }}
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
							<TextField
								id="password"
								required
								type="password"
								disabled={isLoading}
								label="Password"
								variant="outlined"
								sx={{ width: '80%', alignSelf: 'center', m: 2 }}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{isLogin ? (
								<Button
									variant="contained"
									sx={{ width: '80%', alignSelf: 'center', m: 2 }}
									onClick={() => {
										handleLogin(userName, password);
									}}
								>
									{isLoading ? <CircularProgress color="inherit" /> : 'Login'}
								</Button>
							) : (
								<Button
									variant="contained"
									sx={{ width: '80%', alignSelf: 'center', m: 2 }}
									onClick={() => {
										handleRegister(userName, password);
									}}
								>
									{isLoading ? (
										<CircularProgress color="inherit" />
									) : (
										'Register'
									)}
								</Button>
							)}
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
