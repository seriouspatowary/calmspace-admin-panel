import React from 'react'
import styles from './sidebar.module.css'
import { getSession } from '@/app/auth';
import {
  MdDashboard,
  MdSupervisedUserCircle,
MdArticle,
  MdPeople,
  MdLogout,
} from "react-icons/md";
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';
import { logout } from '@/app/lib/actions';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdPeople />,
        
      },
      {
        title: "Counselors",
        path: "/dashboard/counselors",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Features",
        path: "/dashboard/features",
        icon: <MdDashboard />,
      },
      {
        title: "Blogs",
        path: "/dashboard/blogs",
        icon: <MdArticle />,
      }
    ],
  },
  

];

const Sidebar = async() => {

  const {email} = await getSession(); 

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/crop.png" alt="calmspace" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>{ email}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
          <ul className={styles.list}>
              {
                  menuItems.map((data) => (
                    <li key={data.title}>
                      <span className={styles.cat}>{data.title}</span>
                      {
                        data.list.map((item) => (
                          <MenuLink item={item} key={item.title}/>
                        ))
                      }
                      </li>
                  
              ))}
      </ul>
     <form action={logout}>
        <button type="submit" className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
          
    </div>
  )
}

export default Sidebar