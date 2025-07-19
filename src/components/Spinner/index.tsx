import { LucideLoader } from "lucide-react";
import styles from './Spinner.module.scss';

type Props = {
  size?: number;
}
const Spinner: React.FC<Props> = ({size = 36}) => {
  return (
    <div className={styles.spinner}>
      <LucideLoader size={size} className={styles.spinnerIcon} />
    </div>
  );
}

export { Spinner };