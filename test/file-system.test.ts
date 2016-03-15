///<reference path="../typings/main.d.ts"/>

import { DirectoryModel } from 'tidyfolders/directory-model';

import * as test from 'tape';
import * as proxyquire from 'proxyquire';

test('it should call fs.readdirSync for path /', t => {
    t.plan(1);

    let givenDirectory = '/';

    let nodeFsStub = {
        readdirSync: (path: string) => {
            t.pass('calls readdirSync');
            return [];
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    fileSystem.getAllDirectories(givenDirectory);
});

test('it should call fs.readdirSync with correct path for path /', t => {
    t.plan(1);

    let givenDirectory = '/';

    let nodeFsStub = {
        readdirSync: (path: string) => {
            if (path === givenDirectory) {
                t.pass('calls readdirSync with correct path');
            }
            return [];
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    fileSystem.getAllDirectories(givenDirectory);
});

test('it should call fs.readdirSync with correct path for path /users/test/', t => {
    t.plan(1);

    let givenDirectory = '/users/test/';

    let nodeFsStub = {
        readdirSync: (path: string) => {
            if (path === givenDirectory) {
                t.pass('calls readdirSync with correct path');
            }
            return [];
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    fileSystem.getAllDirectories(givenDirectory);
});

test('it should call fs.readdirSync with correct path for path /dev/media/another/subfolder/this/is/quite/deep/', t => {
    t.plan(1);

    let givenDirectory = '/dev/media/another/subfolder/this/is/quite/deep/';

    let nodeFsStub = {
        readdirSync: (path: string) => {
            if (path === givenDirectory) {
                t.pass('calls readdirSync with correct path');
            }
            return [];
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    fileSystem.getAllDirectories(givenDirectory);
});

test('it should filter the results of readdirSync', t => {
    t.plan(1);

    let nodeFsStub = {
        readdirSync: (path: string) => {
            return {
                filter: () => {
                    t.pass();
                    return [];
                }
            }
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    fileSystem.getAllDirectories('/');
});

test('it should return only directories', t => {
    let directories = ['dir1', 'another-dir', 'test'];
    t.plan(directories.length);

    let files = ['test.jpg', 'another-test.docx'];

    let nodeFsStub = {
        readdirSync: (path: string) => directories.concat(files),
        statSync: (path: string) => {
            return {
                isDirectory: () => {
                    return directories.indexOf(path) !== -1;
                }
            };
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    let returnedDirectories: Array<DirectoryModel> = fileSystem.getAllDirectories('');
    let returnedDirectoriesNames = returnedDirectories.map(d => d.getName());

    for (let i = 0; i < directories.length; i++) {
        t.equal(returnedDirectoriesNames[i], directories[i]);
    }
});
