import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import escapeHtml from "escape-html";

export default function EditProfile({ onClose }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({
      name: escapeHtml(name.trim()),
      about: escapeHtml(about.trim()),
    });

    onClose();
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          type="text"
          id="form-input-title"
          className="popup__input"
          name="title"
          minLength="2"
          maxLength="40"
          placeholder="Nombre"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span id="form-input-title-error" className="popup__error"></span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          id="form-input-description"
          className="popup__input"
          name="description"
          minLength="2"
          maxLength="200"
          placeholder="Acerca de mí"
          value={about}
          onChange={handleAboutChange}
          required
        />
        <span id="form-input-description-error" className="popup__error"></span>
      </label>
      <button className="popup__save-button" type="submit">
        Guardar
      </button>
    </form>
  );
}
