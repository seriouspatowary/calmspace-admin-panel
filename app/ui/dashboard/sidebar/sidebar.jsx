import React from 'react'
import styles from './sidebar.module.css'
import { getSession } from '@/app/auth';
import {
  MdDashboard,
  MdSupervisedUserCircle,
MdArticle,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
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
        icon: <MdPeople/>,
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
  
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async() => {

  const {email} = await getSession(); // Directly fetch session data

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage}src="/logo.png" alt="" width="50" height="50" />
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