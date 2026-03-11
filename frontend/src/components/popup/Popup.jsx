export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <section className="popup">
      <div className={`${!title ? "" : "popup__container"}`}>
        <button
          className="popup__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />

        {title && <h3 className="popup__heading">{title}</h3>}

        {children}
      </div>
    </section>
  );
}
