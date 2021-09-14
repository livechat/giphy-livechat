/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { subDays } from "date-fns";
import { FormGroup } from "@livechat/design-system";

import { Row } from "../components";

const gifs = [
  {
    url: "https://media2.giphy.com/media/3o7527pa7qs9kCG78A/200w.gif?cid=e8dffbf9sng2yx8rdchoscwiygzc5cvkm1ztobrmfwnvktq3&rid=200w.gif&ct=g",
    agent: "Agent 1",
    sentAt: new Date(),
    chatId: "fji32i1",
  },
  {
    url: "https://media0.giphy.com/media/RQSuZfuylVNAY/200w.gif?cid=e8dffbf9sng2yx8rdchoscwiygzc5cvkm1ztobrmfwnvktq3&rid=200w.gif&ct=g",
    agent: "Agent 2",
    sentAt: subDays(new Date(), 5),
    chatId: "ui3k1kls",
  },
  {
    url: "https://media0.giphy.com/media/QvBoMEcQ7DQXK/200w.gif?cid=e8dffbf9sng2yx8rdchoscwiygzc5cvkm1ztobrmfwnvktq3&rid=200w.gif&ct=g",
    agent: "Agent 1",
    sentAt: subDays(new Date(), 7),
    chatId: "nmnbh2hb",
  },
  {
    url: "https://media0.giphy.com/media/RQSuZfuylVNAY/200w.gif?cid=e8dffbf9sng2yx8rdchoscwiygzc5cvkm1ztobrmfwnvktq3&rid=200w.gif&ct=g",
    agent: "Agent 3",
    sentAt: subDays(new Date(), 10),
    chatId: "asdf0981",
  },
  {
    url: "https://media0.giphy.com/media/QvBoMEcQ7DQXK/200w.gif?cid=e8dffbf9sng2yx8rdchoscwiygzc5cvkm1ztobrmfwnvktq3&rid=200w.gif&ct=g",
    agent: "Agent 2",
    sentAt: subDays(new Date(), 20),
    chatId: "lkjkl123",
  },
];

const tableCss = css`
  border: 1px solid rgb(221, 226, 230);
  border-radius: 4px;
  width: fit-content;
  min-width: 800px;
  background-color: rgb(255, 255, 255);
`;

const headerCss = css`
  position: sticky;
  display: inline-flex;
  flex: 1 0 auto;
  min-width: 800px;
`;

const columnCss = css`
  background-color: rgb(239, 243, 245);
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.3;
  color: rgb(66, 77, 87);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  box-shadow: none;
  border: 0px;

  flex: 100 0 auto;
  width: 100px;

  :first-child {
    border-top-left-radius: 4px;
  }

  :last-child {
    border-top-right-radius: 4px;
  }
`;

const bodyCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const columns = ["GIF", "Agent", "Sent at", "Chat"];

const History = () => {
  return (
    <FormGroup
      labelText="GIFs history"
      helperText="Monitor what GIFs have been sent by your agents."
    >
      <div css={tableCss}>
        <div css={headerCss}>
          {columns.map((col) => (
            <div
              key={col}
              css={css`
                ${columnCss}
              `}
            >
              {col}
            </div>
          ))}
        </div>
        <div css={bodyCss}>
          {gifs.map((gif) => (
            <Row key={`row-${gif.agent}-${gif.chatId}`} data={gif} />
          ))}
        </div>
      </div>
    </FormGroup>
  );
};

export default History;
