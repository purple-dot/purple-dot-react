const result = (props) => ({
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  data: undefined,
  error: undefined,
  ...props,
});

const mergeTwoAsyncResults = (a, b) => {
  if (a.isPending || b.isPending) {
    return result({
      isPending: true,
    });
  }
  if (a.isRejected || b.isRejected) {
    return result({
      isRejected: true,
      error: [a.error, b.error].flat().filter((e) => e),
    });
  }
  if (a.isFulfilled && b.isFulfilled) {
    return result({
      isFulfilled: true,
      data: [a.data, b.data].flat(),
    });
  }

  throw new Error('Unexpected state of async results');
};

export const mergeAsyncResults = (...args) => args.reduce(mergeTwoAsyncResults);
