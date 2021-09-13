/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import { Modal, Button, Toast } from "@livechat/design-system";

const modalCss = css`
  .lc-modal__header {
    display: none;
  }

  .lc-modal-base__close {
    display: none;
  }

  .lc-modal__body {
    padding: 0;
  }
`;

const buttonStyle = {
  width: "calc(50% - 8px)",
  margin: "0 4px",
};

const imgCss = (loaded) => css`
  max-height: 50vh;
  ${!loaded &&
  css`
    width: 100%;
    height: 300px;
  `}
`;

const iconCss = (fill) => css`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${fill && `fill: ${fill};`}

  :hover {
    transform: scale(1.1);
  }
`;

const toastCss = css`
  z-index: 100000;
  position: absolute;
  top: 10px;
  right: 10px;
  width: calc(100% - 20px);
`;

const GifModal = ({ gif, status, setStatus, onSubmit, handleModalClose }) => {
  const [loaded, setLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // EXC 1st: add state handling and presenting error

  return (
    <div css={modalCss}>
      <Modal
        style={{ width: "calc(100vw - 20px)", minWidth: "0" }}
        onClose={handleModalClose}
        footer={
          <div
            css={css`
              width: 100%;
            `}
          >
            <Button
              style={buttonStyle}
              size="large"
              onClick={handleModalClose}
              kind="secondary"
            >
              Close
            </Button>
            <Button
              kind="primary"
              style={buttonStyle}
              size="large"
              onClick={onSubmit}
              loading={status?.action === "sending"}
            >
              Send GIF
            </Button>
          </div>
        }
      >
        {isFavorite ? (
          <MdFavorite
            css={iconCss("#4384f5")}
            onClick={() => setIsFavorite(false)}
          />
        ) : (
          <MdFavoriteBorder
            onClick={() => setIsFavorite(true)}
            css={iconCss()}
          />
        )}

        <img
          alt={gif.title}
          src={gif.images.fixed_width.url}
          css={imgCss(loaded)}
          onLoad={() => setLoaded(true)}
        />
      </Modal>
      {status?.action === "error" && (
        <Toast
          variant="error"
          removable
          css={toastCss}
          onClose={() => setStatus()}
        >
          {status?.errorMsg}
        </Toast>
      )}
    </div>
  );
};

export default GifModal;
