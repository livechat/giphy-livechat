/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { FormGroup, CheckboxField, RadioButton } from "@livechat/design-system";

const Suggestions = () => {
  const [shouldLikeOffenUsedGifs, setShouldLikeOffenUsedGifs] = useState(false);
  const [gifsSearchSuggestions, setGifsSearchSuggestions] = useState({
    isTurnedOn: false,
    source: "agents",
  });

  const toggleGifsSearchSuggestions = () =>
    setGifsSearchSuggestions({
      ...gifsSearchSuggestions,
      isTurnedOn: !gifsSearchSuggestions.isTurnedOn,
    });

  const changeGifsSearchSuggestionsSource = (s) => {
    if (gifsSearchSuggestions.source !== s) {
      setGifsSearchSuggestions({
        ...gifsSearchSuggestions,
        source: s,
      });
    }
  };

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
        checked={shouldLikeOffenUsedGifs}
        onClick={() => setShouldLikeOffenUsedGifs(!shouldLikeOffenUsedGifs)}
        id="checkbox-example-1"
        description="Speed up your agents workflow and automatically add the GIFs they use most often to your favorites"
      >
        Automatically add GIFs to favorites
      </CheckboxField>
      <div
        css={css`
          margin-top: 25px;
        `}
      >
        <CheckboxField
          checked={gifsSearchSuggestions.isTurnedOn}
          onClick={toggleGifsSearchSuggestions}
          id="checkbox-example-1"
          description="Suggestions based on chat messages will make it easier for agents to select suitable GIFs"
        >
          Suggest GIFs based on chat messages
        </CheckboxField>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-left: 25px;
        `}
      >
        <RadioButton
          css={css`
            margin-top: 10px;
          `}
          disabled={!gifsSearchSuggestions.isTurnedOn}
          checked={gifsSearchSuggestions.source === "agents"}
          onClick={() => changeGifsSearchSuggestionsSource("agents")}
          id="checkbox-example-1"
          description="Suggest GIFs basing on agents messages"
        >
          Agents
        </RadioButton>{" "}
        <RadioButton
          css={css`
            margin-top: 10px;
          `}
          disabled={!gifsSearchSuggestions.isTurnedOn}
          checked={gifsSearchSuggestions.source === "visitors"}
          onClick={() => changeGifsSearchSuggestionsSource("visitors")}
          id="checkbox-example-1"
          description="Suggest GIFs basing on visitors messages"
        >
          Visitors
        </RadioButton>
        <RadioButton
          css={css`
            margin-top: 10px;
          `}
          disabled={!gifsSearchSuggestions.isTurnedOn}
          checked={gifsSearchSuggestions.source === "both"}
          onClick={() => changeGifsSearchSuggestionsSource("both")}
          id="checkbox-example-1"
          description="Suggest GIFs based on all messages in the chat"
        >
          Both
        </RadioButton>
      </div>
    </FormGroup>
  );
};

export default Suggestions;
