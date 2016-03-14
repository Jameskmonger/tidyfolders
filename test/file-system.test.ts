///<reference path="../typings/main.d.ts"/>

import * as test from 'tape';
import * as proxyquire from 'proxyquire';

test('it should call fs.readdirSync for path /', t => {
    t.plan(1);

    let nodeFsStub = {
        testMethod: () => {
            console.log('test proxyquire');
        }
    };

    let FileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

    let fileSystem = new FileSystem();
    fileSystem.getAllDirectories('/');

    t.equal(5, 5);
});
