import React, { Children } from 'react'
import '../styles/LayoutStyles.css'
import { SidebarMenu } from '../Data/data'
import {Link,useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = ({children}) => {
    const { user } = useSelector(( state ) => state.user)
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
                    <div className='header'>
                        <div className='header-content'>
                        <i className='fa-solid fa-bell'/>
                        <Link to="/profile">{user?.name}</Link>
                        </div>
                        
                    </div>
                    <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout