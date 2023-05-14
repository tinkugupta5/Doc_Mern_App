import React, { Children } from 'react'
import '../styles/LayoutStyles.css'
import { SidebarMenu } from '../Data/data'
import {Link,useLocation} from 'react-router-dom'

const Layout = ({children}) => {
    // location instance
    const location = useLocation();
    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'>
                            <h6 className='logo'>Logo</h6>
                            <hr/>
                            <div className={"menu"}>
                                {SidebarMenu.map(menu => {
                                    console.log("location",location)
                                    const isActive = location.pathname === menu.path
                                    return (
                                        <>
                                          <div className={`menu-item ${isActive && 'active'}`}>
                                          <i class={menu.icon}></i>   
                                          <Link to={menu.name}>{menu.name}</Link> 
                                          </div>                   
                                        </>
                                    )
                                    
                                })}
                            </div>
                        </div>
                       
                    </div>
                    <div className='content'>
                    <div className='header'>Header</div>
                    <div className='body'>{children}</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout