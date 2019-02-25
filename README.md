# atm-node

## TL;DR

After installing all the dependencies, run the setup script

```bash
$ yarn setup
```
and then, the application itself

```bash
$ yarn start
```

## Description

This is an exercise that simulates an ATM (Cash Machine).

The rules are simple:

- It should always deliver the lowest number of bills
- It's possible to get the amount requested with available bills
- The client balance is infinite
- Amount of bills/money is infinite
- Available bills and currency must be defined in the configuration

## Installation

Clone the repository and then go to the folder

```bash
$ git clone git@github.com:gerisztein/atm-node.git
$ cd atm-node
```

Install all the dependencies

```bash
$ yarn install
```

Setup

```bash
$ yarn setup
```

Run the ATM

```bash
$ yarn start
```

## License

MIT License © Lucas Gerisztein
