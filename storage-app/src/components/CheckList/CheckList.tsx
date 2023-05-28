import React, { FC, useState } from "react";
import "./CheckList.css";

interface CheckListProps {
  setOk: React.Dispatch<React.SetStateAction<boolean>>;
}

type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

const CheckList: FC<CheckListProps> = ({ setOk }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  return (
    <div className="checklist-container">
      <h2>Checklist</h2>
      <ul>
      </ul>
    </div>
  );
};

export default CheckList;