import s from "./StatusDropDown.module.css";
import { StatusesStateValue } from "../../../../redux/features/statusesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export function StatusDropDown({
  setOpenStatusDropDown,
  setCardStatusId,
  setCardStatusName,
  setCardStatusColor,
}: {
  setOpenStatusDropDown: Function;
  setCardStatusId: Function;
  setCardStatusName: Function;
  setCardStatusColor: Function;
}) {
  const statusesData = useSelector((state: RootState) =>
    state?.board?.board?.statuses.map((s) => ({
      id: s.id,
      name: s.name,
      primaryColor: s.primaryColor,
    }))
  ) as StatusesStateValue[];
  const handleClickItem = (status: StatusesStateValue) => {
    setCardStatusId(status.id);
    setCardStatusName(status.name);
    setCardStatusColor(status.primaryColor);
    setOpenStatusDropDown(false);
  };

  return (
    <>
      <div className={s.drow_down}>
        {statusesData?.map((status) => (
          <button
            key={status.id}
            className={s.drow_down_item}
            onClick={() => handleClickItem(status)}
            style={{ background: status.primaryColor }}
          >
            {status.name}
          </button>
        ))}
      </div>
    </>
  );
}
