const fs = require('fs');
const path = require('path');

const updateEndPoint = require('../RouteTree/utils/updateEndPoint.js');
const getJsonObj = require('./utils/getJsonObj.js');

class Documentation {
    
    constructor({ app, absolutePathToJson }) {

        if(!app) {
            throw new Error('express app cannot be null');
        }

        if(absolutePathToJson == '') {
            throw new Error('path to json cannot be empty');
        }

        this.app = app;
        this.absolutePathToJson = absolutePathToJson;

        app.set('view engine', 'ejs');
        app.get('/express-documentation', (req, res) => {
            console.log(req);
            res.render(path.resolve('../pages/index.ejs'), { data: { root: this.root } });
        });

    }

    writeJson() {
        fs.writeFile(this.absolutePathToJson, JSON.stringify(this.root, null, 4), (err) => {
            if(err) throw err;
        }) 
    }

    updateRoute({ route, updation }) {
        updateEndPoint({ root: route, updation })
        this.writeJson();
    }

    renameNestedRoute({ parent, from, to }) {

        if(parent[from] && !parent[to]) {
            parent[to] = parent[from];
            parent[from] = null;
        }

        if(parent[to]) {
            throw new Error(`${parent[to].path} already exist`);
        }

        if(!parent[from]) {
            throw new Error(`${from} not exists`);
        }
        
        parent[to].isRenamed = true;

    }

    documenteRoutes() {
        this.root = getJsonObj({ app: this.app, pathToJson: this.absolutePathToJson });
        this.writeJson();
    }
}

module.exports = Documentation;