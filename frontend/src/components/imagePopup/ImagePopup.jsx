export default function ImagePopup(props) {
  const { card, onClose } = props;

  if (!card) return null;

  return (
    <div className="popup popup_opened popup_type_image">
      <div className="popup__container popup__container_image-preview">
        <button
          className="popup__close popup__close_image-preview"
          type="button"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__image-preview" />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}
