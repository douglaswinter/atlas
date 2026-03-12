import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  ColourSchemeButton,
  Navbar,
  NavLink,
  NavLinks,
  User,
} from "@diamondlightsource/sci-react-ui";
import { useUserAuth } from "../context/userAuth/useUserAuth";

function WaffleNavbar() {
  const user = useUserAuth();

  const handleLogIn = () => {
    console.log("Logging in");
    window.location.assign("/oauth2/sign_in");
  }

  const handleLogOut = () => {
    console.log("Logging Out");
    window.location.assign("/oauth2/sign_out");
  }

  return (
    <Navbar
      logo="theme"
      containerWidth={false}
      leftSlot={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <NavLinks>
            <NavLink to="/robot" linkComponent={Link}>
              Robot
            </NavLink>
          </NavLinks>
        </Box>
      }
      rightSlot={
        <Box sx={{ marginLeft: 4 }}>
          <User
            onLogin={handleLogIn}
            onLogout={handleLogOut}
            user={user.person == null || user.person == undefined
                ? null
                : { fedid: user.person }
              }
            colour="white"
          />
          <ColourSchemeButton />
        </Box>
      }
    />
  );
}


export default WaffleNavbar;
