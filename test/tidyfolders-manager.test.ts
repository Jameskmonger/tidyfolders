///<reference path="../typings/main.d.ts"/>

import { IFileSystem } from 'tidyfolders/_interfaces/file-system.i';
import { DirectoryModel} from 'tidyfolders/directory-model';
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

test('organizeDirectory', o => {

    o.test('it throws Error if undefined path', t => {
        t.plan(1);

        let fileSystem = <IFileSystem>{};
        let organizer = new SimpleOrganizerBuilder().build();

        let manager = new TidyFoldersManager(fileSystem, organizer);

        let providedPath = undefined;

        t.throws(() => {
            manager.organizeDirectory(providedPath);
        }, "Error: path cannot be null or undefined");
    });

    o.test('it throws Error if null path', t => {
        t.plan(1);

        let fileSystem = <IFileSystem>{};
        let organizer = new SimpleOrganizerBuilder().build();

        let manager = new TidyFoldersManager(fileSystem, organizer);

        let providedPath = null;

        t.throws(() => {
            manager.organizeDirectory(providedPath);
        }, "Error: path cannot be null or undefined");
    });

    o.test('it gets directories from injected file system', t => {
        t.plan(1);

        let fileSystem = <IFileSystem>{
            getAllDirectories: () => {
                t.pass();
                return [];
            }
        };
        let organizer = new SimpleOrganizerBuilder().build();

        let manager = new TidyFoldersManager(fileSystem, organizer);

        manager.organizeDirectory('/');
        t.end();
    });

    o.test('it gets directories from injected file system for path /', t => {
        t.plan(1);

        let providedPath = '/';

        let fileSystem = <IFileSystem>{
            getAllDirectories: (path: string) => {
                if (path === providedPath) {
                    t.pass();
                }
                return [];
            }
        };
        let organizer = new SimpleOrganizerBuilder().build();

        let manager = new TidyFoldersManager(fileSystem, organizer);

        manager.organizeDirectory(providedPath);
        t.end();
    });

    o.test('it gets directories from injected file system for path /some-directory/', t => {
        t.plan(1);

        let providedPath = '/some-directory/';

        let fileSystem = <IFileSystem>{
            getAllDirectories: (path: string) => {
                if (path === providedPath) {
                    t.pass();
                }
                return [];
            }
        };
        let organizer = new SimpleOrganizerBuilder().build();

        let manager = new TidyFoldersManager(fileSystem, organizer);

        manager.organizeDirectory(providedPath);
        t.end();
    });

    o.test('it passes first DirectoryModel into organizer', t => {
        t.plan(1);

        let firstModel = new DirectoryModel('firstModelName');
        let secondModel = new DirectoryModel('secondModelName');

        let fileSystem = <IFileSystem>{
            getAllDirectories: () => {
                return [ firstModel, secondModel ];
            }
        };
        let organizer = new SimpleOrganizerBuilder().build();
        organizer.getContainingDirectory = (model: DirectoryModel) => {
            if (model === firstModel) {
                t.pass('organizer called with first model');
            }
            return '';
        }

        let manager = new TidyFoldersManager(fileSystem, organizer);

        manager.organizeDirectory('');
        t.end();
    });

    o.test('it passes second DirectoryModel into organizer', t => {
        t.plan(1);

        let firstModel = new DirectoryModel('firstModelName');
        let secondModel = new DirectoryModel('secondModelName');

        let fileSystem = <IFileSystem>{
            getAllDirectories: () => {
                return [ firstModel, secondModel ];
            }
        };
        let organizer = new SimpleOrganizerBuilder().build();
        organizer.getContainingDirectory = (model: DirectoryModel) => {
            if (model === secondModel) {
                t.pass('organizer called with second model');
            }
            return '';
        }

        let manager = new TidyFoldersManager(fileSystem, organizer);

        manager.organizeDirectory('');
        t.end();
    });

});
