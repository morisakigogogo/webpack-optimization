import React from 'react';
import { render } from 'react-dom';
import './index.css';
import $ from 'jquery';
import { minus, plus } from './calc';
import test from './test';

console.log($);

console.log(minus(4,2));

render(<h1 className="color1">Hello world</h1>,document.getElementById('root'));