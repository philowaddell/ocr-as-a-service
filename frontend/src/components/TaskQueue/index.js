import React from 'react';

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { TransitionGroup } from 'react-transition-group';

import Item from './QueueItem';


const queue = ({ items, setItems }) => {

  const handleRemoveItem = (item) => {
    setItems((prev) => [...prev.filter((i) => i !== item)]);
  };

  return (
    <List>
      <TransitionGroup>
        {items.map((item) => (
          <Collapse key={item.uid}>
            <Item 
              handleRemoveItem={handleRemoveItem}
              item={item}
            />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  )
}

export default queue;