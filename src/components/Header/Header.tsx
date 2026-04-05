import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>TodoApp</div>

        <nav className={styles.nav}>
          <a href="/" className={styles.link}>
            Dashboard
          </a>
          <a href="/about" className={styles.link}>
            About
          </a>
        </nav>
      </div>

      <div className={styles.centerSection}>
        <input
          type="text"
          placeholder="Buscar tareas..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.rightSection}>
        <img
          src="https://i.pravatar.cc/40"
          alt="Foto de perfil"
          className={styles.profileImage}
        />
      </div>
    </header>
  );
};

export default Header;