import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>Scholarly Atelier</div>

        <nav className={styles.nav}>
          <a href="/home" className={styles.link}>
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
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
