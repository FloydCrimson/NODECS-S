import * as _path_ from 'path';

export class PathModule {

    // PROPERTIES

    public async delimiter(p: string): Promise<string> {
        return _path_.delimiter;
    }

    public async posix(p: string): Promise<_path_.PlatformPath> {
        return _path_.posix;
    }

    public async sep(p: string): Promise<string> {
        return _path_.sep;
    }

    public async win32(p: string): Promise<_path_.PlatformPath> {
        return _path_.win32;
    }

    // FUNCTIONS

    public async basename(p: string, ext?: string): Promise<string> {
        return _path_.basename(p, ext);
    }

    public async dirname(p: string): Promise<string> {
        return _path_.dirname(p);
    }

    public async extname(p: string): Promise<string> {
        return _path_.extname(p);
    }

    public async format(pP: _path_.FormatInputPathObject): Promise<string> {
        return _path_.format(pP);
    }

    public async isAbsolute(p: string): Promise<boolean> {
        return _path_.isAbsolute(p);
    }

    public async join(...paths: string[]): Promise<string> {
        return _path_.join(...paths);
    }

    public async normalize(p: string): Promise<string> {
        return _path_.normalize(p);
    }

    public async parse(p: string): Promise<_path_.ParsedPath> {
        return _path_.parse(p);
    }

    public async relative(from: string, to: string): Promise<string> {
        return _path_.relative(from, to);
    }

    public async resolve(...pathSegments: string[]): Promise<string> {
        return _path_.resolve(...pathSegments);
    }

    public async toNamespacedPath(path: string): Promise<string> {
        return _path_.toNamespacedPath(path);
    }

}
