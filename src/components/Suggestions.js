/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { FormGroup, CheckboxField } from "@livechat/design-system";

const Suggestions = () => {
  const [shouldLikeOftenUsedGifs, setShouldLikeOftenUsedGifs] = useState(false);

  return (
    <FormGroup
      labelText="GIFs suggestions"
      helperText="Search suggestions based on keywords in the chat messages."
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <CheckboxField
        css={css`
          margin-top: 10px;
        `}
        checked={shouldLikeOftenUsedGifs}
        onClick={() => setShouldLikeOftenUsedGifs(!shouldLikeOftenUsedGifs)}
        id="checkbox-example-1"
        description="Speed up your agents workflow and automatically add the GIFs they use most often to your favorites"
      >
        Automatically add GIFs to favorites
      </CheckboxField>
    </FormGroup>
  );
};

export default Suggestions;
