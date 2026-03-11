import { useState } from "react";
import escapeHtml from "escape-html";

export default function NewCard({ onAddPlace, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: escapeHtml(name.trim()),
      link: escapeHtml(link.trim()),
    });

    onClose();
  }
  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          type="text"
          id="card-name-input"
          className="popup__input"
          name="title"
          minLength="2"
          maxLength="30"
          placeholder="Título"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <span id="card-name-input-error" className="popup__error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          id="card-link-input"
          className="popup__input"
          name="url"
          placeholder="Enlace a la imagen"
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <span id="card-link-input-error" className="popup__error"></span>
      </label>
      <button className="popup__save-button" type="submit">
        Guardar
      </button>
    </form>
  );
}
