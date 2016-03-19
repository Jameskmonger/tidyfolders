///<reference path="../typings/main.d.ts"/>

import { DirectoryModel } from 'tidyfolders/src/directory-model';

import * as test from 'tape';
import * as proxyquire from 'proxyquire';
import { DirectoryModelBuilder } from './_builders/directory-model.builder';

test('FileSystem', p => {

    let moveDirStub = (target: string, into: string) => { };

    p.test('constructor', c => {

        let FileSystem = require('tidyfolders/src/file-system').FileSystem;

        c.test('should throw exception if moveDir is null', t => {
            t.plan(1);

            let moveDir = null;

            t.throws(() => {
                new FileSystem(moveDir)
            }, "Error: Dependency 'moveDir' was null or undefined.");
        });

        c.test('should throw exception if moveDir is undefined', t => {
            t.plan(1);

            let moveDir = undefined;

            t.throws(() => {
                new FileSystem(moveDir)
            }, "Error: Dependency 'moveDir' was null or undefined.");
        });

    });

    p.test('moveDirectory', c => {

        let FileSystem = require('tidyfolders/src/file-system').FileSystem;

        c.test('should call into injected moveDir function', t => {
            t.plan(1);

            let moveDir = (target: string, into: string) => {
                t.pass('moveDir called');
            };

            let model = new DirectoryModelBuilder().withName('model').build();
            let fileSystem = new FileSystem(moveDir);

            fileSystem.moveDirectory(model, 'm');
        });

        c.test('should call into injected moveDir function with correct target when model called "model"', t => {
            t.plan(1);

            let directoryName = 'model';

            let moveDir = (target: string, into: string) => {
                if (target === directoryName) {
                    t.pass('moveDir called with correct target');
                }
            };

            let model = new DirectoryModelBuilder().withName(directoryName).build();
            let fileSystem = new FileSystem(moveDir);

            fileSystem.moveDirectory(model, 'm');
        });

        c.test('should call into injected moveDir function with correct target when model called "anotherModel"', t => {
            t.plan(1);

            let directoryName = 'anotherModel';

            let moveDir = (target: string, into: string) => {
                if (target === directoryName) {
                    t.pass('moveDir called with correct target');
                }
            };

            let model = new DirectoryModelBuilder().withName(directoryName).build();
            let fileSystem = new FileSystem(moveDir);

            fileSystem.moveDirectory(model, 'a');
        });

        c.test('should call into injected moveDir function with correct into when told to move into "a"', t => {
            t.plan(1);

            let containingFolder = 'a';

            let moveDir = (target: string, into: string) => {
                if (into === containingFolder) {
                    t.pass('moveDir called with correct containing folder');
                }
            };

            let model = new DirectoryModelBuilder().withName('test-model').build();
            let fileSystem = new FileSystem(moveDir);

            fileSystem.moveDirectory(model, containingFolder);
        });

        c.test('should call into injected moveDir function with correct into when told to move into "z"', t => {
            t.plan(1);

            let containingFolder = 'z';

            let moveDir = (target: string, into: string) => {
                if (into === containingFolder) {
                    t.pass('moveDir called with correct containing folder');
                }
            };

            let model = new DirectoryModelBuilder().withName('test-model').build();
            let fileSystem = new FileSystem(moveDir);

            fileSystem.moveDirectory(model, containingFolder);
        });

    });

    p.test('getAllDirectories', o => {

        o.test('should call fs.readdirSync for path /', t => {
            t.plan(1);

            let givenDirectory = '/';

            let nodeFsStub = {
                readdirSync: (path: string) => {
                    t.pass('calls readdirSync');
                    return [];
                }
            };

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            fileSystem.getAllDirectories(givenDirectory);
        });

        o.test('should call fs.readdirSync with correct path for path /', t => {
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

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            fileSystem.getAllDirectories(givenDirectory);
        });

        o.test('should call fs.readdirSync with correct path for path /users/test/', t => {
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

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            fileSystem.getAllDirectories(givenDirectory);
        });

        o.test('should call fs.readdirSync with correct path for path /dev/media/another/subfolder/this/is/quite/deep/', t => {
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

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            fileSystem.getAllDirectories(givenDirectory);
        });

        o.test('should filter the results of readdirSync', t => {
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

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            fileSystem.getAllDirectories('/');
        });

        o.test('should return only directories', t => {
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

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            let returnedDirectories: Array<DirectoryModel> = fileSystem.getAllDirectories('');
            let returnedDirectoriesNames = returnedDirectories.map(d => d.getName());

            for (let i = 0; i < directories.length; i++) {
                t.equal(returnedDirectoriesNames[i], directories[i]);
            }
        });

        o.test('should get stats for path/file', t => {
            t.plan(1);

            let basePath = 'path'
            let firstDirectory = 'file';
            let directories = [firstDirectory];

            let expectedPath = `${basePath}/${firstDirectory}`;

            let nodeFsStub = {
                readdirSync: (path: string) => directories,
                statSync: (path: string) => {
                    if (path === expectedPath) {
                        t.pass('gets stats for correct full path');
                    }

                    return {
                        isDirectory: () => true
                    }
                }
            };

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            fileSystem.getAllDirectories(basePath);
            t.end();
        });

        o.test('should get stats for basePath/newFile', t => {
            t.plan(1);

            let basePath = 'basePath'
            let firstDirectory = 'newFile';
            let directories = [firstDirectory];

            let expectedPath = `${basePath}/${firstDirectory}`;

            let nodeFsStub = {
                readdirSync: (path: string) => directories,
                statSync: (path: string) => {
                    if (path === expectedPath) {
                        t.pass('gets stats for correct full path');
                    }

                    return {
                        isDirectory: () => true
                    }
                }
            };

            let FileSystem = proxyquire('tidyfolders/src/file-system', {'fs': nodeFsStub}).FileSystem;

            let fileSystem = new FileSystem(moveDirStub);
            fileSystem.getAllDirectories(basePath);
            t.end();
        });

    });

});
