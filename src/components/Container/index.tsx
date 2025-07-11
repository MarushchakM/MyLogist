import styles from './Container.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children, title }) => {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}