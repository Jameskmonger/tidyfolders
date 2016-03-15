///<reference path="../typings/main.d.ts"/>

import { TidyFoldersManager } from 'tidyfolders/tidyfolders-manager';
import { SimpleOrganizerBuilder } from './_builders/simple-organizer.builder';

import * as test from 'tape';

test('it throws Error if undefined fileSystem', t => {
    t.plan(1);

    let providedFileSystem = undefined;
    let organizer = new SimpleOrganizerBuilder().build();

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem, organizer)
    }, "Error: Dependency 'fileSystem' was null or undefined.");
});

test('it throws Error if null fileSystem', t => {
    t.plan(1);

    let providedFileSystem = null;
    let organizer = new SimpleOrganizerBuilder().build();

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem, organizer)
    }, "Error: Dependency 'fileSystem' was null or undefined.");
});
