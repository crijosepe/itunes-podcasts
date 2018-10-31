# itunes-podcast #

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Installation ##

#### Prerequisites ####
* Node v8.10.0

#### How to install ####

###### - Setup the code ######
Install the dependecies:
```bash
yarn install
```
#### Setup Linter ####
In Atom:
1. In Atom settings, install linter-eslint package.
2. In linter-eslint settings, check "Use global ESLint installation" is activated.
3. Go to console and write:
```bash
yarn global add eslint
yarn global add eslint eslint-plugin-import
yarn global add eslint eslint-plugin-jest
yarn global add eslint eslint-plugin-react
yarn global add eslint eslint-plugin-jsx-a11y
```
4. In Atom settings, install sonarlint package


#### Run development server ####

Start the enviroment.
```bash
yarn start
```

#### Run production server ####

Start the enviroment.
```bash
yarn build
```
