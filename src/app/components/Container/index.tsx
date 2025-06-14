import styles from './container.module.scss';

type Props = {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <section className={styles.container}>
      {children}
    </section>
  );
}