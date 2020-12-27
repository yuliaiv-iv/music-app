import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LibraryItem from './LibraryItem';

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryOpen,
  setLibraryOpen
}) => {

  const handleCloseBtn = () => {
    setLibraryOpen(!libraryOpen);
  }

  return (
    <div className={`library ${libraryOpen ? "library-active" : " "}`}>
      <div className='library-container'>
        <h2>Library</h2>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={handleCloseBtn}
          className='library-button'
        />
      </div>
      <div className='library__list'>
        {songs.map(song => <LibraryItem
          setCurrentSong={setCurrentSong}
          song={song}
          songs={songs}
          audioRef={audioRef}
          isPlaying={isPlaying}
          key={song.id}
          setSongs={setSongs}
        />)}
      </div>
    </div>
  )
}

export default Library;