
import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserInfo from "./UserInfo/UserInfo";
import Channels from "./Channels/Channels";



import "./SideBar.css";

export const SideBar = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="sideBarStyle">
        <UserInfo />
        <Channels />

    </Menu>
    )
}
