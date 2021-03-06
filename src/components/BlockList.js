/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css, jsx } from "@emotion/react";

import { FormGroup, FieldGroup } from "@livechat/design-system";

import BlockedPhrase from "./BlockedPhrase";
import Switch from "./Switch";
import Option from "./Option";
import BlockPhraseInput from "./BlockPhraseInput";

const radioButtonsWrapperCss = css`
  display: flex;

  .lc-radio__text {
    font-weight: 500;
  }
`;

const blockOptionsCss = css`
  margin-top: 20px;

  .lc-form-group__header {
    margin-bottom: 10px;
  }

  .lc-form-group__helper {
    border-bottom: none;
  }
`;

const blockedPhrasesCss = (error) => css`
  margin-top: ${error ? "55px" : "35px"};
  color: #424d57;
  font-size: 15px;

  > span {
    display: inline-block;
    :not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const BlockList = () => {
  const [withBlockList, setWithBlockList] = useState(false);
  const [filtering, setFiltering] = useState(["curses", "drastic"]);
  const [phrasesInput, setPhrasesInput] = useState({ value: "", error: null });
  const [blockedPhrases, setBlockedPhrases] = useState([]);

  const setPhrasesInputValue = (value) =>
    setPhrasesInput({ ...phrasesInput, value });

  const setPhrasesInputError = (error) =>
    setPhrasesInput({ ...phrasesInput, error });

  const onSubmit = () => {
    const newValue = phrasesInput.value.trim();
    let errorMsg;

    if (!newValue) {
      errorMsg = "Please enter a valid phrase.";
    }

    if (blockedPhrases.includes(newValue)) {
      errorMsg = "You already added this phrase.";
    }

    if (!errorMsg) {
      setBlockedPhrases([...blockedPhrases, phrasesInput.value]);
      setPhrasesInput({
        value: "",
        error: null,
      });
    } else {
      setPhrasesInputError(errorMsg);
    }
  };

  const onRadioClick = (value) => {
    setWithBlockList(value);
  };

  const onInputChange = (e) => {
    setPhrasesInputValue(e.target.value);
  };

  const onFilteringChange = (type) => {
    if (filtering.includes(type)) {
      setFiltering(filtering.filter((el) => el !== type));
    } else {
      setFiltering([...filtering, type]);
    }
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

        {withBlockList && (
          <FormGroup
            helperText="Choose from the available restrictions or add specific phrases that your agents will not be able to search."
            css={blockOptionsCss}
          >
            <div>
              <Switch
                label="Block searching for profanity GIFs"
                value="curses"
                filtering={filtering}
                onFilteringChange={onFilteringChange}
              />
              <Switch
                label="Block searching for outrageous GIFs"
                value="drastic"
                filtering={filtering}
                onFilteringChange={onFilteringChange}
              />
              <Switch
                label="Block searching for vulgar GIFs"
                value="vulgar"
                filtering={filtering}
                onFilteringChange={onFilteringChange}
              />

              <BlockPhraseInput
                value={phrasesInput.value}
                onChange={onInputChange}
                error={phrasesInput.error}
                onSubmit={onSubmit}
              />
              {!!blockedPhrases.length && (
                <div css={blockedPhrasesCss(phrasesInput.error)}>
                  <span>Block list:</span>
                  {blockedPhrases.map((phrase, index) => {
                    return (
                      <BlockedPhrase
                        key={`phrase-${index}-${phrase}`}
                        name={phrase}
                        onDelete={() =>
                          setBlockedPhrases(
                            [...blockedPhrases].filter((p) => p !== phrase)
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </FormGroup>
        )}
      </FieldGroup>
    </FormGroup>
  );
};

export default BlockList;
