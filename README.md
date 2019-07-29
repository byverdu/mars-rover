[![Build Status](https://travis-ci.org/byverdu/mars-rover.svg?branch=master)](https://travis-ci.org/byverdu/mars-rover) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![Codecov](https://img.shields.io/codecov/c/github/byverdu/mars-rover.svg)

# Mars Rover

Simulation about how the Rovers can move through a grid after a sequence of orders were given to them.

## Getting Started

1. Clone this repository and **cd** to the newly create folder

```shell
> git clone https://github.com/byverdu/mars-rover.git
> cd mars-rover
```

2. Change the scripts folder permissions so you can execute the scripts

```shell
> chmod +x scripts/*
```

3. Run the `setup.sh` script

```shell
> ./scripts/setup.sh
```

### Prerequisites

You must have installed [Docker](https://www.docker.com/) and [NodeJs](https://nodejs.org/en/). You need to use a Unix-like operating system.

### Installing

> Docker must be running before you execute the install script

Execute the install script that will bootstrap the project and install all the needed dependencies on your system.

```shell
# lerna bootstrap && yarn tsc
> ./scripts/install.sh
```

Create the docker images and start the containers by running the following command

```shell
> docker-compose up --build
```

Once docker has finished, the API will be running on port 9000 and the UI on port 3000

## Running the tests

Previous running the tests all the npm packages must have been installed

### Run all the suites

```bash
# from the root project folder

> yarn test
```

### Unit tests for the API

```bash
# from the root project folder

> cd packages/api
> yarn test:api
```

### Unit tests for the UI

```bash
# from the root project folder

> cd packages/client
> yarn test:client
```

## Built With

* [NodeJs](https://nodejs.org/en/) - Javascript runtime environment
* [Typescript](https://www.typescriptlang.org/) - Type superset of Javascript
* [Lerna](https://github.com/lerna/lerna) - JavaScript projects manager
* [ExpressJs](https://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com) - Mongodb object modeling for nodeJs
* [React](https://reactjs.org/) - JavaScript library for building user interfaces
* [SCSS](https://sass-lang.com/) - CSS pre-processor
* [Jest](https://jestjs.io/) - Testing framework

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Albert Vallverdu** - *Initial work* - [@Byverdu](https://github.com/Byverdu)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## TODO

- [ ] Use [Swagger](https://swagger.io/) to document the API
- [ ] Write e2e tests using [cypress](https://cypress.io/)
