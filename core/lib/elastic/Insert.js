import client from "./config.js";

export const Insert = async (index, data) => {
  return await client.index({
    index,
    document: data,
  });
};
