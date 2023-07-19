import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import classes from "./Player.module.css";
import { IconButton, useMediaQuery, Slide } from "@mui/material";
import prevIcon from "../../assets/images/prevIcon.svg";
import nextIcon from "../../assets/images/nextIcon.svg";
import playIcon from "../../assets/images/playIcon.svg";
import pauseIcon from "../../assets/images/pauseIcon.svg";
import fullScreenIcon from "../../assets/images/fullScreenIcon.svg";
import GlobalContext from "../../GlobalContext";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const { currentSong, setCurrentSong, songsList } = useContext(GlobalContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSong, setLastSong] = useState();
  const [progress, setProgress] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const matches = useMediaQuery("(max-width:1100px)");

  const audioRef = useRef(null);

  const handlePlay = useCallback(() => {
    //stop and play the next song with new url
    if (lastSong !== currentSong?.title) {
      audioRef.current.load();
      audioRef.current.play();
      setLastSong(currentSong?.title);
      setIsPlaying(true);
      return;
    }
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying, lastSong, currentSong]);

  const nextSong = () => {
    if (currentSong) {
      const index =
        currentSong.songIndex === songsList.length - 1
          ? 0
          : currentSong.songIndex + 1;
      const data = { ...songsList[index] };
      data.songIndex = index;
      setCurrentSong(data);
    }
  };
  const prevSong = () => {
    if (currentSong) {
      const index =
        currentSong.songIndex === 0
          ? songsList.length - 1
          : currentSong.songIndex - 1;
      const data = { ...songsList[index] };
      data.songIndex = index;
      setCurrentSong(data);
    }
  };

  useEffect(() => {
    if (currentSong) {
      handlePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  //progress tracker for the progress bar
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const timer = setInterval(() => {
        setProgress(audioRef.current.currentTime);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [currentSong, isPlaying]);

  return (
    <>
      <audio
        onEnded={nextSong}
        ref={audioRef}
        preload="auto"
        src={currentSong?.url}
      />
      <div className={classes.container}>
        {!matches && (
          <PlayerContent
            nextSong={nextSong}
            prevSong={prevSong}
            isPlaying={isPlaying}
            handlePlay={handlePlay}
            audioRef={audioRef}
            progress={progress}
            volume={volume}
            setVolume={setVolume}
          />
        )}
      </div>
      <Slide
        direction="up"
        in={matches && currentSong}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.minimized_player_container}>
          <div className={classes.minimized_player}>
            <div className={classes.minimized_player_left_section}>
              <img
                className={classes.minimized_player_cover}
                src={currentSong?.photo}
                alt="cover"
              />
              <div className={classes.minimized_player_headers}>
                <div className={classes.minimized_player_song}>
                  {currentSong?.title}
                </div>
                <div className={classes.minimized_player_artist}>
                  {currentSong?.artist}
                </div>
              </div>
            </div>
            <div className={classes.footer}>
              <div className={classes.minimized_player_controls}>
                <IconButton
                  sx={{
                    width: 10,
                    height: 10,
                  }}
                  title="Previous Song"
                  onClick={prevSong}
                >
                  <img src={prevIcon} alt="Previous" />
                </IconButton>
                <IconButton title="Pause/Play" onClick={handlePlay}>
                  <img
                    src={isPlaying ? pauseIcon : playIcon}
                    alt="Play/Pause"
                  />
                </IconButton>
                <IconButton title="Next Song" onClick={nextSong}>
                  <img src={nextIcon} alt="Next" />
                </IconButton>
                <IconButton
                  onClick={() => setFullScreen(true)}
                  title="Full Screen"
                >
                  <img src={fullScreenIcon} alt="Full Screen" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide direction="up" in={matches && fullScreen}>
        <div id="fullscreen" className={classes.fullscreen_container}>
          <PlayerContent
            nextSong={nextSong}
            prevSong={prevSong}
            isPlaying={isPlaying}
            handlePlay={handlePlay}
            audioRef={audioRef}
            progress={progress}
            setFullScreen={setFullScreen}
            volume={volume}
            setVolume={setVolume}
            fullScreen={true}
          />
        </div>
      </Slide>
    </>
  );
};

export default Player;
