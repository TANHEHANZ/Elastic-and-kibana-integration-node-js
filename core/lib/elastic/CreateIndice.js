import client from "./config.js";

export const CreateInidce = async (index) => {
  return await client.indices.create({ index }, { ignore: [400] });
};
