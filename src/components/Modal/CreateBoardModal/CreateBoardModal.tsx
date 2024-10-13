import { FormEvent, useState } from "react";
import s from "./CreateBoardModal.module.css";
import ArrowUpIcon from "../../../public/Modal/EditBoardModal/arrow-up-icon.png";
import { axiosInstance } from "../../../axios/axiosInstance";
import { FullBoardData } from "../../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { setBoardData } from "../../../redux/features/boardSlice";

function CreateBoardModal({ setIsModalOpen }: { setIsModalOpen: Function }) {
  const [inputBoardName, setInputBoardName] = useState("");
  const dispatch = useDispatch();

  const createNewBoard = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const board: FullBoardData = await axiosInstance.post(`/boards/create`, {
        name: inputBoardName,
      });

      dispatch(setBoardData(board));
      localStorage.setItem("currentBoardId", board.id);
      setInputBoardName("");
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={s.modal}>
        <img
          src={ArrowUpIcon}
          alt="modal-arrow-up"
          className={s.modal_arrow_up}
        />
        <form className={s.modal_form} onSubmit={createNewBoard}>
          <input
            name="name"
            type="text"
            value={inputBoardName}
            className={s.create_board_input}
            onChange={(e) => setInputBoardName(e.target.value)}
            placeholder="Enter new board name..."
          />
          <button type="submit" className={s.create_board_btn}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateBoardModal;
