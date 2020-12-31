export function shouldNotHappen(functionName: string) {
    return () => {
        throw new Error(`${functionName} not defined in time`);
    };
}
