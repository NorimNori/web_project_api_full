import { useContext, useState } from "react";
import Popup from "../popup/Popup";
import NewCard from "../newCard/NewCard";
import EditAvatar from "../editAvatar/EditAvatar";
import EditProfile from "../editProfile/EditProfile";
import Card from "../card/Card";
import ImagePopup from "../imagePopup/ImagePopup";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({ cards, onAddPlace, onCardLike, onCardDelete }) {
  const [popups, setPopups] = useState({
    newCard: false,
    editProfile: false,
    editAvatar: false,
    imagePopup: null,
  });

  const { currentUser } = useContext(CurrentUserContext);

  function handleOpenPopup(name, value = true) {
    setPopups((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleClosePopup(name) {
    setPopups((prev) => ({
      ...prev,
      [name]: name === "imagePopup" ? null : false,
    }));
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Imagen de perfil"
          />
          <div
            className="profile__image-edit"
            onClick={() => handleOpenPopup("editAvatar")}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser.name || "Cargando..."}
          </h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup("editProfile")}
          />
          <p className="profile__description">{currentUser.about || ""}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup("newCard")}
        />
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={(card) => handleOpenPopup("imagePopup", card)}
            />
          ))}
        </ul>
      </section>

      {popups.newCard && (
        <Popup title="Nuevo lugar" onClose={() => handleClosePopup("newCard")}>
          <NewCard
            onAddPlace={onAddPlace}
            onClose={() => handleClosePopup("newCard")}
          />
        </Popup>
      )}

      {popups.editProfile && (
        <Popup
          title="Editar perfil"
          onClose={() => handleClosePopup("editProfile")}
        >
          <EditProfile
            currentUser={currentUser}
            onClose={() => handleClosePopup("editProfile")}
          />
        </Popup>
      )}

      {popups.editAvatar && (
        <Popup
          title="Cambiar foto de perfil"
          onClose={() => handleClosePopup("editAvatar")}
        >
          <EditAvatar onClose={() => handleClosePopup("editAvatar")} />
        </Popup>
      )}

      {popups.imagePopup && (
        <Popup title={null} onClose={() => handleClosePopup("imagePopup")}>
          <ImagePopup
            card={popups.imagePopup}
            onClose={() => handleClosePopup("imagePopup")}
          />
        </Popup>
      )}
    </main>
  );
}
