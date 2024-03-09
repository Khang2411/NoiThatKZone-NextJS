export function truncate(str: string, max: number) {
    if (str) {
        return str.length > max ? str.substr(0, max - 1) + '…' : str;
    }
}