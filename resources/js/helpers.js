export const objectMap = (obj, fn) =>
    Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );
export const modifierDecorator = (v) => v < 0 ? '-':'+'+v;

