import React from 'react';

import styled from '@mui/styled-engine';
import IconButton from '@mui/material/IconButton';

import ExportTypeIcon from '../common/ExportTypeIcon';

const StyledIconButton = styled(IconButton)`
  margin: 10px;
`;

// TODO: Disable animation properly
const SelectedIconButton = styled(StyledIconButton)`
  transition: none !important;
  border: 10px;
  background-color: grey;
  &:hover {
    background-color: grey;
  }
`;

const LargeIconButton = ({ type, selectedType, setSelectedType }) => {

  const size = 100;

  const handleClick = () => {
    setSelectedType(type);
  };

  return (
    <>
    { type === selectedType ?
      <SelectedIconButton aria-label={type} onClick={handleClick} sx={{ height: 1.5 * size, width: 1.5 * size }}>
        <ExportTypeIcon type={type} size={size} />
      </SelectedIconButton>
      :
      <StyledIconButton aria-label={type} onClick={handleClick} sx={{ height: 1.5 * size, width: 1.5 * size }}>
        <ExportTypeIcon type={type} size={size} />
      </StyledIconButton>
    }
    </>
  )
}

export default LargeIconButton;