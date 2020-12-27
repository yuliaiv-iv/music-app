import { useState, useRef, useEffect } from 'react';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import './styles/app.scss';

function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animation: 0
  });
  const [libraryOpen, setLibraryOpen] = useState(false);

  const timeChangeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animation: percentage
    });
  };

  const nextSongHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  }

  function handleEsc(event) {
    if (event.key !== 'Escape') {
      return
    }
    setLibraryOpen(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [libraryOpen]);

  return (
    <div className={`App ${libraryOpen ? 'active-library' : ''}`}>
      <div className={`${libraryOpen ? 'blur' : ''}`}>
        <Nav
          libraryOpen={libraryOpen}
          setLibraryOpen={setLibraryOpen}
        />
        <Song
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
        <Player
          audioRef={audioRef}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setSongs={setSongs}
        />
      </div>
      <Library
        songs={songs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        libraryOpen={libraryOpen}
        setLibraryOpen={setLibraryOpen}
      />
      <audio
        onTimeUpdate={timeChangeHandler}
        onLoadedMetadata={timeChangeHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={nextSongHandler}
      >
      </audio>
    </div>
  );
}

export default App;
