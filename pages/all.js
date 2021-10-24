import Head from "next/head";
import { list } from "../mongo";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  const data = JSON.parse(JSON.stringify(await list()));
  console.log(data);
  return {
    props: {
      name,
      data,
    },
  };
};

export default function Uni({ name, data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{name} - KCSoc Retreats</title>
        <meta name="description" content="Generated by kcsoc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back
        </button>
        <h2 className={styles.title}>{name}</h2>
        <br></br>
        <table border={1} cellPadding={10}>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
            {data.map((item) => (
              <tr
                key={
                  item["Product Form: First Name"] +
                  item["Product Form: Last Name"]
                }
              >
                <td>{item["Product Form: First Name"]}</td>

                <td>{item["Product Form: Last Name"]}</td>
                <td>{item["Product Form: Email"]}</td>
                <td>{item["Product Form: Mobile Number"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
