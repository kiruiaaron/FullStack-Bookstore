import "./topbar.css" 

import React from 'react'
import profile from '../../images/JESUSU.PNG'

const Topbar = () => {
  return (
    <div className="topbarContainer">

      <div className="topbarLeft">
            <div className="logo">
             <span className="logo">Ultradev</span>
            </div>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
           <input type="text" className="searchInput" placeholder="search for any book "/>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
           <span className="topbarLink">Homepage</span>
           <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarItem">
            <span className="topbrIconBadge">1</span>
          </div>
          <div className="topbarItem">
            <span className="topbrIconBadge">2</span>
          </div>
          <div className="topbarItem">
            <span className="topbrIconBadge">1</span>
          </div>
        </div> 
        <img src={profile} className="topbarImg" alt="" />
      </div>
    </div>
  )
}

export default Topbar