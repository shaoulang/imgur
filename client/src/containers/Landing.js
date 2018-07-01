import React from 'react';
import Logo from '../resources/images/logo.jpg';

const Landing = () => {
  const { containerStyle, layerOverlay, contentStyle, title } = styles;

  return (
    <div style={containerStyle}>
      <div style={layerOverlay}>
        <div style={contentStyle}>
          <h1 style={title}>
            Succour Team
          </h1>
          Assistance & Support In Times of Hardship
        </div>
      </div>
    </div>
  );
};

const styles = {
  containerStyle  : {
    backgroundImage     : `url(${Logo})`,
    textAlign           : 'center',
    backgroundRepeat    : 'no-repeat',
    backgroundPosition  : 'center',
    height              : '100vh',
  },
  layerOverlay    : {
    backgroundColor     : 'rgba(255, 255, 255, 0.7)',
    height              : '100vh'
  },
  contentStyle    : {
    position            : 'fixed',
    marginLeft          : '18rem'
  },
  title           : {
    margin              : '8rem 0 1.68rem 0',
    fontWeight          : '800',
    backgroundPosition  : 'center'
  }
}

export default Landing;
