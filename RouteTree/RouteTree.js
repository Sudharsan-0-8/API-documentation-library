class RouteTree {

    constructor({ route, path, meathod, isEndPoint, isRootOfNestedRoute, regexp }) {
        this.route = route;
        this.path = path;
        this.meathod = meathod;
        this.description = '';
        this.isEndPoint = (isEndPoint==null) ? false : isEndPoint;
        this.isRootOfNestedRoute = (isRootOfNestedRoute==null) ? false : isRootOfNestedRoute;
        if(this.isRootOfNestedRoute) {
            this.isRenamed = false;
            this.regexp = regexp;
        }
        this.next = {}
    }

}

module.exports = RouteTree;