import React, { useState } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react'

const ScrollTopBtn = ({ iconName, className, scrollLength }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > scrollLength) {
      setVisible(true)
    }
    else if (scrolled <= scrollLength) {
      setVisible(false)
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  window.addEventListener('scroll', toggleVisible);

  return (
    <Popup
      content='Scroll to top'
      inverted
      position='top left'
      trigger={
        <Button
          className={className}
          floated='right'
          circular
          color='blue'
          icon
          onClick={scrollToTop}
          style={{
            display: visible ? 'inline' : 'none',
            position: "fixed",
            bottom: "22px",
            right: "10px"
          }}
        >
          <Icon name={iconName} />
        </Button>
      }
    />

  );
}

export default ScrollTopBtn;