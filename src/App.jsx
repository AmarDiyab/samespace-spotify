import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Player from "./components/Player/Player";
import Playlist from "./components/Playlist/Playlist";
import { GlobalContextProvider } from "./GlobalContext";

const App = () => {
  return (
    <GlobalContextProvider>
      <div className="App">
        <Navbar />
        <Playlist />
        <Player />
      </div>
    </GlobalContextProvider>
  );
};

export default App;
