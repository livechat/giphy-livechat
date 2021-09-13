/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { RadioButton } from "@livechat/design-system";

const boxCss = (isTurnedOn) => css`
  border: 1px solid ${isTurnedOn ? "rgb(67, 132, 245)" : "rgb(221, 226, 230)"};
  min-width: 180px;
  max-width: 355px;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;

  .lc-field-description {
    line-height: 20px;
    cursor: pointer;
  }
`;

const Option = ({ checked, onClick, value, title, description }) => {
  return (
    <div css={boxCss(checked)} onClick={() => onClick(value)}>
      <RadioButton
        checked={checked}
        value={value}
        name="form-group-example"
        id="form-group-example-1"
        description={description}
      >
        <span
          css={css`
            font-size: 14px;
          `}
        >
          {title}
        </span>
      </RadioButton>
    </div>
  );
};

export default Option;
