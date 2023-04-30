# Open Source Shakespeare API

This API provides access to the works of Shakespeare, including plays, sonnets, and other works. The data is sourced from the public domain works of Shakespeare and is provided in a structured format for easy consumption by developers.

## Getting started

### Prerequisites

To run this project, you will need to have the following software installed on your system:

- Node.js (version 12 or higher)
- Npm (version 6 or higher)
- Docker

## Installation

Clone the repository:

```bash
  git clone https://github.com/mghmay/open-source-shakespeare-api
```

Navigate to the project directory:

```bash
  cd open-source-shakespeare-api
```

Build and start the Docker container:

```bash
  docker-compose up --build
```

The server should now be running on http://localhost:3000.

## Running the server

To start the server in dev mode, run the following command:

```bash
  npm run start:dev
```

The server will start listening on port 3000 by default. You can change the port number by setting the PORT environment variable.

## API Reference

This API is currently a work in progress. When the endpoints are defined I will update this part.

The base endpoint is currently set at:

```http
  GET /api/v1
```

## License

[MIT](https://choosealicense.com/licenses/mit/) - See [licence](https://github.com/mghmay/open-source-shakespeare-api/blob/main/LICENSE) file for more details
