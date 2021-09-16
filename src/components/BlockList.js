/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css, jsx } from "@emotion/react";

import { FormGroup, FieldGroup } from "@livechat/design-system";

import Option from "./Option";

const radioButtonsWrapperCss = css`
  display: flex;

  .lc-radio__text {
    font-weight: 500;
  }
`;

const BlockList = () => {
  const [withBlockList, setWithBlockList] = useState(true);

  const onRadioClick = (value) => {
    setWithBlockList(value);
  };

  return (
    <FormGroup
      labelText="GIFs block list"
      helperText="Block the possibility of searching for specific phrases."
    >
      <FieldGroup>
        <div css={radioButtonsWrapperCss}>
          <Option
            checked={!withBlockList}
            onClick={onRadioClick}
            value={false}
            title="Allow agents to send all GIFs"
            description="Your agents will be able to search for all possible phrases, including those that may not be suitable for use in communicating with the customer."
          />
          <Option
            checked={withBlockList}
            onClick={onRadioClick}
            value={true}
            title="Block specific phrases"
            description="Exclude certain types of GIFs to ensure the quality of the conversation with your customers."
          />
        </div>
      </FieldGroup>
    </FormGroup>
  );
};

export default BlockList;
