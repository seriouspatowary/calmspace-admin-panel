export const dynamic = "force-dynamic";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/features/features.module.css";
import Image from "next/image";
import Link from "next/link";
import { fetchBlogs } from "@/app/lib/data/blog";
import { deleteBlog } from "@/app/lib/actions";

const BlogPage = async ({ searchParams }) => {

  const { q, page } = await searchParams;
  const { count,  blogs } = await fetchBlogs(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Blog..." />
        <Link href="/dashboard/blogs/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Author</td>
            <td>Designation</td>
            <td>Category</td>
            <td>Type</td>
            <td>Description</td>
            <td>Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/avatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {item.title}
                </div>
              </td>
              <td>{item.author}</td>
              <td>{item.designation || 'NA'}</td>
              <td>{item.category || 'NA'}</td>
              <td>{item.type || 'NA'}</td>
              <td>{item.desc ? `${item.desc.substring(0, 20)}${item.desc.length > 20 ? '...' : ''}` : 'NA'}</td>
              <td>{item.createdAt}</td>

              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/blogs/${item.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteBlog}>
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

export default BlogPage;