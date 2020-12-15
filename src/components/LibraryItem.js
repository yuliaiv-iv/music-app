import React from 'react';

const LibraryItem = ({ song }) => {

  const { name, artist, cover } = song;

  return (
    <div className='library-item'>
      <img src={cover} alt={name} />
      <div className='library-item__des'>
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  )
}

export default LibraryItem;