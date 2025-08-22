import Image from "next/image";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="calmspace" width="50" height="50"/>
        
      </div>
      <div className={styles.text}>© All rights reserved.</div>
    </div>
  );
};

export default Footer;