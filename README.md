# shJWT

shJWT is a simple library designed to offer JSON Web Token (JWT) encoding and decoding functions, using HMAC with SHA256 for signing.

## Installation

Install via npm:

```sh
npm install --save shjwt
```

## Usage

Use the library by requiring it and calling the `encode` and `decode` functions.

```js
const shjwt = require('shjwt');

const secret = 'the_secret_key';
const payload = {
  'user_id': 1,
  'email': 'test@example.com'
};

// Encoding
shjwt.encode(payload, secret)
  .then(jwt => console.log(jwt)) // prints the encoded JWT
  .catch(err => console.error(err));

// Decoding
const jwt = 'your.jwt.token.here';
shjwt.decode(jwt, secret)
  .then(decodedPayload => console.log(decodedPayload)) // prints the decoded payload
  .catch(err => console.error(err));
```

## API

### encode(payload, secret)

Converts the provided payload into a JWT. 

- `payload` (Object): The payload that will be encoded.
- `secret` (string): The secret key for generating the HMAC.
- Returns a Promise that resolves with the JWT token.

### decode(jwt, secret)

Decodes the JWT into the original payload.

- `jwt` (string): The JWT to be decoded.
- `secret` (string): The secret key for verifying the HMAC.
- Returns a Promise that resolves with the decoded payload.

## Testing

To test, ensure you have installed the necessary development dependencies:

```sh
npm install --dev
```

Run tests with:

```sh
npm test
```

## Disclaimer

Please use this library responsibly and ensure that you understand security best practices for JWT usage.

## Contribute
If you'd like to contribute, please fork the repository and use a feature branch. All contributions are welcome and greatly appreciated.

## License
This project is licensed under the GNU GPLv3 License - see the [license.md](/license) file for details.