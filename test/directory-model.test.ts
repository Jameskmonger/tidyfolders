///<reference path="../typings/main.d.ts"/>

import { DirectoryModel } from 'tidyfolders/src/directory-model';

import * as test from 'tape';

test('stores name \'james\' from constructor', t => {
    t.plan(1);

    let providedName = 'james';

    let model = new DirectoryModel(providedName);

    t.equal(model.getName(), providedName);
});

test('stores name \'j\' from constructor', t => {
    t.plan(1);

    let providedName = 'j';

    let model = new DirectoryModel(providedName);

    t.equal(model.getName(), providedName);
});

test('stores name \'Samantha\' from constructor', t => {
    t.plan(1);

    let providedName = 'Samantha';

    let model = new DirectoryModel(providedName);

    t.equal(model.getName(), providedName);
});

test('stores name \'Toby\' from constructor', t => {
    t.plan(1);

    let providedName = 'Toby';

    let model = new DirectoryModel(providedName);

    t.equal(model.getName(), providedName);
});
