
function findPath({ root, routes }) {

    if(!root) {
        return new Error('no such path exists');
    } 

    if(routes.length == 0) {
        if(!root.isEndPoint) {
            throw new Error(`${root.path} is not a end point`);
        }
        return root;
    }
    
    const { next } = root;
    const currRoute = routes[0];

    if(next[currRoute]) {
        return findPath({ root: next[currRoute], routes: routes.slice(1) });
    }

    return new Error({ message: 'no such path exists' });
}

module.exports = findPath;