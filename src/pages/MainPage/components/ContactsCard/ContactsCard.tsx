import styles from "./contactsCard.module.scss";

interface Props {
  telephone: string;
  email: string;
  address: string;
}

export const ContactsCard = () => {
  return (
    <div className={styles.card}>
      <h4 className={styles.logo}>Свяжитесь с нами</h4>
      <p className={styles.description}>+79991032332</p>
      <p className={styles.description}>k@mail.ru</p>
    </div>
  );
};
