import * as React from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginModal from '../LoginModal';

function Header() {

  const { isLoggedIn, setIsLoggedIn, setUserContacts, setUserName, userName, setLoginModalOpen } = useContext(LoginContext);

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  }

  const logoutUser = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    setUserContacts([]);
    window.location.reload();
  }

	return (
		<AppBar position="static" sx={{ backgroundColor: 'brown' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						{/* This is the display name when in desktop mode */}
						Golden Contacts
					</Typography>

					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 0.5 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						{/* This is the display name for tablet/phone mode */}
						Golden Contacts
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0, display: 'flex' }}
							>
								<Avatar
									alt={isLoggedIn ? userName : '?'}
									src="/static/images/avatar/3.jpg"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								key={!isLoggedIn ? 'Login' : 'Logout'}
								onClick={!isLoggedIn ? handleLoginModalOpen : logoutUser}
							>
								<Typography textAlign="center">
									{!isLoggedIn ? 'Register/Login' : 'Logout'}
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
      <LoginModal />
		</AppBar>
	);
}
export default Header;
