import s from "./StatusColumn.module.css";
import AddNewCardIcon from "../../public/StatusColumn/add-new-card-icon.png";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { CardModal } from "../Modal/CardModal/CardModal";
import { StatusesStateValue } from "../../redux/features/statusesSlice";
import { axiosInstance } from "../../axios/axiosInstance";
import { ICard } from "../../interfaces/interfaces";

function StatusColumn({
  data,
  boardId,
}: {
  data: StatusesStateValue;
  boardId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const renderCards = () => {
    if (!data.cards.length) {
      return <span className={s.column_body_no_cards}>No cards</span>;
    }

    return data.cards.map((c) => (
      <Card
        key={c.id}
        card={c}
        setIsModalOpen={setIsModalOpen}
        setModalType={setModalType}
        setSelectedCard={setSelectedCard}
        handleDragStart={handleDragStart}
      />
    ));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
  };

  const handleDrop = async (e: React.DragEvent) => {
    const card: ICard = JSON.parse(e.dataTransfer.getData("card"));
    if (data.id !== card.status_id) {
      await axiosInstance.put(`/cards/drag-and-drop/${card.id}`, {
        status_id: data.id,
      });
      window.location.reload();
      e.preventDefault();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCreateCardModal = () => {
    setSelectedCard(null);
    setIsModalOpen(true);
    setModalType("create");
  };

  return (
    <>
      <div className={s.column} onDrop={handleDrop} onDragOver={handleDragOver}>
        <div
          className={s.column_header}
          style={{ background: data.primaryColor }}
        >
          <span>{data.name}</span>
        </div>
        <div className={s.column_body}>
          <div className={s.column_body_cards}>{renderCards()}</div>
          <button
            onClick={handleCreateCardModal}
            className={s.column_new_card_btn}
            style={{ background: data.primaryColor }}
          >
            <img src={AddNewCardIcon} alt="+" />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <CardModal
          type={modalType}
          setIsModalOpen={setIsModalOpen}
          columnData={{
            id: data.id,
            name: data.name,
            primaryColor: data.primaryColor,
          }}
          cardData={selectedCard}
          boardId={boardId}
        />
      )}
    </>
  );
}

export default StatusColumn;
