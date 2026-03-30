const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const result = imagekit.getAuthenticationParameters();

    return res.status(200).json({
      token: result.token,
      expire: result.expire,
      signature: result.signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY
    });
  } catch (error) {
    return res.status(500).json({
      error: "Gagal membuat auth parameters",
      detail: error.message
    });
  }
};
