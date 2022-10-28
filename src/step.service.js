// * TODO: Implement function for updating user's step data in store
// * TODO: Function for getting user's step data may need some adjustments
module.exports = function stepService(store) {
  const service = {};

  service.get = (username) =>
    typeof store[username] === "function" ? undefined : store[username];

  service.add = (username, ts, newSteps) => {
    // Assume that `store` is initially an empty object {}. An example `store` is:
    // {
    //   luisa: {
    //     ts: 1503256778463,
    //     cumulativeSteps: 6969,
    //   },
    //   juan: {
    //     ts: 1503256824767,
    //     cumulativeSteps: 420,
    //   },
    // }
    if (!store[username]) store[username] = {};
    store[username] = {
      ts,
      cumulativeSteps: (store[username].cumulativeSteps || 0) + newSteps,
    };
  };

  return service;
};
