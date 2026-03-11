import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import escapeHtml from "escape-html";

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleSignin } = useContext(CurrentUserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSignin({
      email: escapeHtml(formData.email.trim()),
      password: escapeHtml(formData.password.trim()),
    });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inicia sesión</h2>
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
          Inicia sesión
        </button>
      </form>
      <p className="auth__redirect">
        ¿Aún no eres miembro?{" "}
        <Link className="auth__link" to="/signup">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
