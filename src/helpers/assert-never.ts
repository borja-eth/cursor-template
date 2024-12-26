export const assertNever = (obj: never): never => {
    throw new Error(`Unexpected object ${JSON.stringify(obj)}`);
};
