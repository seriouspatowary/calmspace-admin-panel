export const dynamic = "force-dynamic";

import React from 'react';
import Card from '../ui/dashboard/card/card';
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from '../ui/dashboard/rightbar/rightbar';
import Chart from '../ui/dashboard/chart/chart';
import { fetchTotalCounts } from '../lib/data/user';

const getChartData = async () => {
  try {
    const res = await fetch('https://app.thecalmspace.in/api/auth/count', {
      cache: 'no-store',
    });
    const json = await res.json();
    if (!json?.result || !Array.isArray(json.result)) return [];

    return json.result.map(item => ({
      name: `W${item.week}-${item.year}`,
      totalUsers: item.totalUsers,
      percentChange: item.percentChangeFromPreviousWeek,
    }));
  } catch (err) {
    console.error("Failed to fetch chart data:", err);
    return [];
  }
};

const Dashboard = async () => {
  const { totalUsers, totalCounselors, currentWeekStats } = await fetchTotalCounts();
    const chartData = await getChartData();


  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card 
            title="Total Users" 
            number={totalUsers} 
            detail={<span><span>{currentWeekStats.percentChangeFromPreviousWeek}% </span>more than previous week</span>} 
          />
          <Card 
            title="Total Counselors" 
            number={totalCounselors} 
            detail={<span></span>} 
          />
        </div>
      <Chart chartData={chartData} />
      </div>

      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;