import React, { useContext, useEffect, useCallback } from "react";
import classes from "./Navbar.module.css";
import logo from "../../assets/images/logo.svg";
import { LOAD_PLAYLISTS } from "../../GraphQL/queries";
import { useQuery } from "@apollo/client";
import {
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Skeleton,
} from "@mui/material";
import profileAvatar from "../../assets/images/profileAvatar.svg";
import GlobalContext from "../../GlobalContext";

const NavbarContent = () => {
  const { setCurrentPlaylist, currentPlaylist, setShowNavigationDrawer } =
    useContext(GlobalContext);

  //playlists taken from API instead of hardcoding incase of more playlists being added
  const playlists = useQuery(LOAD_PLAYLISTS);

  const setPlaylist = useCallback(
    (item) => {
      setCurrentPlaylist(item);
    },
    [setCurrentPlaylist]
  );

  //for the first load
  useEffect(() => {
    setPlaylist({
      id: 1,
      title: "For You",
    });
  }, [setPlaylist, setCurrentPlaylist]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={logo} alt="logo" />
        <div className={classes.navigation}>
          {playlists.loading && (
            <Stack>
              {[0, 1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  sx={{ bgcolor: "grey.900", height: 50 }}
                  animation="wave"
                  variant="text"
                />
              ))}
            </Stack>
          )}
          <List component="nav">
            {playlists.data?.getPlaylists?.map((item) => (
              <ListItemButton
                onClick={() => {
                  setPlaylist(item);
                  setShowNavigationDrawer(false);
                }}
                className={
                  item.title === currentPlaylist.title
                    ? classes.selected
                    : classes.not_selected
                }
                key={item.id}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
      <div className={classes.avatar}>
        <img src={profileAvatar} alt="profile avatar" />
      </div>
    </div>
  );
};

export default NavbarContent;
