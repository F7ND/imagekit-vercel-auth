import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export default function handler(req, res) {
  try {
    const { token, expire, signature } =
      client.helper.getAuthenticationParameters();

    res.status(200).json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY
    });
  } catch (error) {
    res.status(500).json({
      error: "Gagal membuat auth parameters"
    });
  }
}
