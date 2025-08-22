import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import Link from "next/link";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/vercel.svg" alt="" fill />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h3 className={styles.title}>
           An Invaluable Lesson From The Bhagavad Gita For Your Life
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
           Discover a life-changing lesson from the Bhagavad Gita to inspire wisdom, strength, and inner peace
          </p>
          <a href="https://www.youtube.com/watch?v=2-inNDXoeVE" className={styles.button} target="_blank" rel="noopener noreferrer">
            <MdPlayCircleFilled />
            Watch
          </a>
        </div>
      </div>

    </div>
  );
};

export default Rightbar;