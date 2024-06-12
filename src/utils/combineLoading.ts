/**
 * Combine multiple loading states into one
 * @param args boolean array
 * @returns boolean
 */
export const combineLoading = (...args: boolean[]) => args.some((arg) => arg);
