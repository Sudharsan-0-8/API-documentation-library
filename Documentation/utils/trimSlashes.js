
function trimSlashes(path) { 
    let size = path.length;
    let st = 0, en = size;
    while(st < size-1 && path.charAt(st) == '/')st++;
    while(en > 1 && path.charAt(en-1) == '/')en--;
    return path.substring(st, en);
}

module.exports = trimSlashes;