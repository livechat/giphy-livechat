/** @jsxImportSource @emotion/react */
import { css, jsx, keyframes } from "@emotion/react";
import { useState } from "react";
import { lighten } from "polished";

const shine = keyframes`
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
`;

const loadingCss = css`
  width: calc(100% - 10px);
  height: 120px;

  background-image: linear-gradient(
    90deg,
    ${lighten(0.05, "#dde2e6")} 25%,
    ${"#dde2e6"} 37%,
    ${lighten(0.05, "#dde2e6")} 63%
  );
  animation: ${shine} 1.4s ease infinite;
  background-size: 400% 100%;
`;

const gifCss = (loaded) => css`
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.05s ease-in-out;

  ${!loaded && loadingCss}
`;

const Gif = ({ gif, onGifClick }) => {
  const [loaded, setLoaded] = useState(false);

  const { images } = gif;

  return (
    <img
      onClick={(e) => {
        e.preventDefault();
        onGifClick?.(gif);
      }}
      css={gifCss(loaded)}
      alt={gif?.title}
      src={images?.fixed_width?.url}
      onLoad={() => setLoaded(true)}
    />
  );
};

export default Gif;
