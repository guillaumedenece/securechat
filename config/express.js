module.exports = {
  port: 3000,
  useSSL: false,
  ssl: {
    privateKey: process.env.PRIVATE_KEY_PATH || '/etc/letsencrypt/live/thesecurechat.me/privkey.pem',
    certificate: process.env.CERTIFICATE_PATH || '/etc/letsencrypt/live/thesecurechat.me/fullchain.pem'
  }
}
