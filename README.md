# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## React Native starter kit

This is simple and easy to use starter kit following are the feature used in this moulde

- Typescript
- Authentication flow
- Refresh token flow
- Is user logged in or not flow
- Built in screens
- State managment setup
- Common reusable components
- HOC components
- Some built in text input for phone number,country and cities.
- Built in fonts
- Api request flow
- Predefine hooks
- Local storage support(mmkv)
- Already define navigation flow
- TextInput validations
- Zod schema validation
- Custom eslint setup
- Predefine Modals
- Custom Error Boundary
- internationlaization i18n
- system theme managment
- dynamic header handling
- dynamic styles
- predefined industry standard folder and project structure
- svg metro bundler handling
- dynamic aspect ratio for image
- env setup
- Github actions for CI set up

## Things remaining

- Write test case for each individual component

### Note for svg?

We have used metero version of svg
https://github.com/kristerkari/react-native-svg-transformer

you need to make fill prop as empty string in order to user svg as resuasable like this:
<svg width="16" height="16" viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg">

</svg>

and when you are impoting this svg import it like this
<SVG.Add fill={COLORS.green} width={50} height={50} />

### Note?

PR are most welcome. Feel free to raise PR. make your seperate branch with proper description. if it would be a bug then it should be like bug/"your description."
