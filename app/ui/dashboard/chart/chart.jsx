"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from './chart.module.css';

const Chart = ({ chartData }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line key="users-line" type="monotone" dataKey="totalUsers" stroke="#8884d8" name="Users" />
          <Line key="percent-line" type="monotone" dataKey="percentChange" stroke="#82ca9d" name="% Change" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
