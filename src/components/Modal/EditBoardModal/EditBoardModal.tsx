import { FormEvent, useState } from "react";
import s from "./EditBoardModal.module.css";
import ArrowUpIcon from "../../../public/Modal/EditBoardModal/arrow-up-icon.png";
import DeleteBoardIcon from "../../../public/Modal/EditBoardModal/delete-board-icon.png";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setBoardData, setBoardName } from "../../../redux/features/boardSlice";
import { RootState } from "../../../redux/store";
import { FullBoardData } from "../../../interfaces/interfaces";

function EditBoardModal({ setIsModalOpen }: { setIsModalOpen: Function }) {
  const boardData = useSelector(
    (state: RootState) => state.board.board
  ) as FullBoardData;
  const [inputBoardName, setInputBoardName] = useState(boardData.name);
  const dispatch = useDispatch();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputBoardName !== boardData.name) {
      e.preventDefault();
      try {
        await axiosInstance.put(`/boards/${boardData.id}`, {
          name: inputBoardName,
        });
        dispatch(setBoardName(inputBoardName));
        setIsModalOpen(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDeleteBoard = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/boards/${boardData.id}`);
      localStorage.setItem("currentBoardId", "");
      dispatch(setBoardData(null));
      window.location.reload();
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
        <form className={s.modal_form}>
          <input
            type="text"
            className={s.edit_board_input}
            value={inputBoardName}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputBoardName(e.target.value)}
          />
          <button className={s.delete_board_btn} onClick={handleDeleteBoard}>
            <img src={DeleteBoardIcon} alt="delete-board-icon" />
            <span>Delete board</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default EditBoardModal;
