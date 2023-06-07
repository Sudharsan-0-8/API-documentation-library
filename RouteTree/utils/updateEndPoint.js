
function updateEndPoint({ root, updation }) {
    if(!root) {
        throw new Error('no such end point');
    }

    root.description = updation.description;
}

module.exports = updateEndPoint;
