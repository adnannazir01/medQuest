// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import {Amplify, Auth} from 'aws-amplify';
// Amplify.configure(amplifyconfig);

// AppRegistry.registerComponent(appName, () => App);

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// 1. Import Amplify and the config
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports'; // <-- Adjust this path as needed

// 2. Configure Amplify with aws-exports
Amplify.configure(awsconfig);

AppRegistry.registerComponent(appName, () => App);
