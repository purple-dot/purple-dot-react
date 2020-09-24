function mockSDK() {
  let key;

  return {
    init: ({ apiKey }) => {
      key = apiKey;
    },
    getApiKey: () => key,
    load: jest.fn(),
    update: jest.fn(),
  };
}

const sdk = mockSDK();

module.exports = {
  loadPurpleDot: () => Promise.resolve(sdk),
};
