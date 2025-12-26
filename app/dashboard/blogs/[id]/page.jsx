export const dynamic = "force-dynamic";


import React from 'react'
import styles from '../../../ui/dashboard/features/singleFeature/singleFeature.module.css'
import Image from 'next/image'
import { updateBlog } from '../../../lib/actions';
import { fetchBlog } from '../../../lib/data/blog';

const SingleBlogpage = async({ params }) => {


    const { id } = await params;
    const blog = await fetchBlog(id);



  return (
      <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/avatar.png"} alt="" fill />
        </div>
        {blog.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateBlog} className={styles.form}>
            <input type="hidden" name="id" value={id} />

            <label>Title</label>
            <input type="text" name="title" defaultValue={blog.title} />

            <label>Author</label>
            <input type="text" name="author" defaultValue={blog.author} />

            <label>Designation</label>
            <input type="text" name="designation" defaultValue={blog.designation} />

            <label>Category</label>
            <input type="text" name="category" defaultValue={blog.category} />

            <label>Type</label>
            <input type="text" name="type" defaultValue={blog.type} />

            <label>Description</label>
            <textarea name="desc" defaultValue={blog.desc}></textarea>
          
             <label>Date</label>
            <input type="text" name="date" defaultValue={blog.createdAt} />


            <label>Image</label>
            <input type="file" name="image" accept="image/*"/>

            <hr />

            <h3>Content Sections</h3>
            {blog.content?.map((section, index) => (
              <div key={section._id || index} className={styles.contentSection}>
                <label>Section {index + 1} Title</label>
                <input
                  type="text"
                  name={`content[${index}][title]`}
                  defaultValue={section.title}
                />

                <label>Section {index + 1} Body</label>
                <textarea
                  name={`content[${index}][body]`}
                  defaultValue={section.body}
                ></textarea>

                <input type="hidden" name={`content[${index}][_id]`} value={id} />
              </div>
            ))}

             <button>Update</button>
       </form>


      </div>
    </div>
  )
}

export default SingleBlogpage