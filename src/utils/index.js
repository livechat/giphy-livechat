import { GiphyFetch } from "@giphy/js-fetch-api";

const giphyFetch = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
const numberOfGifs = 20;

export const getGifs = async (query, page, offset) => {
  const withOffset = !!page || !!offset;

  return query
    ? await giphyFetch.search(query, {
        limit: numberOfGifs,
        offset: withOffset ? page * offset : undefined,
      })
    : await giphyFetch.trending({
        limit: numberOfGifs,
        offset: withOffset ? page * offset : undefined,
      });
};
