import * as _fs_ from 'fs';

export class FSModule {

    public async access(path: string, mode?: keyof typeof _fs_.constants) {
        return new Promise<void>((resolve, reject) => {
            _fs_.access(path, mode ? _fs_.constants[mode] : undefined, (err: NodeJS.ErrnoException) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public async lstat(path: string, options?: { bigint?: false; throwIfNoEntry?: boolean; }): Promise<Stats>;
    public async lstat(path: string, options: { bigint: true; throwIfNoEntry?: boolean; }): Promise<BigIntStats>;
    public async lstat(path: string, options?: any) {
        return new Promise<Stats | BigIntStats>((resolve, reject) => {
            _fs_.lstat(path, options, (err: NodeJS.ErrnoException | null, stats: _fs_.Stats | _fs_.BigIntStats) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.mapStatsBase(stats));
                }
            });
        });
    }

    public async readdir(path: string, options?: { encoding?: BufferEncoding; withFileTypes?: false; } | BufferEncoding): Promise<string[]>;
    public async readdir(path: string, options: { encoding?: BufferEncoding; withFileTypes: true; } | BufferEncoding): Promise<Dirent[]>;
    public async readdir(path: string, options?: any) {
        return new Promise<string[] | Dirent[]>((resolve, reject) => {
            _fs_.readdir(path, options, (err: NodeJS.ErrnoException | null, files: string[] | _fs_.Dirent[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(options?.withFileTypes ? (files as _fs_.Dirent[]).map((file) => this.mapDirent(file)) : (files as string[]));
                }
            });
        });
    }

    public async readFile(path: string, options: { encoding: BufferEncoding; flag?: string; } | string) {
        return new Promise<string>((resolve, reject) => {
            _fs_.readFile(path, options, (err: NodeJS.ErrnoException | null, data: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    public async writeFile(path: string, data: string, options: WriteFileOptions) {
        return new Promise<void>((resolve, reject) => {
            _fs_.writeFile(path, data, options, (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    //

    private mapStatsBase(stats: _fs_.Stats | _fs_.BigIntStats): Stats | BigIntStats {
        return {
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            isBlockDevice: stats.isBlockDevice(),
            isCharacterDevice: stats.isCharacterDevice(),
            isSymbolicLink: stats.isSymbolicLink(),
            isFIFO: stats.isFIFO(),
            isSocket: stats.isSocket(),
            dev: stats.dev,
            ino: stats.ino,
            mode: stats.mode,
            nlink: stats.nlink,
            uid: stats.uid,
            gid: stats.gid,
            rdev: stats.rdev,
            size: stats.size,
            blksize: stats.blksize,
            blocks: stats.blocks,
            atimeMs: stats.atimeMs,
            mtimeMs: stats.mtimeMs,
            ctimeMs: stats.ctimeMs,
            birthtimeMs: stats.birthtimeMs,
            atime: stats.atime,
            mtime: stats.mtime,
            ctime: stats.ctime,
            birthtime: stats.birthtime
        } as Stats | BigIntStats;
    }

    private mapDirent(file: _fs_.Dirent): Dirent {
        return {
            isFile: file.isFile(),
            isDirectory: file.isDirectory(),
            isBlockDevice: file.isBlockDevice(),
            isCharacterDevice: file.isCharacterDevice(),
            isSymbolicLink: file.isSymbolicLink(),
            isFIFO: file.isFIFO(),
            isSocket: file.isSocket(),
            name: file.name
        } as Dirent;
    }

}

type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'base64url' | 'latin1' | 'binary' | 'hex';

type Mode = number | string;

type WriteFileOptions = (ObjectEncodingOptions & { mode?: Mode | undefined; flag?: string | undefined; }) | string | null;

interface ObjectEncodingOptions {
    encoding?: BufferEncoding | null | undefined;
}

interface Stats extends StatsBase<number> { }

interface BigIntStats extends StatsBase<bigint> { }

interface StatsBase<T> {
    isFile: boolean;
    isDirectory: boolean;
    isBlockDevice: boolean;
    isCharacterDevice: boolean;
    isSymbolicLink: boolean;
    isFIFO: boolean;
    isSocket: boolean;
    dev: T;
    ino: T;
    mode: T;
    nlink: T;
    uid: T;
    gid: T;
    rdev: T;
    size: T;
    blksize: T;
    blocks: T;
    atimeMs: T;
    mtimeMs: T;
    ctimeMs: T;
    birthtimeMs: T;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
}

interface Dirent {
    isFile: boolean;
    isDirectory: boolean;
    isBlockDevice: boolean;
    isCharacterDevice: boolean;
    isSymbolicLink: boolean;
    isFIFO: boolean;
    isSocket: boolean;
    name: string;
}
