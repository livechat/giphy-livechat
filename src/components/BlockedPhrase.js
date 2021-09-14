/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { MdBlock, MdClear } from "react-icons/md";

const containerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(89, 105, 158);
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
  width: max-content;
  margin-bottom: 5px;
  cursor: pointer;
`;

const iconCss = css`
  margin-bottom: -2px;
  margin-right: 3px;
`;

const BlockedPhrase = ({ name, onDelete }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <span
      key={name}
      css={containerCss}
      onClick={onDelete}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? <MdClear css={iconCss} /> : <MdBlock css={iconCss} />}
      <span>{name}</span>
    </span>
  );
};

export default BlockedPhrase;
