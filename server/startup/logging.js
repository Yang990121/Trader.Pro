module.exports = function () {
  require("../utils/logger");

  process.on("unhandledRejection", (err) => {
    throw new Error(err);
  });
};
