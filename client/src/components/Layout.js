import React, { Children } from 'react'
import '../styles/LayoutStyles.css'
import { adminMenu,userMenu } from '../Data/data'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { message } from 'antd'

const Layout = ({children}) => {
    const { user } = useSelector(state  => state.user)
    // location instance
    const location = useLocation();
    const navigate = useNavigate();
    navigate('/login')


    // logout function
    const handleLogout = () => {
        localStorage.clear()
        message.success('Logout Successfully')
    }

    //redering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;
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

                                {/* error 21:48 follow to this point */}
                                <div className={`menu-item `} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>  
                                          <Link to="/login">Logout</Link> 
                                          </div>
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