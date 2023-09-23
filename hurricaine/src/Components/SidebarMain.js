import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SidebarMain.css';
import Knowledge from './Knowledge';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/knowledge">
        <Knowledge />
      </a>
    </Menu>
  );
};
