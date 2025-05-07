// card.jsx
import React from 'react';
import styles from './card.module.css';
import { MdSupervisedUserCircle } from "react-icons/md";

const Card = ({ title, number, detail }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{number}</span>
        <span className={styles.detail}>{detail}</span>
      </div>
    </div>
  );
};

export default Card;
