/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRef, useEffect } from "react";

import { InputField, Button } from "@livechat/design-system";

const containerCss = css`
  height: 36px;
  margin-top: 15px;
  display: flex;
`;

const buttonCss = css`
  height: 36px;
  margin-left: 5px;
  margin-top: 24px;
`;

const BlockPhraseInput = ({ value, onChange, error, onSubmit }) => {
  const inputEl = useRef(null);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    inputEl?.current?.focus();
  }, []);

  return (
    <div css={containerCss}>
      <InputField
        value={value}
        id="input-field-black-list"
        placeholder="Type a phrases"
        onChange={onChange}
        ref={inputEl}
        onKeyDown={onKeyDown}
        labelText="Block specific phrases"
        autoComplete="off"
        error={error}
      />
      <Button kind="primary" css={buttonCss} onClick={onSubmit}>
        Block
      </Button>
    </div>
  );
};

export default BlockPhraseInput;
