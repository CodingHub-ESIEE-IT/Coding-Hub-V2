export const truncate = (str: string) => {
    if (str.length > 20) {
        return str.substring(0, 60) + (str.length > 60 ? '...' : '');
    }
    return str;
};