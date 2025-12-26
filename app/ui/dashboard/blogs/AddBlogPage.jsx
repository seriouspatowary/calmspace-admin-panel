
"use client";


import { useState } from "react";
import styles from "../../../ui/dashboard/blogs/addBlog.module.css";
import { MdAdd, MdDelete, MdEdit, MdHome, MdCheckCircle } from "react-icons/md";
import { addBlog } from "../../../lib/actions";

const AddBlogPage = () => {
  const [contentSections, setContentSections] = useState([
    { title: "", body: "" },
  ]);

  const handleContentChange = (index, field, value) => {
    const updatedSections = [...contentSections];
    updatedSections[index][field] = value;
    setContentSections(updatedSections);
  };
     
  const addContentSection = () => {
    setContentSections([...contentSections, { title: "", body: "" }]);
  };

  const removeContentSection = (index) => {
    const updatedSections = contentSections.filter((_, i) => i !== index);
    setContentSections(updatedSections);
  };

  return (
    <div className={styles.container}>
      <form
        action={addBlog} className={styles.form}
      >
        <input type="text" placeholder="Title" name="title" required />
        <input type="text" placeholder="Author" name="author" required />
        <input type="text" placeholder="Designation" name="designation" />
        <input type="text" placeholder="Category" name="category" required />
        <input type="text" placeholder="Type" name="type" />
        <input type="text" placeholder="Date" name="date" />
        <input type="file" name="image" accept="image/*" required />
        <input type="text" placeholder="Message" name="message" />
        <textarea type="text" placeholder="Description" name="desc" />


        {contentSections.map((section, index) => (
        <div key={index} className={styles.contentSection}>
            <div className={styles.contentRow}>
                <input
                    type="text"
                    placeholder="Content Title"
                    name={`content[${index}][title]`}
                    value={section.title}
                    onChange={(e) => handleContentChange(index, "title", e.target.value)}
                    className={styles.contentInput}
                    required
                />
                <textarea
                    placeholder="Content Body"
                    name={`content[${index}][body]`}
                    rows={4}
                    value={section.body}
                    onChange={(e) => handleContentChange(index, "body", e.target.value)}
                    className={styles.contentTextarea}
                    required
                />
                </div>


                {index > 0 && (
                <button
                    type="button"
                    onClick={() => removeContentSection(index)}
                    className={styles.removeButton}
                        >
                    <MdDelete style={{ marginRight: '6px', verticalAlign: 'middle' }} />

                    Remove Section
                </button>
                )}
        </div>
        ))}


        <div className={styles.addSectionBtnWrapper}>
        <button type="button" onClick={addContentSection} className={styles.content}>
            <MdAdd style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Add Content
        </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlogPage;
