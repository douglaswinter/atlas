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
import React from "react";

function WaffleNavbar() {
  const user = useUserAuth();

  const handleLogIn = () => window.location.assign("/oauth2/sign_in");
  const handleLogOut = () => window.location.assign("/oauth2/sign_out");

  return (
    <Navbar
      logo="theme"
      containerWidth={false}
      rightSlot={
        <Box sx={{ marginLeft: 4 }}>
          <User
            onLogin={handleLogIn}
            onLogout={handleLogOut}
            user={
              user.person == null || user.person == undefined
                ? null
                : { fedid: user.person }
            }
            colour="white"
          />
          <ColourSchemeButton />
        </Box>
      }
    >
      <React.Fragment>
        <NavLinks>
          <NavLink to="/robot" linkComponent={Link}>
            Robot
          </NavLink>
        </NavLinks>
      </React.Fragment>
    </Navbar>
  );
}

export default WaffleNavbar;
