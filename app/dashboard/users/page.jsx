export const dynamic = "force-dynamic";

import { fetchUsers } from "@/app/lib/data/user"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/users/users.module.css"
import VerifyButton from "@/app/ui/dashboard/verifyButton/VerifyButton";
import DeleteButton from "@/app/ui/dashboard/deleteUser/delete";

const UsersPage = async ({searchParams}) => {
  const {q,page} = await searchParams
  const {users,count} = await fetchUsers(q,page);

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
            <td>Gender</td>
            <td>Age</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Verificstion Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
        {users.map((data) => (
          <tr key={data._id}>
            <td>
              <div className={styles.user}>
                <img
                  src={data.pic || "/avatar.png"}
                  alt="profile"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                {data.name || "NA"} 
              </div>
            </td>
            <td>{data.email}</td>
            <td>{data.gender || "NA"}</td>
            <td>{data.age  || "NA"}</td>
            <td>{data.createdAt.toString().slice(4, 16)}</td>
            <td>{data.role}</td>
            <td>
              {data.role === "counselor" ? (
                data.adminVerified ? (
                  <span className={styles.verified}>Verified</span>
                ) : (
                  <VerifyButton userId={data._id.toString()} />

                )
              ) : (
                <span>NA</span>
              )}
            </td>
            <td>
                <DeleteButton  userId={data._id.toString()} />
            </td>


          </tr>
        ))}
      </tbody>

            </table>
            <Pagination count={count} />
          </div>
        )
      }

export default UsersPage