/* eslint-disable @next/next/no-img-element */


import styles from "./styles.module.scss";
import { ActiveLink } from '../ActiveLink';

export function Header() {


    
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="MH academy" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
          <a >Conteúdos</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
          <a>Blog</a>
          </ActiveLink>
        </nav>

      </div>
    </header>
  );
}

// pode usar no link o prefecht para carregar o conteúdo antes