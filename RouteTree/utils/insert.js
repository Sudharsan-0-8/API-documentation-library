const RouteTree = require('../RouteTree.js');

function insertPath({ root, routes }) {

    if(routes.length == 0) {
        return ;
    }

    const { next } = root;
    const currRoute = routes[0];
    const pathFromRoot = root.path + currRoute + '/';

    if(next[currRoute] != undefined) {
        insertPath({ root: next[currRoute], routes: routes.slice(1) });
        return ;
    } 

    const nextRoute = new RouteTree({ 
        route: currRoute, 
        path: pathFromRoot, 
        meathod: 'get', 
        isEndPoint: (routes.length == 1),
    });

    next[currRoute] = nextRoute;
    
    insertPath({ root: nextRoute, path: pathFromRoot, routes: routes.slice(1) });
    
    return ;
}

module.exports = insertPath;