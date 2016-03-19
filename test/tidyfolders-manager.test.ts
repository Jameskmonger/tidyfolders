///<reference path="../typings/main.d.ts"/>

import { IFileSystem } from 'tidyfolders/_interfaces/file-system.i';
import { DirectoryModel} from 'tidyfolders/directory-model';
import { TidyFoldersManager } from 'tidyfolders/tidyfolders-manager';
import { SimpleOrganizerBuilder } from './_builders/simple-organizer.builder';

import * as test from 'tape';

test('TidyFoldersManager', p => {

    p.test('constructor', c => {

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

    p.test('organizeDirectory', o => {

        let callbackStub = () => {};

        o.test('it throws Error if undefined path', t => {
            t.plan(1);

            let fileSystem = <IFileSystem>{};
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            let providedPath = undefined;

            t.throws(() => {
                manager.organizeDirectory(providedPath, callbackStub);
            }, "Error: path cannot be null or undefined");
        });

        o.test('it throws Error if null path', t => {
            t.plan(1);

            let fileSystem = <IFileSystem>{};
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            let providedPath = null;

            t.throws(() => {
                manager.organizeDirectory(providedPath, callbackStub);
            }, "Error: path cannot be null or undefined");
        });

        o.test('it gets directories from injected file system', t => {
            t.plan(1);

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    t.pass('called getAllDirectories');
                    return [];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {

                }
            };
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('/', callbackStub);
            t.end();
        });

        o.test('it gets directories from injected file system for path /', t => {
            t.plan(1);

            let providedPath = '/';

            let fileSystem = <IFileSystem>{
                getAllDirectories: (path: string) => {
                    if (path === providedPath) {
                        t.pass('called getAllDirectories with correct path');
                    }
                    return [];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {

                }
            };
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory(providedPath, callbackStub);
            t.end();
        });

        o.test('it gets directories from injected file system for path /some-directory/', t => {
            t.plan(1);

            let providedPath = '/some-directory/';

            let fileSystem = <IFileSystem>{
                getAllDirectories: (path: string) => {
                    if (path === providedPath) {
                        t.pass('called getAllDirectories with correct path');
                    }
                    return [];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {

                }
            };
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory(providedPath, callbackStub);
            t.end();
        });

        o.test('it passes first DirectoryModel into organizer', t => {
            t.plan(1);

            let firstModel = new DirectoryModel('firstModelName');
            let secondModel = new DirectoryModel('secondModelName');

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ firstModel, secondModel ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {

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

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it passes second DirectoryModel into organizer', t => {
            t.plan(1);

            let firstModel = new DirectoryModel('firstModelName');
            let secondModel = new DirectoryModel('secondModelName');

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ firstModel, secondModel ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {

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

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it moves a directory', t => {
            t.plan(1);

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ new DirectoryModel('firstModelName') ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    t.pass('moveDirectory called');
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it moves the first directory model', t => {
            t.plan(1);

            let firstModel = new DirectoryModel('firstModelName');
            let secondModel = new DirectoryModel('secondModelName');

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ firstModel, secondModel ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    if (target === firstModel) {
                        t.pass('moveDirectory called with the first model');
                    }
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it moves the second directory model', t => {
            t.plan(1);

            let firstModel = new DirectoryModel('firstModelName');
            let secondModel = new DirectoryModel('secondModelName');

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ firstModel, secondModel ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    if (target === secondModel) {
                        t.pass('moveDirectory called with the second model');
                    }
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it moves a directory to folder "a" when organizer returns "a"', t => {
            t.plan(1);

            let organizerReturn = 'a';

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ new DirectoryModel('firstModelName') ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    if (into === organizerReturn) {
                        t.pass('moveDirectory called with return from organizer');
                    }
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();
            organizer.getContainingDirectory = (model: DirectoryModel) => organizerReturn;

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it moves a directory to folder "fakedir" when organizer returns "fakedir"', t => {
            t.plan(1);

            let organizerReturn = 'fakedir';

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ new DirectoryModel('firstModelName') ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    if (into === organizerReturn) {
                        t.pass('moveDirectory called with return from organizer');
                    }
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();
            organizer.getContainingDirectory = (model: DirectoryModel) => organizerReturn;

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it does not move directory if it is a containing directory (called "a")', t => {
            t.plan(0);

            let organizerReturn = 'a';

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ new DirectoryModel(organizerReturn) ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    t.fail('moveDirectory should not have been called');
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();
            organizer.getContainingDirectory = (model: DirectoryModel) => organizerReturn;

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it does not move directory if it is a containing directory (called "b")', t => {
            t.plan(0);

            let organizerReturn = 'b';

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ new DirectoryModel(organizerReturn) ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    t.fail('moveDirectory should not have been called');
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();
            organizer.getContainingDirectory = (model: DirectoryModel) => organizerReturn;

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it does not move directory if it is a containing directory (called "random")', t => {
            t.plan(0);

            let organizerReturn = 'random';

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ new DirectoryModel(organizerReturn) ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {
                    t.fail('moveDirectory should not have been called');
                }
            };
            let organizer = new SimpleOrganizerBuilder().build();
            organizer.getContainingDirectory = (model: DirectoryModel) => organizerReturn;

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', callbackStub);
            t.end();
        });

        o.test('it should call the callback', t => {
            t.plan(1);

            let fileSystem = <IFileSystem>{
                getAllDirectories: () => {
                    return [ ];
                },
                moveDirectory: (target: DirectoryModel, into: string) => {

                }
            };
            let organizer = new SimpleOrganizerBuilder().build();

            let manager = new TidyFoldersManager(fileSystem, organizer);

            manager.organizeDirectory('', () => {
                t.pass('callback called');
            });
            t.end();
        });

    });

});
