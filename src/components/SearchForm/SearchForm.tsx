import { FormEvent, useState } from "react";
import s from "./SearchForm.module.css";
import { axiosInstance } from "../../axios/axiosInstance";
import { FullBoardData } from "../../interfaces/interfaces";
import CreateBoardModal from "../Modal/CreateBoardModal/CreateBoardModal";
import { useDispatch } from "react-redux";
import { setBoardData } from "../../redux/features/boardSlice";

function SearchForm() {
  const [inputBoardId, setInputBoardId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreateBoardModal = (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const boardData: FullBoardData = await axiosInstance.get(
      `/boards/${inputBoardId}`
    );

    dispatch(setBoardData(boardData));
    localStorage.setItem("currentBoardId", boardData.id as string);
    setInputBoardId("");
  };

  return (
    <>
      <div className={s.search}>
        <div className="container">
          <div className={s.search_inner}>
            <form className={s.search_form} onSubmit={handleSearch}>
              <input
                type="text"
                value={inputBoardId}
                onChange={(e) => setInputBoardId(e.target.value)}
                placeholder="Enter a board ID here..."
              />
              <button className={s.search_form_load_btn} type="submit">
                Load
              </button>
            </form>
            <span>or</span>
            <button
              className={s.search_form_create_btn}
              onClick={handleCreateBoardModal}
            >
              Create
            </button>
            {isModalOpen && (
              <CreateBoardModal setIsModalOpen={setIsModalOpen} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchForm;
