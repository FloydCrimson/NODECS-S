import * as express from 'express';

import * as Configs from './configs';
import * as Modules from './modules';

const map = new Map<{ path: string; routes: string[]; }, any>([
    [Configs.FSConfig, new Modules.FSModule()],
    [Configs.PathConfig, new Modules.PathModule()]
]);

const app = express();
const port = 7010;
for (const [config, module] of map.entries()) {
    const path = config.path;
    for (const route of config.routes) {
        app.get(`/${path}/${route}`, async (req, res) => {
            const args = req.query?.args ? JSON.parse(req.query.args as string) : [];
            module[route](...args).then((response) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200);
                response ? res.send({ args: JSON.stringify(response) }) : res.send();
                console.log(`/${path}/${route}`, args, response);
            }).catch((error) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(500);
                console.error(`/${path}/${route}`, args, error);
            });
        });
    }
}
app.listen(port, (...args) => {
    return console.log(`@node-cs/server started on port ${port}`, ...args);
});
