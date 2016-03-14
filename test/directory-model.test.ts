///<reference path="../typings/main.d.ts"/>

import { DirectoryModel } from 'tidyfolders/directory-model';

import * as test from 'tape';

test('stores name \'james\' from constructor', t => {
    let providedName = 'james';

    let model = new DirectoryModel(providedName);

    t.equal(model.getName(), providedName);
});
