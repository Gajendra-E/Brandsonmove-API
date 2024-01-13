require('dotenv').config();

const config = {
    EMAIL: process.env.EMAIL,
    PASSWORD:process.env.PASSWORD,
    BACK_END_URL:process.env.BACK_END_URL
  };
  
  module.exports = config;