import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      background: "#000",
      top: 0,
      justifyContent: "space-between",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={25} />
      <span
        style={{
          marginLeft: "10px",
          color: "white",
          fontFamily: "Roboto",
          fontSize: "18px",
          fontWeight: "bold",
          display: window.innerWidth > 600 ? "none" : "inline",
        }}
      >
        YouTube
      </span>
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;
