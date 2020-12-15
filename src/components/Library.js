import React from 'react';
import LibraryItem from './LibraryItem';

const Library = ({ songs }) => {

  return (
    <div className='library'>
      <h2>Library</h2>
      <div className='library__list'>
        {songs.map(song => <LibraryItem
          song={song}
        />)}
      </div>
    </div>
  )
}

export default Library;