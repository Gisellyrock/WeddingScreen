import React, { useState, useEffect } from 'react';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div style={{ width: 25 + '%' }}>
        {/* <img src={LOGO_VIROMA} style={{width:100 + '%'}}/> */}
      </div>
      <div style={{ marginTop: '50px' }}>
        <span style={{ fontSize: '32px' }}>Página não encontrada!</span>
      </div>
    </div>
  );
}
