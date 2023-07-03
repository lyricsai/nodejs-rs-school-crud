export const handleError = (
    status: number = 404,
    res: any,
    message: string = "Data not found"
) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(message));
};
