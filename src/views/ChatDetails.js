/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState, useEffect, useRef } from "react";

import { createDetailsWidget } from "@livechat/agent-app-sdk";
import { Loader } from "@livechat/design-system";
import "@livechat/design-system/dist/design-system.css";

import { getGifs } from "../utils";
import { useAuth } from "../hooks";
import { Gif, EndOfList } from "../components";
import { sendRichMessage } from "../api";

const gifsCss = css`
  display: flex;
  margin: 10px;
  overflow-y: scroll;

  margin-top: 5px;
`;

const colCss = (numberOfColumns) => css`
  width: calc(100% / ${numberOfColumns});
  display: flex;
  flex-direction: column;
`;

const containerCss = css`
  height: calc(100vh - 50px);
  overflow-y: scroll;
`;

const logoCss = css`
  height: 50px;
  display: flex;
  align-items: center;

  img {
    width: 50%;
  }
`;

const offset = 10;

const ChatDetails = () => {
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const [customerProfile, setCustomerProfile] = useState({});
  const [isFetchingGifs, setIsFetchingGifs] = useState(false);

  const { accessToken: livechatToken } = useAuth();

  // Initial fetch
  useEffect(() => {
    const request = async () => {
      setIsFetchingGifs(true);
      const { data } = await getGifs();
      setGifs(data);
      setIsFetchingGifs(false);
    };

    request();
  }, []);

  // Fetching by page
  useEffect(() => {
    const request = async () => {
      setIsFetchingGifs(true);
      const { data } = await getGifs(page, offset);
      setGifs([...gifs, ...data]);
      setIsFetchingGifs(false);
    };

    if (page > 0) {
      request();
    }
  }, [page]);

  const nextPage = () => setPage(page + 1);

  const numberOfColumns = 2;
  const columns = new Array(numberOfColumns).fill([]);

  const columnsWithGifs = columns.map((_, colIndex) => {
    const currentGifs = gifs.filter(
      (_, gifIndex) => gifIndex % numberOfColumns === colIndex
    );

    return currentGifs;
  });

  const widget = useRef(null);

  useEffect(() => {
    const request = async () => {
      try {
        const messageBoxWidget = await createDetailsWidget();
        widget.current = messageBoxWidget;

        widget.current.on("customer_profile", (profile) => {
          setCustomerProfile(profile);
        });
      } catch (error) {
        console.log(error);
      }
    };

    request();
  }, []);

  const onGifClick = (gif) => {
    sendGif(gif);
  };

  const sendGif = async (gif) => {
    try {
      await sendRichMessage({
        imageUrl: gif.images.original.url,
        chatId: customerProfile.chat.chat_id,
        accessToken: livechatToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (customerProfile.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div css={containerCss}>
        <div css={gifsCss}>
          {columnsWithGifs.map((col, index) => (
            <div css={colCss(numberOfColumns)} key={`column-${index}`}>
              {col.map((gif, index) => {
                return (
                  <Gif
                    key={`${gif.slug}-${index}`}
                    gif={gif}
                    onGifClick={onGifClick}
                  />
                );
              })}
            </div>
          ))}
        </div>
        {isFetchingGifs && (
          <Loader
            size="large"
            css={css`
              margin-left: calc(50% - 28px);
            `}
          />
        )}
        {gifs.length > 0 && <EndOfList onEnterViewport={nextPage} />}
      </div>

      <div css={logoCss}>
        <a href="https://giphy.com/" target="_blank" rel="noreferrer">
          <img src="/powered_by.png" alt="Powered by Giphy" />
        </a>
      </div>
    </div>
  );
};

export default ChatDetails;
