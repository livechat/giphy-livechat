/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { Select } from "@livechat/design-system";

const items = [
  { key: "Agent 1", props: { name: "Agent 1", value: "Agent 1" } },
  { key: "Agent 2", props: { name: "Agent 2", value: "Agent 2" } },
  { key: "Agent 3", props: { name: "Agent 3", value: "Agent 3" } },
];

const Filters = ({ selectedAgent, setSelectedAgent }) => {
  const getItemBody = (props) => {
    if (!props) {
      return null;
    }
    return <div id={props.value}>{props.name}</div>;
  };

  const getSelectedItemBody = (props) => {
    return <div id={props.value}>{props.name}</div>;
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      `}
    >
      <Select
        css={css`
          width: 250px;
        `}
        id="select-example"
        items={items}
        searchProperty="name"
        onItemSelect={setSelectedAgent}
        getItemBody={getItemBody}
        search
        placeholder="Select agent"
        getSelectedItemBody={getSelectedItemBody}
        selected={selectedAgent}
        searchPlaceholder="Search..."
      />
    </div>
  );
};

export default Filters;
