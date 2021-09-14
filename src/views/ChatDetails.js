/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState, useEffect, useRef } from "react";

import { createDetailsWidget } from "@livechat/agent-app-sdk";
import {
  SearchBar,
  TabsWrapper,
  TabsList,
  Tab,
  Loader,
} from "@livechat/design-system";
import "@livechat/design-system/dist/design-system.css";

import { getGifs } from "../utils";
import { useAuth } from "../hooks";
import { Gif, GifModal, EndOfList } from "../components";
import { sendRichMessage } from "../api";

const containerCss = css`
  margin-top: 15px;
  margin-left: 10px;
  width: calc(100% - 20px);
`;

const gifsCss = (withMargin) => css`
  display: flex;
  margin: 10px;
  overflow-y: scroll;

  margin-top: ${withMargin ? "48px" : "5px"};
`;

const colCss = (numberOfColumns) => css`
  width: calc(100% / ${numberOfColumns});
  display: flex;
  flex-direction: column;
`;

const searchCss = css`
  padding: 10px;
  position: fixed;
  top: 44px;
  z-index: 100;
  width: calc(100% - 20px);
  background-color: white;
`;

const searchWrapperCss = css`
  height: calc(100vh - 100px);
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

const items = [
  { id: "search", title: "Search", count: 1 },
  { id: "favourites", title: "Favourites", count: 3 },
];

const offset = 10;

const ChatDetails = () => {
  const [gifs, setGifs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedGif, setSelectedGif] = useState({});
  const [page, setPage] = useState(0);
  const [sendingStatus, setSendingStatus] = useState();
  const [customerProfile, setCustomerProfile] = useState({});
  const [selectedTab, setSelectedTab] = useState("search");
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

    if (selectedTab === "search") {
      request();
    }
  }, []);

  // Fetching by query
  useEffect(() => {
    const request = async () => {
      setIsFetchingGifs(true);
      setGifs([]);
      const { data } = await getGifs(searchValue);
      setGifs(data);
      setIsFetchingGifs(false);
    };
    if (selectedTab === "search") {
      request();
    }
  }, [searchValue]);

  // Fetching by page
  useEffect(() => {
    const request = async () => {
      setIsFetchingGifs(true);
      const { data } = await getGifs(searchValue, page, offset);
      setGifs([...gifs, ...data]);
      setIsFetchingGifs(false);
    };

    if (selectedTab === "search" && page > 0) {
      request();
    }
  }, [page]);

  const nextPage = () => setPage(page + 1);

  const numberOfColumns = 2;
  const columns = new Array(numberOfColumns).fill([]);

  const columnsWithGifs = columns.map((_, colIndex) => {
    if (selectedTab === "search") {
      const currentGifs = gifs.filter(
        (_, gifIndex) => gifIndex % numberOfColumns === colIndex
      );

      return currentGifs;
    }
    if (selectedTab === "favourites") {
      const currentGifs =
        JSON.parse(localStorage?.getItem("livechat-giphy-favorites"))?.filter(
          (_, gifIndex) => gifIndex % numberOfColumns === colIndex
        ) || [];

      return currentGifs;
    }
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
    setSelectedGif(gif);
  };

  const handleModalClose = () => setSelectedGif({});

  const sendGif = async (gif) => {
    setSendingStatus({
      action: "sending",
    });

    try {
      await sendRichMessage({
        imageUrl: gif.images.original.url,
        chatId: customerProfile.chat.chat_id,
        accessToken: livechatToken,
      });
      setSendingStatus({
        action: "success",
      });
      handleModalClose();
    } catch (err) {
      setSendingStatus({
        action: "error",
        errorMsg: err.message,
      });
    }
  };

  if (customerProfile.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div css={containerCss}>
        <TabsWrapper>
          <TabsList>
            {items.map(({ id, title }) => (
              <Tab
                onClick={() => setSelectedTab(id)}
                key={id}
                isSelected={selectedTab === id}
              >
                {title}
              </Tab>
            ))}
          </TabsList>
        </TabsWrapper>
      </div>
      <div css={searchWrapperCss}>
        {selectedTab === "search" && (
          <SearchBar
            debounceTime={500}
            onChange={setSearchValue}
            css={searchCss}
            placeholder="Search for gifs..."
          />
        )}

        <div css={gifsCss(selectedTab === "search")}>
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

        {selectedGif.slug && (
          <GifModal
            handleModalClose={handleModalClose}
            onSubmit={() => sendGif(selectedGif)}
            gif={selectedGif}
            status={sendingStatus}
            setStatus={setSendingStatus}
          />
        )}
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
