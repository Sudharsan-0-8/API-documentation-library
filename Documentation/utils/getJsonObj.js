const fs = require('fs');

const addAppRoutes = require('./addAppRoutes.js');

function getJsonObj({ app, pathToJson }) {
    
    if(fs.existsSync(pathToJson)) {

        try {
            const json = require(pathToJson);
            if(Object.keys(json) == 0) {
                return addAppRoutes({ app });
            }
            return addAppRoutes({ app, root: json })
        } catch(e) {
            return addAppRoutes({ app });
        }

    } else {
        throw new Error(`file not exists at ${pathToJson}`);
    }

}

module.exports = getJsonObj;