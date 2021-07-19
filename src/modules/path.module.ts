import * as _path_ from 'path';

export class PathModule {

    public async delimiter(type: PlatformPathType): Promise<string> {
        return this.getPlatformPath(type).delimiter;
    }

    public async sep(type: PlatformPathType): Promise<string> {
        return this.getPlatformPath(type).sep;
    }

    public async basename(type: PlatformPathType, p: string, ext?: string): Promise<string> {
        return this.getPlatformPath(type).basename(p, ext);
    }

    public async dirname(type: PlatformPathType, p: string): Promise<string> {
        return this.getPlatformPath(type).dirname(p);
    }

    public async extname(type: PlatformPathType, p: string): Promise<string> {
        return this.getPlatformPath(type).extname(p);
    }

    public async format(type: PlatformPathType, pP: FormatInputPathObject): Promise<string> {
        return this.getPlatformPath(type).format(pP);
    }

    public async isAbsolute(type: PlatformPathType, p: string): Promise<boolean> {
        return this.getPlatformPath(type).isAbsolute(p);
    }

    public async join(type: PlatformPathType, ...paths: string[]): Promise<string> {
        return this.getPlatformPath(type).join(...paths);
    }

    public async normalize(type: PlatformPathType, p: string): Promise<string> {
        return this.getPlatformPath(type).normalize(p);
    }

    public async parse(type: PlatformPathType, p: string): Promise<ParsedPath> {
        return this.getPlatformPath(type).parse(p);
    }

    public async relative(type: PlatformPathType, from: string, to: string): Promise<string> {
        return this.getPlatformPath(type).relative(from, to);
    }

    public async resolve(type: PlatformPathType, ...pathSegments: string[]): Promise<string> {
        return this.getPlatformPath(type).resolve(...pathSegments);
    }

    public async toNamespacedPath(type: PlatformPathType, path: string): Promise<string> {
        return this.getPlatformPath(type).toNamespacedPath(path);
    }

    //

    private getPlatformPath(type: PlatformPathType): _path_.PlatformPath {
        switch (type) {
            case 'posix': return this.getPlatformPath(type).posix;
            case 'win32': return this.getPlatformPath(type).win32;
            default: return _path_;
        }
    }

}

type PlatformPathType = 'default' | 'posix' | 'win32';

interface ParsedPath {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
}

interface FormatInputPathObject {
    root?: string | undefined;
    dir?: string | undefined;
    base?: string | undefined;
    ext?: string | undefined;
    name?: string | undefined;
}
