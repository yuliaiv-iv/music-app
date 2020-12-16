import React from 'react';
import LibraryItem from './LibraryItem';

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryOpen
}) => {
  return (
    <div className={`library ${libraryOpen ? "library-active" : " "}`}>
      <h2>Library</h2>
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