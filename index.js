// const RouteTree = require('./RouteTree/RouteTree.js');
// const InsertPath = require('./RouteTree/utils/insert.js');
// const FindPath = require('./RouteTree/utils/find.js');

const addAppRoutes = require('./Documentation/utils/addAppRoutes.js');
const Documentation = require('./Documentation/Documentation.js');

// const root = new RouteTree({ route: '/', path: '/', meathod: 'get' })

// InsertPath({ root, routes: ['first', 'second', 'third', 'fourth'], path: '/' });

// console.log(root);

// console.log(FindPath({ root, routes: ['first', 'second', 'third', 'fourth'] }))

module.exports = {
    halo: 'halo',
    addAppRoutes,
    Documentation,
}