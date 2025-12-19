export const percent = (open, current) => {
    if (!open || !current) return null;
    let b = ((current - open) / open) * 100
    b = b.toFixed(2)
    return b
};

export const absolute = (open, current) => {
    let a = current - open
    a = a.toFixed(2)
    return a;
};