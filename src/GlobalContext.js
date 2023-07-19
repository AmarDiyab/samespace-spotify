import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [songsList, setSongsList] = useState();
  const [currentlyLoadedSongs, setCurrentlyLoadedSongs] = useState();
  const [showNavigationDrawer, setShowNavigationDrawer] = useState();

  const setGradient = (e) => {
    const gradientColor = e.pop();
    document.getElementById(
      "root"
    ).style.background = `linear-gradient(108.18deg, ${gradientColor} 2.46%, #000000 99.84%)`;
    document.getElementById(
      "fullscreen"
    ).style.background = `linear-gradient(320deg, ${gradientColor} 9%, rgba(0,0,0,1) 73%)`;
  };

  return (
    <GlobalContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentPlaylist,
        setCurrentPlaylist,
        songsList,
        setSongsList,
        currentlyLoadedSongs,
        setCurrentlyLoadedSongs,
        showNavigationDrawer,
        setShowNavigationDrawer,
        setGradient,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
