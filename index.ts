
class Stream<T> {
    // filter()
}

export interface IList<T> extends Iterable<T> {
    size(): number;

    add(element: T): void;

    isEmpty(): boolean;

    contains(element: T): boolean;

    remove(item: T): boolean;

    clear(): void;

    get(index: number): T;

    toArray(): Array<T>;

    arrayToList(array: Array<T>): IList<T>;

    [Symbol.iterator](): Iterator<T>;
    forEach(callback: (item: T, index?: number) => any): void
}

export class List<T> implements IList<T> {
    private items: Array<T>;

    constructor() {
        this.items = new Array<T>();
    }

    size(): number {
        return this.items.length;
    }

    add(item: T) {
        const newArray = [item];
        this.items.push(...newArray);
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    contains(item: T): boolean {
        return this.toArray().indexOf(item) !== -1;
    }

    remove(item: T): boolean {
        if (this.contains(item)) {
            const position: number = this.items.indexOf(item);
            this.items.splice(position, 1);
            return true;
        } else {
            return false;
        }
    }

    clear(): void {
        this.items = new Array<T>();
    }

    get(index: number): T {
        return this.items[index];
    }

    toArray(): Array<T> {
        return [...this.items];
    }

    arrayToList(array: Array<T>): IList<T> {
        this.clear();
        array.forEach((e) => this.add(e));
        return this;
    }

    *[Symbol.iterator](): Iterator<T> {
        for (let element of this.items) {
            yield element;
        }
    }

    forEach(callback: (item: T, index: number) => void): void {
        let i = 0
        for (const item1 of this.items) {
            i += 1
            callback(item1, i)
        }
    }


}

export interface IKeyValueMap<K, V> extends Iterator<any> {
    put(key: K, value: V): void;

    putAll(map: IKeyValueMap<K, V>): void;

    remove(key: K): void;

    clear(): void;

    get(key: K): V | undefined;

    size(): number;

    isEmpty(): boolean;

    containsKey(key: K): boolean;

    replace(oldKey: K, newValue: V): V | undefined;

    getValues(): IList<V>;

    getKeys(): IList<K>;

    getKeyValuePair(): IKeyValueObject<K, V>;

    keyValueMapToArray(): IKeyValueObject<K, V>[];

    [Symbol.iterator](): Iterator<IKeyValueObject<K, V>>;

    // forEach(callback: (key:K,value:V, index: number) => V, thisArg?: any): void
}

export interface IKeyValueObject<K, V> {
    key: K;
    value: V;
}

export class KeyValueMap<K, V> implements IKeyValueMap<K, V> {
    private readonly pair: Map<K, V>;

    constructor() {
        this.pair = new Map<K, V>();
    }

    put(key: K, value: V): void {
        const kv: IKeyValueObject<K, V> = {
            key: key,
            value: value,
        };
        this.pair.set(kv.key, kv.value);
    }

    putAll(map: IKeyValueMap<K, V>): void {
        const listOfKeys = map.getKeys();
        for (let key of listOfKeys) {
            const value = map.get(key);
            // @ts-ignore
            this.put(key, value);
        }
    }

    remove(k: K): void {
        this.pair.delete(k);
    }

    clear(): void {
        this.pair.clear();
    }

    get(k: K): V | undefined {
        return this.pair.get(k);
    }

    size(): number {
        return this.pair.size;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    containsKey(k: K): boolean {
        return this.pair.has(k);
    }

    replace(oldK: K, newV: V): V | undefined {

        if (this.containsKey(oldK)) {
            // this.remove(oldK);
            this.put(oldK, newV);
        }

        return this.get(oldK);
    }

    getValues(): List<V> {
        const array = Array.from(this.pair.values());
        let list = new List<V>();
        list.arrayToList([...array]);
        return list;
    }

    getKeys(): IList<K> {
        const array = Array.from(this.pair.keys());
        let list = new List<K>();
        list.arrayToList([...array]);
        return list;
    }

    getKeyValuePair(): IKeyValueObject<K, V> {
        throw new Error("method not implement");

        // let newMap = new Map<K, V>();
        // this.pair.forEach((v, k) => newMap);
        // return newMap;
    }

    keyValueMapToArray(): IKeyValueObject<K, V>[] {
        return Array.from(this.pair, ([key, value]) => ({key, value}));
    }

    * [Symbol.iterator](): Iterator<IKeyValueObject<K, V>> {
        const inArrayForm = this.keyValueMapToArray();
        for (let element of inArrayForm) {
            yield element;
        }
    }

    arrayToKeyValueMap(array: IKeyValueObject<K, V>[]): IKeyValueMap<K, V> {
        this.clear();
        array.forEach((kv => this.put(kv.key, kv.value)))
        return this;
    }

    arrayOfObjectsToKeyValueMap(array: Array<V>, key: string): void {
        this.clear()
        for (const v of array) {
            // @ts-ignore
            this.put(v[key], v)
        }
    }

    // forEach(callback: (key:K,value:V, index: number) => V, thisArg?: any): void {
    //     this[Symbol.iterator]()
    // }

    next(...args: [] | [undefined]): IteratorResult<any, any> {
        // @ts-ignore
        return undefined;
    }

    return(value?: any): IteratorResult<any, any> {
        // @ts-ignore
        return undefined;
    }

    throw(e?: any): IteratorResult<any, any> {
        // @ts-ignore
        return undefined;
    }
}