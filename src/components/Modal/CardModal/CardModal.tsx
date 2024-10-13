import { FormEvent, useState } from "react";
import s from "./CardModal.module.css";
import CloseModalBtn from "../../../public/Modal/CardModal/close-modal-btn.png";
import StatusArrow from "../../../public/Modal/CardModal/status-arrow.png";
import { axiosInstance } from "../../../axios/axiosInstance";
import { StatusDropDown } from "./StatusDropDown/StatusDropDown";
import { ICard } from "../../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { addNewCard } from "../../../redux/features/boardSlice";

export function CardModal({
  type,
  setIsModalOpen,
  columnData,
  boardId,
  cardData,
}: {
  type: "create" | "update";
  setIsModalOpen: Function;
  columnData: { id: string; name: string; primaryColor: string };
  cardData: ICard | undefined;
  boardId: string;
}) {
  const dispatch = useDispatch();
  const [openStatusDropDown, setOpenStatusDropDown] = useState(false);
  const [cardTitle, setcardTitle] = useState(cardData?.title ?? "Untitled");
  const [cardStatusId, setCardStatusId] = useState(columnData.id);
  const [cardStatusName, setCardStatusName] = useState(columnData.name);
  const [cardStatusColor, setCardStatusColor] = useState(
    columnData.primaryColor
  );
  const [cardDescription, setCardDescription] = useState(
    cardData?.description ?? ""
  );

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      switch (type) {
        case "create":
          const newCard: ICard = await axiosInstance.post("/cards/create", {
            title: cardTitle,
            description: cardDescription,
            status_id: cardStatusId,
            board_id: boardId,
          });
          dispatch(addNewCard(newCard));
          break;
        case "update":
          await axiosInstance.put(`/cards/${cardData?.id}`, {
            title: cardTitle,
            description: cardDescription,
            status_id: cardStatusId,
          });
          window.location.reload();
          break;
      }
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        className={s.modal_shadow}
        onClick={() => setIsModalOpen(false)}
      ></div>
      <form className={s.modal} onSubmit={handleFormSubmit}>
        <div className={s.modal_header}>
          <span>{cardTitle}</span>
          <button
            className={s.modal_header_close_btn}
            onClick={() => setIsModalOpen(false)}
          >
            <img src={CloseModalBtn} alt="modal-close-btn" />
          </button>
        </div>
        <div className={s.modal_inputs}>
          <div className={s.modal_inputs_main}>
            <div className={s.modal_inputs_title}>
              <label htmlFor="title" className={s.modal_input_label}>
                Title
              </label>
              <input
                name="title"
                type="text"
                value={cardTitle}
                onChange={(e) => setcardTitle(e.target.value)}
              />
            </div>
            <div className={s.modal_inputs_status}>
              <label className={s.modal_input_label}>Status</label>
              <div className={s.modal_status_dropdown}>
                <button
                  style={{ background: cardStatusColor }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenStatusDropDown(!openStatusDropDown);
                  }}
                >
                  {cardStatusName}
                  <img src={StatusArrow} alt="status-arrow" />
                </button>
                {openStatusDropDown && (
                  <StatusDropDown
                    setOpenStatusDropDown={setOpenStatusDropDown}
                    setCardStatusId={setCardStatusId}
                    setCardStatusName={setCardStatusName}
                    setCardStatusColor={setCardStatusColor}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={s.modal_inputs_description}>
            <label htmlFor="description" className={s.modal_input_label}>
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your task..."
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
            />
          </div>
        </div>
        <div className={s.modal_actions}>
          <button
            className={s.modal_cancel_btn}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button className={s.modal_save_btn} type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
