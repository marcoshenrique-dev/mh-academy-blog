import Head from "next/head";
import Image from "next/image";

import styles from "./home.module.scss";


interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product} : HomeProps) {
  return (
    <>
    <Head>
      <title>Conteúdos | MHDEV</title>
      </Head>

    <div className={styles.center}>
      <h1>🚧 Página em construção 🚧</h1>
    </div>
  
    </>
  )
}
