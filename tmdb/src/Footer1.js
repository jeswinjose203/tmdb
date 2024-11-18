import React from 'react';

const Footer1 = () => {
  return (
    <footer style={{ backgroundColor: '#001529', color: 'white', padding: '20px 50px', textAlign: 'center' }}>

        {/* Left side of the footer (Logo or Brand name) */}
        <div style={{ marginBottom: '10px' }}>
          <img 
            src={`${process.env.PUBLIC_URL}/Create_a_logo_named_NATTER-removebg-preview.png`} 
            alt="NATTER Logo"
            style={{ height: '40px' }} 
          />
        </div>

    {/* Copyright text */}
    <div style={{ marginTop: '20px' }}>
        © {new Date().getFullYear()} NATTER. All rights reserved.
      </div>


      
    </footer>
  );
};

export default Footer1;
