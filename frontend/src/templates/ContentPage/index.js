import React from "react";

import './style.css';

const ContentPageTemplate = (props) => {
  return (
    <div className='viewport'>
      <div className='scrollport'>
        <div className='content'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default ContentPageTemplate;
