const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

module.exports = (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();

    res.status(200).json({
      token: result.token,
      expire: result.expire,
      signature: result.signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY
    });
  } catch (error) {
    res.status(500).json({
      error: "Gagal membuat auth parameters"
    });
  }
};
