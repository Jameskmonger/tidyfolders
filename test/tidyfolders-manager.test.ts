///<reference path="../typings/main.d.ts"/>

import { IFileSystem } from 'tidyfolders/_interfaces/file-system.i';
import { TidyFoldersManager } from 'tidyfolders/tidyfolders-manager';
import { SimpleOrganizerBuilder } from './_builders/simple-organizer.builder';

import * as test from 'tape';

test('constructor', c => {

    c.test('it throws Error if undefined fileSystem', t => {
        t.plan(1);

        let fileSystem = undefined;
        let organizer = new SimpleOrganizerBuilder().build();

        t.throws(() => {
            new TidyFoldersManager(fileSystem, organizer)
        }, "Error: Dependency 'fileSystem' was null or undefined.");
    });

    c.test('it throws Error if null fileSystem', t => {
        t.plan(1);

        let fileSystem = null;
        let organizer = new SimpleOrganizerBuilder().build();

        t.throws(() => {
            new TidyFoldersManager(fileSystem, organizer)
        }, "Error: Dependency 'fileSystem' was null or undefined.");
    });

    c.test('it throws Error if undefined organizer', t => {
        t.plan(1);

        let fileSystem = <IFileSystem>{};
        let organizer = undefined;

        t.throws(() => {
            new TidyFoldersManager(fileSystem, organizer)
        }, "Error: Dependency 'organizer' was null or undefined.");
    });

    c.test('it throws Error if null fileSystem', t => {
        t.plan(1);

        let fileSystem = <IFileSystem>{};
        let organizer = null;

        t.throws(() => {
            new TidyFoldersManager(fileSystem, organizer)
        }, "Error: Dependency 'organizer' was null or undefined.");
    });
    
});
