export const findPaths = (connectionsMap: Map<string, string[]>, cave: string, path: string[], paths: string[][], canRevisit = false) => {
    const newPath = path.concat(cave);
    // the path has concluded. return now.
    if (cave === 'end') { 
        paths.push(newPath); 
        return;
    }

    // get the connections and go through each to find a path
    const connection = connectionsMap.get(cave);
    connection?.forEach(c => { 
        if(c === c.toUpperCase() || !newPath.includes(c)){ 
            findPaths(connectionsMap, c, newPath, paths, canRevisit);
        } else if (canRevisit && c !== 'start' && c !== 'end') {
            findPaths(connectionsMap, c, newPath, paths, false);
        }
    }) 
}