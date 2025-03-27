import React from 'react'
import styles from './sidebar.module.css'

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';

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
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Counselors",
        path: "/dashboard/counselors",
        icon: <MdSupervisedUserCircle />,
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

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage}src="./vercel.svg" alt="" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>username</span>
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
      <button className={styles.logout}>
        <MdLogout/>
        Logout
      </button>
          
    </div>
  )
}

export default Sidebar