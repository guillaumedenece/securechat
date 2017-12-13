module.exports = {
  challenge_validity_time: process.env.CHALLENGE_VALIDITY_TIME || 1 * 60 * 1000,
  token_validity_time: process.env.TOKEN_VALIDITY_TIME || '1h',
  token_secret_key: process.env.TOKEN_SECRET_KEY || 'secret_key'
};
