import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ libraryOpen, setLibraryOpen }) => {

  const LibraryHandler = () => {
    setLibraryOpen(!libraryOpen);
  }

  return (
    <nav>
      <h1>Waves</h1>
      <button
        onClick={LibraryHandler}
      >
        Library
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </button>
    </nav>
  );
};

export default Nav;