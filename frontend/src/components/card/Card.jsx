export default function Card({
  card,
  currentUser,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { name, link, isLiked, owner } = card;

  const isOwn = owner === currentUser._id;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />

      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          aria-label="Delete card"
          onClick={() => onCardDelete(card)}
        />
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Like card"
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}
