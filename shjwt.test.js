const {encode, decode} = require('./index');

describe("shJWT module", () => {
  let secret, payload, jwt;

  beforeEach(() => {
    secret = 'the_secret_key';
    payload = {
      'user_id': 1,
      'email': 'test@example.com'
    };
    jwt = '';
  });

  it('should encode payload to jwt and decode jwt back to payload', async () => {
    jwt = await encode(payload, secret); 
    expect(typeof jwt).toEqual('string');

    const decodedPayload = await decode(jwt, secret); 
    expect(JSON.stringify(decodedPayload)).toEqual(JSON.stringify(payload));
  });

  it('should throw an error when jwt signature is not valid', async () => {
    jwt = await encode(payload, secret); 
    const forgedJwt = jwt.split('.').reverse().join('.').replace('-', '+').replace('_', '/');
    await expect(decode(forgedJwt, secret)).rejects.toThrow('Signature verification failed');
  });

  it('should throw an error when jwt is not well formatted', async () => {
    const badlyFormattedJwt = `justSome.Random.Strings`
    await expect(decode(badlyFormattedJwt, secret)).rejects.toThrow('Error decoding token');
  });
});