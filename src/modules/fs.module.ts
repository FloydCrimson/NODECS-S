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

    public async lstat(path: _fs_.PathLike, options: _fs_.StatOptions | undefined) {
        return new Promise<[NodeJS.ErrnoException | null, Transformer<_fs_.Stats | _fs_.BigIntStats>]>((resolve) => _fs_.lstat(path, options, async (err: NodeJS.ErrnoException | null, stats: _fs_.Stats | _fs_.BigIntStats) => resolve([err, await FSModule.StatsTransformer(stats)])));
    }

    public async readdir(path: _fs_.PathLike, options: { encoding: BufferEncoding | null; } | BufferEncoding | undefined | null) {
        return new Promise<[NodeJS.ErrnoException | null, string[]]>((resolve) => _fs_.readdir(path, options, (err: NodeJS.ErrnoException | null, files: string[]) => resolve([err, files])));
    }

    // HELP

    private static async StatsTransformer(stats: _fs_.Stats | _fs_.BigIntStats) {
        return FSModule.Cleaner<_fs_.Stats | _fs_.BigIntStats>(stats, ['_checkModeProperty']);
    }

    private static async Cleaner<T, K extends keyof T = never>(input: T, keys: (keyof any)[] = []): Promise<Transformer<T, K>> {
        const output = new Object() as unknown;
        for (const key in input) {
            if (!keys.includes(key)) {
                if (typeof input[key] === 'function') {
                    try {
                        const result = (input[key] as unknown as <I = any>() => Promise<I> | I)();
                        const isPromise = typeof result === 'object' && result[key]['then'] === 'function';
                        output[key] = (isPromise ? await (result as Promise<[any, any]>).then((r) => [r, null]).catch((e) => [null, e]) : [result, null]) as unknown as any;
                    } catch (error) {
                        output[key] = [null, error] as unknown as any;
                    }
                } else {
                    output[key] = input[key];
                }
            }
        }
        return output as Transformer<T, K>;
    }

}

type Transformer<T, K extends keyof T = never> = { [KT in Exclude<keyof T, K>]: T[KT] extends () => Promise<infer I> | infer I ? [I, any] : never };
