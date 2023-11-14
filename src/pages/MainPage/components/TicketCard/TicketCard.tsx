import classNames from "classnames/bind";

import styles from "./ticketCard.module.scss";

interface Props {
  name: string;
  price: string | number;
}

const cx = classNames.bind(styles);

export const TicketCard = ({ name, price }: Props) => {
  const cardClassNames = cx("card", {});

  return (
    <section className={cardClassNames}>
      <div>
        <h3 className={styles.logo}>{name}</h3>
        <button className={styles.buyTicketButton}>Купить</button>
      </div>
      <h4 className={styles.price}>{price}р.</h4>
    </section>
  );
};
