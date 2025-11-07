export const dynamic = "force-dynamic";


import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/features/features.module.css";
import Image from "next/image";
import Link from "next/link";
import { fetchFeatures } from "@/app/lib/data/feature";
import { deleteFeature } from "@/app/lib/actions";

const FeaturesPage = async ({ searchParams }) => {

  const { q, page } = await searchParams;
  const { count,  features } = await fetchFeatures(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Feature..." />
        <Link href="/dashboard/features/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Sub Title</td>
            <td>Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {features.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={item.imgSrc || "/noavatar.png"}
                    alt="loading"
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {item.title}
                </div>
              </td>
              <td>{item.subtitle}</td>
              <td>{item.date?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/features/${item.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteFeature}>
                    <input type="hidden" name="id" value={(item.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default FeaturesPage;