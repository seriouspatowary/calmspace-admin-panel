export const dynamic = "force-dynamic";

import React from 'react';
import Card from '../ui/dashboard/card/card';
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from '../ui/dashboard/rightbar/rightbar';
import Chart from '../ui/dashboard/chart/chart';
import { fetchTotalCounts } from '../lib/data/user';

const Dashboard = async () => {
  const { totalUsers, totalCounselors } = await fetchTotalCounts();
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card 
            title="Total Users" 
            number={totalUsers} 
            detail={<span><span>12% </span>more than previous week</span>} 
          />
          <Card 
            title="Total Counselors" 
            number={totalCounselors} 
            detail={<span><span>8% </span> more than previous week</span>} 
          />
        </div>
        <Chart />
      </div>

      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;