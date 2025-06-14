import { LucideLoader } from "lucide-react";
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <LucideLoader className={styles.spinnerIcon} />
    </div>
  );
}

export { Spinner };