import Head from "next/head";
import { list } from "../mongo";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  const data = JSON.parse(JSON.stringify(await list()));
  console.log(data);
  return {
    props: {
      data,
    },
  };
};

export default function Uni({ data }) {
  const name = "More Data";
  // calculae total sales
  let total = 0;
  data.forEach((item) => {
    total += Number(item["Total"]);
  });

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
        <h2 className={styles.title}>{`${name} (${data.length})`}</h2>
        <p>Total sales: £{total}</p>
        <table style={{
          minWidth: "90vw",
        }} border={1} cellPadding={10}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>University</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Coach?</th>
              <th>Grad Yr</th>
              <th>Shuttle</th>
              <th>Total Paid</th>
              <th>Dietary Requirements</th>
              <th>Allergies</th>
            </tr>
            {data.map((item) => (
              <tr
                key={
                  item["Product Form: Name"] +
                  item["Product Form: Last Name"]
                }
              >
                <td>{item["Product Form: Name"]}</td>
                <td>{item["Product Form: Last Name"]}</td>
                <td>{item["Product Form: University"]}</td>
                <td>{item["Email"]}</td>
                <td>{item["Product Form: Mobile Number"]}</td>
                <td>{item["Product Form: Are you interested in a coach service from any of the following locations?"]}</td>
                <td>{item["Product Form: Graduation Year"]}</td>
                <td>{item["Lineitem variant"]}</td>
                <td>{item["Total"]}</td>
                <td>{item["Product Form: Any Dietary Requirements?"]}</td>
                <td>{item["Product Form: Any Allergies?"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
