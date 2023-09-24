import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SidebarMain.css';
import Knowledge from './Knowledge';
import img from '../assets/Tornado.png';

export default props => {
  return (
    <Menu>
      <a href="/" className="paddingBottom">
        Home
      </a>
      <p className="paddingBottom">
        <Knowledge />
      </p>
      <img src={img} className='logoCopy' alt="Logo"></img> 
      <p className='logoText'>Hurric<span className="Loop">AI</span>ne</p>
    </Menu>
  );
};
