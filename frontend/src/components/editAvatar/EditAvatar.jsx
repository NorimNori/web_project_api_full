import { useContext, useRef } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import escapeHtml from "escape-html";

export default function EditAvatar({ onClose }) {
  const avatarRef = useRef();
  const { onUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    const avatarValue = avatarRef.current.value;
    onUpdateAvatar({
      avatarUrl: escapeHtml(avatarValue.trim()),
    });

    onClose();
  }
  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          type="url"
          className="popup__input popup__input_avatar"
          name="avatar"
          placeholder="Profile image URL"
          required
          ref={avatarRef}
        />
        <span className="popup__error"></span>
      </label>

      <button type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}
