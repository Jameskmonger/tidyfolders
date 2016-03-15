///<reference path="../typings/main.d.ts"/>

import { TidyFoldersManager } from 'tidyfolders/tidyfolders-manager';

import * as test from 'tape';

test('it throws Error if undefined fileSystem', t => {
    t.plan(1);

    let providedFileSystem = undefined;

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem)
    }, /^Error: This is my error message.$/);
});

test('it throws Error if null fileSystem', t => {
    t.plan(1);

    let providedFileSystem = null;

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem)
    }, /^Error: This is my error message.$/);
});
