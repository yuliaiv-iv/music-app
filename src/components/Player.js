import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
  const {
    setIsPlaying,
    setCurrentSong,
    currentSong,
    isPlaying,
    setSongInfo,
    songInfo,
    audioRef,
    setSongs,
    songs
  } = props;

  useEffect(() => {
    const newSong = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true
        }
      } else {
        return {
          ...song,
          active: false
        }
      }
    })
    setSongs(newSong);
  }, [currentSong]);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  const moveHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value
    });
  };

  function updateTimer(time) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  };

  const skipSongHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === 'forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === 'back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className='player'>
      <div className='player__control'>
        <p>{updateTimer(songInfo.currentTime)}</p>
        <input
          type='range'
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={moveHandler}
        />
        <p>{songInfo.duration ? updateTimer(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='player__handler'>
        <FontAwesomeIcon
          className='player__back'
          icon={faAngleLeft}
          size='2x'
          onClick={() => skipSongHandler('back')}
        />
        <FontAwesomeIcon
          className='player__play'
          icon={isPlaying ? faPause : faPlay} size='2x'
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className='player__play'
          icon={faAngleRight}
          size='2x'
          onClick={() => skipSongHandler('forward')}
        />
      </div>
    </div>
  )
}

export default Player;