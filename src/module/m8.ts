/// <reference path="./m7.d.ts"/>
import * as fake from 'fake';
import {fn} from 'rng';
import x, {y} from 'quick';

import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);

fake.deParse();
fake.parse('');
fn({
    a: '1',
    b: 2
});

x(y); 
const b = y;