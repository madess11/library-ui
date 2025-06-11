import { TextEncoder, TextDecoder } from 'util';
require('@testing-library/jest-dom');
require('react');

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
