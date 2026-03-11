export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="tooltip">
      <div className="tooltip__container">
        <button className="tooltip__close" onClick={onClose} />
        <div
          className={`tooltip__icon ${isSuccess ? "tooltip__icon_type_success" : "tooltip__icon_type_error"}`}
        />
        <p className="tooltip__text">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}
