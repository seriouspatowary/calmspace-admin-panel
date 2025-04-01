import { addFeature } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/features/addFeatures/addfeatures.module.css";

const AddFeaturePage = () => {
  return (
    <div className={styles.container}>
      <form action={addFeature} className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <input type="text" placeholder="Sub-Title" name="subtitle" required />
        <input type="file" name="image" accept="image/*" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFeaturePage;
