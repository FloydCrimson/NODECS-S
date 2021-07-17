import * as _fs_ from 'fs';

export class FSModule {

    // PROPERTIES

    // FUNCTIONS

    public async access(path: _fs_.PathLike, mode: number | undefined) {
        return new Promise<[NodeJS.ErrnoException]>((resolve) => _fs_.access(path, mode, (err: NodeJS.ErrnoException) => resolve([err])));
    }

    public async appendFile(file: _fs_.PathOrFileDescriptor, data: string | Uint8Array, options: _fs_.WriteFileOptions) {
        return new Promise<[NodeJS.ErrnoException]>((resolve) => _fs_.appendFile(file, data, options, (err: NodeJS.ErrnoException) => resolve([err])));
    }

    public async chmod(path: _fs_.PathLike, mode: _fs_.Mode) {
        return new Promise<[NodeJS.ErrnoException]>((resolve) => _fs_.chmod(path, mode, (err: NodeJS.ErrnoException) => resolve([err])));
    }

    public async chown(path: _fs_.PathLike, uid: number, gid: number) {
        return new Promise<[NodeJS.ErrnoException]>((resolve) => _fs_.chown(path, uid, gid, (err: NodeJS.ErrnoException) => resolve([err])));
    }

    // ...

    public async readdir(path: _fs_.PathLike, options: { encoding: BufferEncoding | null; withFileTypes?: false | undefined } | BufferEncoding | undefined | null) {
        return new Promise<[NodeJS.ErrnoException | null, string[]]>((resolve) => _fs_.readdir(path, options, (err: NodeJS.ErrnoException | null, files: string[]) => resolve([err, files])));
    }

}
