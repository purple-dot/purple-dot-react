function mockSDK() {
  let key;

  return {
    init: ({ apiKey }) => {
      key = apiKey;
    },
    getApiKey: () => key,
  };
}

module.exports = {
  loadPurpleDot: () => Promise.resolve(mockSDK()),
};
