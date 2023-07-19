import React, { useState, useContext, useCallback, useEffect } from "react";
import classes from "./Player.module.css";
import { Slider, IconButton, Tooltip, ClickAwayListener } from "@mui/material";
import menuIcon from "../../assets/images/menuIcon.svg";
import volumeIcon from "../../assets/images/volumeIcon.svg";
import prevIcon from "../../assets/images/prevIcon.svg";
import nextIcon from "../../assets/images/nextIcon.svg";
import playIcon from "../../assets/images/playIcon.svg";
import pauseIcon from "../../assets/images/pauseIcon.svg";
import headphonesIcon from "../../assets/images/headphones.svg";
import closeIcon from "../../assets/images/closeIcon.svg";
import GlobalContext from "../../GlobalContext";

const PlayerContent = (props) => {
  const { currentSong } = useContext(GlobalContext);
  const [showVolume, setShowVolume] = useState(false);

  const listener = useCallback(
    (e) => {
      const key = e.key?.toLowerCase();
      if (key === "escape") {
        props.setFullScreen(false);
        return;
      }
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener("keyup", listener, false);
    return () => {
      document.removeEventListener("keyup", listener, false);
    };
  }, [listener]);

  return (
    <>
      {props.fullScreen && (
        <div className={classes.close}>
          <IconButton
            onClick={() => props.setFullScreen(false)}
            title="Exit Full Screen"
          >
            <img style={{ width: 20 }} src={closeIcon} alt="Close Icon" />
          </IconButton>
        </div>
      )}
      <div className={classes.sub_container}>
        {currentSong ? (
          <>
            <div className={classes.header}>
              <div className={classes.song}>{currentSong?.title}</div>
              <div className={classes.artist}>{currentSong?.artist}</div>
            </div>
            <div>
              <img
                className={classes.cover}
                src={currentSong?.photo}
                alt="cover"
              />
              <Slider
                aria-label="time-indicator"
                size="small"
                value={props.progress || null}
                min={0}
                step={1}
                max={props.audioRef.current?.duration || null}
                onChange={(_, value) => {
                  props.audioRef.current.currentTime = value;
                }}
                sx={{
                  color: "#fff",
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&:before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)'
          }`,
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
            </div>
            <div className={classes.footer}>
              <IconButton title="More Options">
                <img src={menuIcon} alt="menu" />
              </IconButton>
              <div className={classes.player_controls}>
                <IconButton title="Previous Song" onClick={props.prevSong}>
                  <img src={prevIcon} alt="Previous" />
                </IconButton>
                <IconButton title="Pause/Play" onClick={props.handlePlay}>
                  <img
                    src={props.isPlaying ? pauseIcon : playIcon}
                    alt="Play/Pause"
                  />
                </IconButton>
                <IconButton title="Next Song" onClick={props.nextSong}>
                  <img src={nextIcon} alt="Next" />
                </IconButton>
              </div>
              <ClickAwayListener onClickAway={() => setShowVolume(false)}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => setShowVolume(false)}
                  open={showVolume}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <div
                      style={{
                        width: 200,
                        padding: "0 5px",
                      }}
                    >
                      <Slider
                        sx={{ color: "#fff" }}
                        size="small"
                        aria-label="Volume"
                        value={props.volume}
                        onChange={(e, val) => {
                          props.setVolume(val);
                          props.audioRef.current.volume = val;
                        }}
                        step={0.001}
                        min={0}
                        max={1}
                      />
                    </div>
                  }
                >
                  <IconButton onClick={() => setShowVolume(true)}>
                    <img src={volumeIcon} alt="volume button" />
                  </IconButton>
                </Tooltip>
              </ClickAwayListener>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              style={{ width: 100, height: 100 }}
              src={headphonesIcon}
              alt="headphones"
            />
            <h3>Select a Song to Start Playing Music</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerContent;
