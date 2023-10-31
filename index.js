/**
 * @fileoverview shJWT module. This is a library that provides methods to encode 
 * and decode data using JSON Web Tokens(JWT) and HMAC with SHA256 for signing.
 * @module shjwt
 */
const crypto = require('crypto');

/**
 * Decode the JWT into the payload.
 * @param {string} jwt - The JWT to be decoded.
 * @param {string} secret - The secret key for verifying the HMAC.
 * @return {Promise<Object>} A promise that resolves with the decoded payload.
 * @throws Will throw an error if the JWT is not well formatted or if the 
 * verification failed.
 */

/**
 * Encode the payload into a JWT format.
 * @param {Object} payload - The payload that will be encoded.
 * @param {string} secret - The secret key for generating the HMAC.
 * @return {Promise<string>} A Promise that resolves with the JWT token.
 * @throws Will throw an error if an issue occurs during encoding.
 */
exports.encode = async (payload, secret) => {
  try {
    const base64Header = Buffer.from(JSON.stringify({typ: 'JWT', alg: 'HS256'})).toString('base64');
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto.createHmac('sha256', secret)
      .update(base64Header + '.' + base64Payload)
      .digest('base64')
      .replace('+', '-')
      .replace('/', '_')
      .replace(/=+$/, '');

    return Promise.resolve(`${base64Header}.${base64Payload}.${signature}`);
  } catch (error) {
    throw new Error(`Error encoding token: ${error}`);
  }
};

exports.decode = async (jwt, secret) => {
  try {
    const [base64Header, base64Payload, signature] = jwt.split('.');
    const newSignature = crypto.createHmac('sha256', secret)
      .update(base64Header + '.' + base64Payload)
      .digest('base64')
      .replace('+', '-')
      .replace('/', '_')
      .replace(/=+$/, '');

    if (signature !== newSignature) {
      throw new Error('Signature verification failed');
    }

    const decodedPayload = Buffer.from(base64Payload.replace('-', '+').replace('_', '/'), 'base64').toString('utf8');

    return Promise.resolve(JSON.parse(decodedPayload));
  } catch (error) {
    throw new Error(`Error decoding token: ${error}`);
  }
};