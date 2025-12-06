import styles from "./Page.module.css";

export default function Page({ Left, Right }) {
  return (
    <div className={styles.appContainer}>
      {Left}
      {Right}
    </div>
  );
}
