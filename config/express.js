module.exports = {
  port: 3000,
  useSSL: false,
  ssl: {
    privateKey: '/etc/letsencrypt/live/thesecurechat.me/privkey.pem',
    certificate: '/etc/letsencrypt/live/thesecurechat.me/fullchain.pem'
  }
}
