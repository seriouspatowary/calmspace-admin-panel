export const dynamic = "force-dynamic";


import React from 'react'
import styles from '@/app/ui/dashboard/features/singleFeature/singleFeature.module.css'
import Image from 'next/image'
import { fetchFeature} from '@/app/lib/data/feature';
import { updateFeature } from '@/app/lib/actions';

const SingleFeaturepage = async({ params }) => {


    const { id } = await params;
    const feature = await fetchFeature(id);


  return (
      <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={feature.imgSrc || "/noavatar.png"} alt="" fill />
        </div>
        {feature.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateFeature} className={styles.form}>
            <input type="hidden" name="id" value={feature.id}/>
            <label>Title</label>
            <input type="text" name="title" placeholder={feature.title} />
            <label>Sub Title</label>
            <input type="text" name="subtitle" placeholder={feature.subtitle} />
            <label>Image</label>
            <input type="file" name="image" accept="image/*" required />
          <button>Update</button>
        </form>
      </div>
    </div>
  )
}

export default SingleFeaturepage