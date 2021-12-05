export const parseBingoNumbers = (input: string): string[] => {
    return input.substring(0, input.indexOf('\n')).split(',');
}

export const parseBingoBoards = (input: string): string[] => {
    // +2 to the index because we need to account for the \n\n.
    const boards = input.substring(input.indexOf('\n\n')+2);
    return boards.split('\n\n');
}