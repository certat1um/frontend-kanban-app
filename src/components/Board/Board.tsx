import { useSelector } from "react-redux";
import StatusColumn from "../StatusColumn/StatusColumn";
import s from "./Board.module.css";
import { RootState } from "../../redux/store";

function Board() {
  const boardData = useSelector((state: RootState) => state.board.board);
  console.log(boardData);

  const renderEmptyBoard = () => {
    return <>No board.</>;
  };

  return (
    <>
      <div className="container">
        <div className={s.board}>
          {boardData ? (
            <>
              {boardData.statuses.map((status) => (
                <StatusColumn
                  key={status.id}
                  data={status}
                  boardId={boardData.id}
                />
              ))}
            </>
          ) : (
            renderEmptyBoard()
          )}
        </div>
      </div>
    </>
  );
}

export default Board;
