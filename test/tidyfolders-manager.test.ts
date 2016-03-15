///<reference path="../typings/main.d.ts"/>

import { IFileSystem } from 'tidyfolders/_interfaces/file-system.i';
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

test('it throws Error if undefined organizer', t => {
    t.plan(1);

    let providedFileSystem = <IFileSystem>{};
    let organizer = undefined;

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem, organizer)
    }, "Error: Dependency 'organizer' was null or undefined.");
});

test('it throws Error if null fileSystem', t => {
    t.plan(1);

    let providedFileSystem = <IFileSystem>{};
    let organizer = null;

    t.throws(() => {
        new TidyFoldersManager(providedFileSystem, organizer)
    }, "Error: Dependency 'organizer' was null or undefined.");
});
