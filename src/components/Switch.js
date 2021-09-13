/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Switch as LCSwitch } from "@livechat/design-system";

const containerCss = css`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const labelCss = css`
  align-items: center;
  color: #424d57;
  font-size: 15px;
  cursor: pointer;
`;

const Switch = ({ label, value, filtering, onFilteringChange }) => {
  return (
    <div css={containerCss}>
      <LCSwitch
        size="compact"
        onChange={() => onFilteringChange(value)}
        on={filtering.includes(value)}
        css={css`
          margin-right: 10px;
        `}
      />
      <span onClick={() => onFilteringChange(value)} css={labelCss}>
        {label}
      </span>
    </div>
  );
};

export default Switch;
