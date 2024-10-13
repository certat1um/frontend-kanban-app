import "./App.css";
import { axiosInstance } from "./axios/axiosInstance";
import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";
import SearchForm from "./components/SearchForm/SearchForm";
import { useEffect } from "react";
import { FullBoardData } from "./interfaces/interfaces";
import { useDispatch } from "react-redux";
import { setBoardData } from "./redux/features/boardSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBoard = async (boardId: string) => {
      try {
        const board: FullBoardData = await axiosInstance.get(
          `/boards/${boardId}`
        );
        dispatch(setBoardData(board));
      } catch (e) {
        console.log(e);
      }
    };

    const boardId = localStorage.getItem("currentBoardId");
    if (!boardId || !boardId.length) {
      return;
    }
    loadBoard(boardId);
  }, []);

  return (
    <>
      <Navbar />
      <SearchForm />
      <Board />
    </>
  );
}

export default App;
