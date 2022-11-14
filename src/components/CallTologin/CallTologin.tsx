import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { LoginContext } from "../../Contexts/LoginContext";

const CallToLogin = () => {
  const { setLoginModalOpen } = useContext(LoginContext);
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "94vh",
    backgroundColor:'rgb(221, 221, 221)',
    //flex direction is assigned column as column because of a known issue in the CSSType library. using 'column' will NOT work.
    flexDirection: 'column' as 'column'
  };
  return (
		<div className="call-to-login" style={style}>
			<Typography variant="h5" sx={{ fontWeight: "bold" }}> Log in to see your contacts</Typography>
			<Button
				variant={'contained'}
        sx={{ width: '35%', maxWidth:'340px', alignSelf: 'center', m: 2, height:'10%', fontWeight:'normal', p:5 }}
				onClick={() => setLoginModalOpen(true)}
			>
				Register/Login
			</Button>
		</div>
	);
};

export default CallToLogin