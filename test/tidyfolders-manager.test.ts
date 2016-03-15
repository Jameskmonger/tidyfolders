///<reference path="../typings/main.d.ts"/>

import { TidyFoldersManager } from 'tidyfolders/tidyfolders-manager';

import * as test from 'tape';

test('it throws Error if undefined fileSystem', t => {
    t.plan(1);

    let providedFileSystem = undefined;

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem)
    }, "Error: Dependency 'fileSystem' was null or undefined.");
});

test('it throws Error if null fileSystem', t => {
    t.plan(1);

    let providedFileSystem = null;

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem)
    }, "Error: Dependency 'fileSystem' was null or undefined.");
});
