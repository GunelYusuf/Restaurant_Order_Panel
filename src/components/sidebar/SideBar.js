import React from 'react';
import {
    Link
} from "react-router-dom";
import {PlusCircleFilled,UnorderedListOutlined} from '@ant-design/icons';

function SideBar() {
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Dashboard</h3>
                        <ul className='sidebarList'>
                            <li className="sidebarListItem">
                                <Link to='/add-order'><PlusCircleFilled className='sidebarIcon' />Add Order</Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link to='/'><UnorderedListOutlined className='sidebarIcon' />Order List</Link>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;