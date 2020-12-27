import React from 'react';

const Song = ({ currentSong, isPlaying }) => {

  const { name, artist, cover } = currentSong;

  return (
    <div className='song'>
      <img className={isPlaying ? 'song_animation' : ''}
        src={cover}
        alt={name}
      />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  )
}

export default Song;