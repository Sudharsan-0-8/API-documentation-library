
function getPathsFromStack({ stack, level }) {
    
    if(!Array.isArray(stack)) {
        return [];
    }

    const result = [];
    let nestedRouteCount = 0;

    for(let index in stack) {

        if(stack[index].name == 'router') nestedRouteCount++;

        const paths = getPathsFromLayer({ 
            layer: stack[index], 
            nestedRouteNumber: nestedRouteCount,
            levelOfStack: level+1,
        } );

        if(paths)result.push(...paths);

    }

    return result;
}

function getPathsFromLayer({ layer, nestedRouteNumber, levelOfStack }) {
    
    if(!layer) return [];

    if(layer.name == 'bound dispatch') {
        if(layer.route) {
            return [layer.route.path];
        }
    }

    if(layer.name == 'router') {
        const route = `/nested-route-${levelOfStack}.${nestedRouteNumber}`;

        const paths = getPathsFromStack({ stack: layer.handle.stack, level: levelOfStack });
        
        return paths.map((path) => {
            return route + path;
        });
    }

    return [];

}

module.exports = getPathsFromStack;
