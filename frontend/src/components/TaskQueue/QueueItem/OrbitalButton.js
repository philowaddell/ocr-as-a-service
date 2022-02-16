import React from 'react';

import IconButton from '@mui/material/IconButton';

import ExportTypeIcon from '../../common/ExportTypeIcon';

const OrbitalButton = ({ type }) => {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        edge="start"
        aria-label={type}
        onClick={handleClick}
      >
        <ExportTypeIcon type={type} size={24} />
      </IconButton>
    </>
  );
}

export default OrbitalButton;