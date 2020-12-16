import React from 'react';

const LibraryItem = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs }) => {

  const { name, artist, cover, active, id } = song;

  const handleSelectedSong = async () => {
    const selectedSong = songs.filter((s) => s.id === id);
    await setCurrentSong({ ...selectedSong[0] });
    console.log(selectedSong)

    const newSong = songs.map((song) => {
      if (song.id === id) {
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
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div
      className={`library-item ${active ? 'library-item__selected' : ''}`}
      onClick={handleSelectedSong}>
      <img src={cover} alt={name} />
      <div className='library-item__des'>
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  )
}

export default LibraryItem;