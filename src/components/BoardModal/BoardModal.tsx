import StatusColumn from "../StatusColumn/StatusColumn";
import s from "./BoardModal.module.css";

function BoardModal({ boardName }: { boardName: string }) {
  return (
    <>
      <div
        className={s.modal_shadow}
        // onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="modal"></div>
    </>
  );
}

export default BoardModal;
