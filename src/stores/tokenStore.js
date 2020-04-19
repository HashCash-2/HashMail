import { action } from "easy-peasy";

export default {
  allTokens: [],

  setTokens: action((state, tokens) => {
    state.allTokens = tokens;
  })
};
