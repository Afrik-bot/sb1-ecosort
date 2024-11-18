import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import './app.css';

// Controls react-nativescript log verbosity
Object.defineProperty(global, '__DEV__', { value: true });

ReactNativeScript.start(React.createElement(MainStack, {}, null));