function mockSDK() {
  let key;
  const subscribers = {};

  return {
    init: ({ apiKey }) => {
      key = apiKey;
    },
    getApiKey: () => key,
    on: (name, cb) => {
      subscribers[name] = cb;
    },
    _fire: (name, event) => {
      subscribers[name](event);
    },
    load: jest.fn(),
    update: jest.fn(),
  };
}

const sdk = mockSDK();

module.exports = {
  loadPurpleDot: () => Promise.resolve(sdk),
};
