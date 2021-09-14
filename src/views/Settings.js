/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css, jsx } from "@emotion/react";
import { TabsWrapper, TabsList, Tab } from "@livechat/design-system";

import { BlockList, Suggestions, History, Announcements } from "../components";

const tabs = [
  { id: "block-list", title: "Block list" },
  { id: "suggestions", title: "Suggestions" },
  { id: "history", title: "History" },
];

const containerCss = css`
  margin: 20px;

  .lc-form-group {
    margin-bottom: 70px;
  }

  .lc-form-group__helper {
    border-bottom: 1px solid rgb(221, 226, 230);
    padding-bottom: 5px;
  }
`;

const tabsWrapperCss = css`
  margin-bottom: 30px;
`;

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("history");

  return (
    <div css={containerCss}>
      <div css={tabsWrapperCss}>
        <TabsWrapper>
          <TabsList>
            {tabs.map(({ id, title }) => (
              <Tab
                key={id}
                onClick={() => setSelectedTab(id)}
                isSelected={selectedTab === id}
              >
                {title}
              </Tab>
            ))}
          </TabsList>
        </TabsWrapper>
      </div>
      {selectedTab === "block-list" && <BlockList />}
      {selectedTab === "suggestions" && <Suggestions />}
      {selectedTab === "history" && <History />}
      {/* <Announcements onCtaClick={() => setSelectedTab("history")} /> */}
    </div>
  );
};

export default Settings;
