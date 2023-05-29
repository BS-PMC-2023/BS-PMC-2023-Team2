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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter((item) => item !== value));

      setOk(false);
    } else {
      setCheckedItems([...checkedItems, value]);
      if (checkedItems.length == 2) {
        console.log("ok");

        setOk(true);
      }
    }
  };

  const checklistItems: ChecklistItem[] = [
    {
      id: "item1",
      label:
        "Product inspection:\nCheck the condition of the product and make sure there are no breaks, missing parts or malfunctions. Make sure all original accessories including packaging, attachment and certificates are in their correct place.",
      checked: false,
    },
    {
      id: "item2",
      label:
        "Cleaning:Clean the product from dust, populations and any excess.Make sure there are no smudges, fingerprints or external damage.",
      checked: false,
    },
    {
      id: "item3",
      label:
        "packing:Adjust the product to the original packaging, if any. Make sure the packaging is properly protected for the product and prevents damage during transport.",
      checked: false,
    },
  ];

  return (
    <div className="checklist-container">
      <h2>Checklist</h2>
      <ul>
        {checklistItems.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              width: "100%",
              overflowWrap: "break-word",
              marginTop: '10px'
            }}
          >
            <div style={{ width: "50%" }}>
              <input
                type="checkbox"
                value={item.id}
                checked={checkedItems.includes(item.id)}
                onChange={handleCheckboxChange}
                style={{height: '15px'}}
              />
            </div>
            <p style={{ overflowWrap: "break-word", width: "50%" }}>
              {item.label}
            </p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckList;
