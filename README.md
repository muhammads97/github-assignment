# Github Clone App

Github clone example in React Native

## Development principles

- Write type-safe code
- Use design patterns
- Use Typescript principals and clean code
- Make it easy to build/customize tools
- Ensure you follow the linting rules by running `yarn lint` and fix any reported errors

## Requirements

- Make sure you have the react-native environment installed. Check [this](https://reactnative.dev/docs/environment-setup) for more details

## Installation

- Clone the repository on your machine.
- Go to the local repository directory
- Ensure that minimum `node` version is `12` (You can install `nvm` and use the local repo version)
- Install `yarn` dependencies

        yarn install
        yarn pods

## Run the app

### Android

- Run `yarn android` in the root directory

### iOS

- Run `yarn ios` in the root directory

## Add Assets

### Fonts

- Make sure you have the font name to be its `PostScript name`
- Add the font file to src/assets/fonts
- Run `yarn fonts`
- Run `react-native link`
- Fonts will be populated in `src/assets/fonts/index.ts`

### Images

- Add your image (one or more sizes) to src/assets/images
- Run `yarn images`
- Images will be populated in `src/assets/images/index.ts`

## Troubleshooting

If you get a red screen saying "Couldn't connect to development server", try the following

- Make sure you have the metro bundler running. If not, run the following command in the root:

        yarn start

- Go through the steps mentioned [here](https://reactnative.dev/docs/running-on-device#method-2-connect-via-wi-fi)
