import s from "./Navbar.module.css";
import BoardIdIcon from "../../public/Navbar/board-id-icon.png";
import BoardNameIcon from "../../public/Navbar/board-name-arrow.png";
import { useState } from "react";
import EditBoardModal from "../Modal/EditBoardModal/EditBoardModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boardData = useSelector((state: RootState) => state.board.board);

  const handleCopyBoardId = (e: React.MouseEvent<HTMLSpanElement>) => {
    const textToCopy = e.currentTarget.innerText;

    // TODO: make small popup that informs that boardId has been copied
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <>
      <div className={s.nav}>
        <div className="container">
          <div className={s.nav_inner}>
            {boardData ? (
              <>
                <div
                  className={s.nav_board_name}
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  {boardData.name}
                  <img
                    src={BoardNameIcon}
                    alt="board-name-icon"
                    className={s.nav_board_name_arrow}
                  ></img>
                </div>
                <div className={s.nav_board_id}>
                  <img src={BoardIdIcon} alt="board-id-icon" />
                  <span onClick={handleCopyBoardId}>{boardData.id}</span>
                </div>
                {isModalOpen && (
                  <EditBoardModal setIsModalOpen={setIsModalOpen} />
                )}
              </>
            ) : (
              <div className={s.nav_board_name}>Kanban Task Manager</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
