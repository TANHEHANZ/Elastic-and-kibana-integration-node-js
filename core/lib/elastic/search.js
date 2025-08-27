import client from "./config.js";

export const Search = async (index, query) => {
  return await client.search({
    index,
    query: {
      match: query,
    },
  });
};
