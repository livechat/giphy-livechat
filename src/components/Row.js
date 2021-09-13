/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { format } from "date-fns";

import Gif from "./Gif";

const rowCss = css`
  display: inline-flex;
  border-bottom: 1px solid rgb(221, 226, 230);

  :last-child {
    border-bottom: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const cellCss = css`
  width: 50px;
  flex: 100 0 auto;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgb(66, 77, 87);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  > img {
    width: 70px;
    border-radius: 10px;
  }
`;

const Row = ({ data }) => {
  return (
    <div css={rowCss}>
      <div css={cellCss}>
        <Gif
          gif={{
            images: { fixed_width: { url: data.url } },
            title: "test",
          }}
          loadingCss={css`
            width: 70px;
            height: 70px;
          `}
        />
      </div>
      <div css={cellCss}>{data.agent}</div>
      <div css={cellCss}>{format(data.sentAt, "yyyy-MM-dd")}</div>
      <div css={cellCss}>{data.chatId}</div>
    </div>
  );
};

export default Row;
