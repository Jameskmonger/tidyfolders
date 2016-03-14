///<reference path="../typings/main.d.ts"/>

import * as test from 'tape';
import * as proxyquire from 'proxyquire';

test('it should call fs.readdirSync for path /', t => {
    t.plan(1);

    let givenDirectory = '/';

    let nodeFsStub = {
        readdirSync: (path: string) => {
            t.pass('calls readdirSync');
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
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    fileSystem.getAllDirectories(givenDirectory);
});
