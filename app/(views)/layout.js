import styles from "@styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className="flex w-full h-screen bg-blue-400">
      <div className="m-auto rounded-md w-5/6 md:w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly bg-gray-50">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
