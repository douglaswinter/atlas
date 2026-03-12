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
            onLogin={() => {
              console.log("logging in");
            }}
            onLogout={() => {
              console.log("logging out");
            }}
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
