export const dynamic = 'force-dynamic';

import { fetchCounselors } from "../../lib/data/user"
import Pagination from "../../ui/dashboard/pagination/pagination"
import Search from "../../ui/dashboard/search/search"
import styles from "../../ui/dashboard/users/users.module.css"
import Image from "next/image"
import EditCounselorModal from "../../ui/dashboard/counselor/EditCounselorModa";

const Counselors = async({searchParams}) => {
   const {q,page} = await searchParams
   const {users,count} = await fetchCounselors(q,page);

   // Function to truncate expertise text
   const truncateExpertise = (text) => {
     if (!text) return 'N/A';
     const words = text.split(' ');
     if (words.length <= 3) return text;
     return words.slice(0, 3).join(' ') + '...';
   };

   // Serialize counselor data for client component
   const serializeCounselorData = (data) => {
     return {
       _id: data._id.toString(),
       counselorId: {
         _id: data.counselorId._id.toString(),
         name: data.counselorId.name,
         email: data.counselorId.email,
         age: data.counselorId.age,
         pic: data.counselorId.pic,
         gender: data.counselorId.gender,
       },
       experience: data.experience,
       degree: data.degree,
       therapy: data.therapy,
       info: data.info,
       expertise: data.expertise,
       speciality: data.speciality,
       languages: data.languages,
       status: data.status,
       priceId: data.priceId ? {
         _id: data.priceId._id.toString(),
         chat: data.priceId.chat,
         video: data.priceId.video,
         audio: data.priceId.audio,
       } : null,
     };
   };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for Counselor..."/>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Expertise</td>
            <td>Experience</td>
            <td>Gender</td>
            <td>Chat Price</td>
            <td>Video Price</td>
            <td>Audio Price</td>
            <td>Action</td>
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
              <td>{truncateExpertise(data.expertise)}</td>
              <td>{data.experience} {data.experience === '1' ? 'year' : 'years'}</td>
              <td>{data.counselorId.gender}</td>
              <td>₹{data.priceId?.chat || 'N/A'}</td>
              <td>₹{data.priceId?.video || 'N/A'}</td>
              <td>₹{data.priceId?.audio || 'N/A'}</td>
              <td>
                <EditCounselorModal counselorData={serializeCounselorData(data)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  )
}

export default Counselors;