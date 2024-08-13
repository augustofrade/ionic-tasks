import { FilterOptions } from "../types/types";

export function filterArray<T>(data: T[], filter: FilterOptions<T>): T[] {
    const parsedFilter = Object.entries(filter);
    return data.filter(item => {
        let isItemValid = true;
        for(const [key, value] of parsedFilter) {
            if(!isItemValid) break;

            const valueOfKey = item[key as keyof T]
            
            const filterFunction: Function = typeof value == "function" ? value as any : () => valueOfKey === value;
            isItemValid = filterFunction(valueOfKey);
        };
        return isItemValid;
    });
}