import React, { useContext } from "react";
import { useMediaQuery, Drawer } from "@mui/material";
import GlobalContext from "../../GlobalContext";
import NavbarContent from "./NavbarContent";

const Navbar = () => {
  const matches = useMediaQuery("(max-width:560px)");
  const { showNavigationDrawer, setShowNavigationDrawer } =
    useContext(GlobalContext);

  return (
    <>
      {/* turn the component into a drawer for mobile view */}
      {matches ? (
        <Drawer
          anchor="left"
          open={showNavigationDrawer}
          onClose={() => setShowNavigationDrawer(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <NavbarContent />
        </Drawer>
      ) : (
        <NavbarContent />
      )}
    </>
  );
};

export default Navbar;
