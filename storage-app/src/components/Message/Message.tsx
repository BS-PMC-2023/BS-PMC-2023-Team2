import React, { FC } from "react";
import "./message.css";

interface MessageProps {
  wobble: string | number;
  setWobble: React.Dispatch<React.SetStateAction<number>>;
}

const Message: FC<MessageProps> = ({  wobble, setWobble }) => {
  return (
    //@ts-ignore
    <div className="MsgC" wobble={wobble} onAnimationEnd={() => setWobble(0)}>      
      <div className="msg">
        <h3>Great!</h3>
        <p>The product has been added successfully!</p>
      </div>
    </div>
  );
};

export default Message;
