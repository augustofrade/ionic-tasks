export type FilterOptions<T> = {
    [P in keyof T]?: T[P] | ( (objectValue: T[P]) => boolean )
}