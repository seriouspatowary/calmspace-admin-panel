export const dynamic = 'force-dynamic';

import { fetchCounselors } from "@/app/lib/data/user"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/users/users.module.css"
import Image from "next/image"



const Counselors = async({searchParams}) => {

   
   const {q,page} = await searchParams
   const {users,count} = await fetchCounselors(q,page);

  return (
  <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for user..."/>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Expertise</td>
            <td>Experience</td>
            <td>Gender</td>
          </tr>
        </thead>
        <tbody>
  {users.map((data) => (
    <tr key={data._id}>
      <td>
        <div className={styles.user}>
          <Image
            src={data.counselorId.pic || "/avatar.png"}
            alt=""
            width={40}
            height={40}
            className={styles.userImage}
          />
          {data.counselorId.name}
        </div>
      </td>
      <td>{data.counselorId.email}</td>
      <td>{data.expertise}</td>
      <td>{data.experience}</td>
      <td>{data.counselorId.gender}</td>
    </tr>
  ))}
</tbody>

      </table>
      <Pagination count={count} />
    </div>
  )
}

export default Counselors;