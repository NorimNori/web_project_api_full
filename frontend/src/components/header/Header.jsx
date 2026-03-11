import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header() {
  const { currentUser, isLoggedIn, handleLogout } =
    useContext(CurrentUserContext);
  const location = useLocation();

  function renderNavLink() {
    if (location.pathname === "/signup") {
      return (
        <Link className="header__link" to="/signin">
          Iniciar sesión
        </Link>
      );
    }
    if (location.pathname === "/signin") {
      return (
        <Link className="header__link" to="/signup">
          Regístrate
        </Link>
      );
    }
    if (isLoggedIn) {
      return (
        <div className="header__user-info">
          <p className="header__email">{currentUser.email}</p>
          <button className="header__logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      );
    }
  }

  return (
    <header className="header page__section">
      <img className="header__image" src={logo} alt="Around the U.S. logo" />
      <nav className="header__nav">{renderNavLink()}</nav>
    </header>
  );
}
