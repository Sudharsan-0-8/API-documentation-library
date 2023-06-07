const path = require('path');

const express = require('express');

const { Documentation } = require('../index.js');

// const { halo } = require('../../ExpressRouteModule');

const PORT = 4000;

const app = express();

app.get('/hi', (req,res) => {
    res.end('hiii');
})

var userRouter = express.Router();
// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var itemRouter = express.Router({mergeParams: true});

// you can nest routers by attaching them as middleware:
userRouter.use('/:userId/items', itemRouter);

userRouter.route('/')
    .get(function (req, res) {
        res.status(200)
            .send('hello users');
    });

userRouter.route('/:userId')
    .get(function (req, res) {
        res.status(200)
            .send('hello user ' + req.params.userId);
    });

itemRouter.route('/')
    .get(function (req, res) {
        res.status(200)
            .send('hello items from user ' + req.params.userId);
    });

itemRouter.route('/:itemId')
    .get(function (req, res) {
        res.status(200)
            .send('hello item ' + req.params.itemId + ' from user ' + req.params.userId);
    });

app.use('/user', userRouter);
app.use('/:userId/items', itemRouter);

const documentation = new Documentation({ app, absolutePathToJson: path.resolve('./abc.json') });

app.listen(PORT, () => {
    documentation.documenteRoutes();
    console.log(`server started at port: ${PORT}`);
})

// console.log(app._router.stack);

// const j = { 
//     // halo: 'halo'
// };

// console.log(j['halo']);

// const paths = app._router.stack.slice(2);

// console.log(paths[1]);
// console.log(paths[1].handle);
// console.log(paths[1].handle.stack);


function getPathsFromLayer({ layer, nestedRouteNumber, levelOfStack }) {
    
    if(!layer) return [];

    if(layer.name == 'bound dispatch') {
        if(layer.route) {
            return [layer.route.path];
        }
    }

    if(layer.name == 'router') {
        const route = `/route${levelOfStack}.${nestedRouteNumber}`;
        const paths = getPathsFromStack({ stack: layer.handle.stack, level: levelOfStack });
        return paths.map((path) => {
            return route+path;
        });
    }

    return [];
    
}

function getPathsFromStack({ stack, level }) {

    const res = [];
    let nestedRouteCount = 0;

    for(let index in stack) {
        if(stack[index].name == 'router')nestedRouteCount++;
        const paths = getPathsFromLayer({ 
            layer: stack[index], 
            nestedRouteNumber: nestedRouteCount,
            levelOfStack: level+1,
        } );
        if(paths)res.push(...paths);
    }

    return res;
}

// const ans = getPathsFromStack({ stack: app._router.stack, level: 0 });

// console.log(ans);

function trimSlashes(path) { 
    let size = path.length;
    let st = 0, en = size;
    while(st < size-1 && path.charAt(st) == '/')st++;
    while(en > 1 && path.charAt(en-1) == '/')en--;
    return path.substring(st, en);
}

// const allPathsAsString = getPathsFromStack({ stack: app._router.stack, level: 0 });

// const allPathsAsArray = allPathsAsString.map((path) => {
//     path = trimSlashes(path);
//     return [ '/', ...path.split('/') ];
// })

// console.log(allPathsAsArray);

// console.log(addAppRoutes({ app }));


// console.log(Object.keys(require('./abc.json')));


