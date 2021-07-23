import * as express from 'express';

import * as Configs from './configs';
import * as Modules from './modules';

const map = new Map<{ path: string; routes: string[]; }, any>([
    [Configs.FSConfig, new Modules.FSModule()],
    [Configs.PathConfig, new Modules.PathModule()]
]);
const port = 7010;

const app = express();
app.use(express.json());
for (const [config, module] of map.entries()) {
    const path = config.path;
    for (const route of config.routes) {
        app.options(`/${path}/${route}`, async (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
            res.send();
            console.log(`${req.method}: /${path}/${route}`);
        });
        app.get(`/${path}/${route}`, async (req, res) => {
            const args = req.query?.args ? JSON.parse(req.query.args as string) : [];
            module[route](...args).then((response) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200);
                (response !== null && response !== undefined) ? res.send({ args: JSON.stringify(response) }) : res.send();
                console.log(`${req.method}: /${path}/${route}`, args, response);
            }).catch((error) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(500);
                (error !== null && error !== undefined) ? res.send(error) : res.send();
                console.error(`${req.method}: /${path}/${route}`, args, error);
            });
        });
        app.post(`/${path}/${route}`, async (req, res) => {
            const args = req.body?.params?.args || [];
            module[route](...args).then((response) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200);
                (response !== null && response !== undefined) ? res.send({ args: response }) : res.send();
                console.log(`${req.method}: /${path}/${route}`, args, response);
            }).catch((error) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(500);
                (error !== null && error !== undefined) ? res.send(error) : res.send();
                console.error(`${req.method}: /${path}/${route}`, args, error);
            });
        });
    }
}
app.listen(port, (...args) => {
    return console.log(`@node-cs/server started on port ${port}`, ...args);
});
