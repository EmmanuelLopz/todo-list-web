import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import authorAvatar from "../../assets/emmanuel.png";
import styles from "./Header.module.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?title=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
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
          placeholder="Search tasks..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className={styles.rightSection}>
        <img
          src={authorAvatar}
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
