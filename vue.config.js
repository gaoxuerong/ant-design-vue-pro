module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            let name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            let result = require(`./mock/${name}`)(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
