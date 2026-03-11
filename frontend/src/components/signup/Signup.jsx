import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import escapeHtml from "escape-html";

export default function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleSignup } = useContext(CurrentUserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSignup({
      email: escapeHtml(formData.email.trim()),
      password: escapeHtml(formData.password.trim()),
    });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="auth__button" type="submit">
          Regístrate
        </button>
      </form>
      <p className="auth__redirect">
        ¿Ya eres miembro?{" "}
        <Link className="auth__link" to="/signin">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
