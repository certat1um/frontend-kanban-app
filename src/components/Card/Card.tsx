import { ICard } from "../../interfaces/interfaces";
import s from "./Card.module.css";
import DeleteCardIcon from "../../public/Card/delete-card-icon.png";
import { axiosInstance } from "../../axios/axiosInstance";

function Card({
  card,
  setIsModalOpen,
  setModalType,
  setSelectedCard,
  handleDragStart,
}: {
  card: ICard;
  setIsModalOpen: Function;
  setModalType: Function;
  setSelectedCard: Function;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
}) {
  const handleDeleteCard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/cards/${card.id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateCardModal = () => {
    setSelectedCard(card);
    setIsModalOpen(true);
    setModalType("update");
  };

  const renderCardTitle = () => {
    const maxLength = 24;
    return card.title.length > maxLength
      ? card.title.slice(0, maxLength) + "..."
      : card.title;
  };

  const renderCardDescription = () => {
    if (card.description && card.description.length > 0) {
      const maxLength = 60;
      return card.description.length > maxLength
        ? card.description.slice(0, maxLength) + "..."
        : card.description;
    }
    return "No description";
  };

  return (
    <>
      <div
        className={s.card}
        onClick={handleUpdateCardModal}
        style={!card.description ? { height: "80px" } : {}}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, card)}
      >
        <span className={s.card_title}>{renderCardTitle()}</span>
        <span className={s.card_description}>{renderCardDescription()}</span>
        <button className={s.card_delete_btn} onClick={handleDeleteCard}>
          <img src={DeleteCardIcon} alt="delete-cerd-btn" />
        </button>
      </div>
    </>
  );
}

export default Card;
