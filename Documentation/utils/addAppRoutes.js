const RouteTree = require('../../RouteTree/RouteTree.js');
const insertPath = require('../../RouteTree/utils/insert.js');

const getPathsFromStack = require('./getPathsFromStack.js');
const trimSlashes = require('./trimSlashes.js');


function addAppRoutes({ app, root }) {

    if(!app) {
        throw new Error(`app should not be null`);
    }

    if(app._router == null) {
        return {};
    }

    const stack = app._router.stack;

    if(stack.length === 0) {
        return {};
    }
    
    const allPathsAsString = getPathsFromStack({ stack, level: 0 });

    const allPathsAsArray = allPathsAsString.map((path) => {
        path = trimSlashes(path);
        return [ '/', ...path.split('/') ];
    })

    if(!root) {
        root = new RouteTree({ route: '/', path: '/', meathod: 'get' });
    }

    for(let index in allPathsAsArray) {
        insertPath({ root, routes: allPathsAsArray[index].slice(1) });
    }

    return root;

}

module.exports = addAppRoutes;