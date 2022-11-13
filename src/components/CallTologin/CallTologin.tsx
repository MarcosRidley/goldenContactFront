import { Button } from "@mui/material";
import { useContext } from "react";
import { LoginContext } from "../../Contexts/LoginContext";

const CallToLogin = () => {
  const { setLoginModalOpen } = useContext(LoginContext);
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    //flex direction is assigned column as column because of a known issue in the CSSType library. using 'column' will NOT work.
    flexDirection: 'column' as 'column'
  };
  return (
		<div className="call-to-login" style={style}>
			<h1>Log in to see your contacts</h1>
			<Button
				variant={'contained'}
        sx={{ width: '80%', alignSelf: 'center', m: 2, fontWeight: 'bold' }}
				onClick={() => setLoginModalOpen(true)}
			>
				Register/Login
			</Button>
		</div>
	);
};

export default CallToLogin