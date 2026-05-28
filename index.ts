
export interface IPositionDeterminantById {
    id: string | number | any
    index: number
}

export interface ILinq<T> extends Iterable<T> {
    // where(element: T)
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

    /**
     * 
     * @param positionMap: e.g [
            {
                id: 1,
                index: 1
            },
             {
                id: 9,
                index: 4
            }
        ]
     * @param returnListOrDefaultToArray: if true, returns the list
     * 
     *         const t = list.enforcePositions([
            {
                id: 1,
                index: 1
            }
        ])

     */

    enforcePositions(positionMap: IPositionDeterminantById[], returnListOrDefaultToArray?: boolean): IList<T> | Array<T>;

    customFunc(fn: (...args: any[]) => this | IList<T> | Array<T>, ...args: any[]): this | IList<T> | Array<T>

    arrayToList(array: Array<T>): IList<T>;

    [Symbol.iterator](): Iterator<T>;
    forEach(callback: (item: T, index?: number) => any): void
    first(callback: (item: T) => boolean): T | undefined

    reverse(): void
    where(callback: (item: T) => boolean): Array<T>
    orderBy(propertyName: string, inAscendingOrder?: boolean): Array<T>

    addAll(elements: Iterable<T>): void;
    addAtIndex(index: number, element: T): void;
    set(index: number, element: T): T;
    indexOf(element: T): number;
    lastIndexOf(element: T): number;
    subList(fromIndex: number, toIndex: number): IList<T>;
    sort(comparator?: (a: T, b: T) => number): void;
    shuffle(): void;
    peek(): T | undefined;
    pop(): T | undefined;
    push(...elements: T[]): number;
    shift(): T | undefined;
    unshift(...elements: T[]): number;

    // Functional methods
    map<U>(callback: (item: T, index: number) => U): IList<U>;
    filter(callback: (item: T, index: number) => boolean): IList<T>;
    reduce<U>(callback: (accumulator: U, item: T, index: number) => U, initialValue: U): U;
    every(callback: (item: T, index: number) => boolean): boolean;
    some(callback: (item: T, index: number) => boolean): boolean;
    find(callback: (item: T, index: number) => boolean): T | undefined;
    findAll(callback: (item: T, index: number) => boolean): IList<T>;

    // Utility methods
    clone(): IList<T>;
    equals(other: IList<T>): boolean;
    join(separator?: string): string;
    toString(): string;

}

export class List<T> implements IList<T> {
    private items: Array<T>;

    constructor() {
        this.items = new Array<T>();
    }

    subList(fromIndex: number, toIndex: number): IList<T> {
        const subArray = this.items.slice(fromIndex, toIndex);
        const subList = new List<T>();
        subList.arrayToList(subArray);
        return subList;
    }
    sort(comparator?: ((a: T, b: T) => number) | undefined): void {
        this.items.sort(comparator);
    }

    shuffle(): void {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    push(...elements: T[]): number {
        return this.items.push(...elements);
    }
    shift(): T | undefined {
        return this.items.shift();
    }
    unshift(...elements: T[]): number {
        return this.items.unshift(...elements);
    }
    map<U>(callback: (item: T, index: number) => U): IList<U> {
        const mappedArray = this.items.map(callback);
        const mappedList = new List<U>();
        mappedList.arrayToList(mappedArray);
        return mappedList;
    }
    filter(callback: (item: T, index: number) => boolean): IList<T> {
        const filteredArray = this.items.filter(callback);
        const filteredList = new List<T>();
        filteredList.arrayToList(filteredArray);
        return filteredList;
    }
    reduce<U>(callback: (accumulator: U, item: T, index: number) => U, initialValue: U): U {
        return this.items.reduce(callback, initialValue);
    }
    every(callback: (item: T, index: number) => boolean): boolean {
        return this.items.every(callback);
    }
    some(callback: (item: T, index: number) => boolean): boolean {
        return this.items.some(callback);
    }
    find(callback: (item: T, index: number) => boolean): T | undefined {
        return this.items.find(callback);
    }
    findAll(callback: (item: T, index: number) => boolean): IList<T> {
        const foundArray = this.items.filter(callback);
        const foundList = new List<T>();
        foundList.arrayToList(foundArray);
        return foundList;
    }
    clone(): IList<T> {
        const clonedList = new List<T>();
        clonedList.arrayToList(this.toArray());
        return clonedList;
    }
    equals(other: IList<T>): boolean {
        if (this.size() !== other.size()) return false;
        for (let i = 0; i < this.size(); i++) {
            if (this.get(i) !== other.get(i)) return false;
        }
        return true;
    }
    join(separator?: string): string {
        return this.items.join(separator);
    }
    toString(): string {
        return this.items.toString();
    }

    lastIndexOf(element: T): number {
        throw new Error("Method not implemented.");
    }

    indexOf(element: T): number {
        return this.items.indexOf(element);
    }

    set(index: number, element: T): T {
        this.items[index] = element;
        return element;
    }

    addAtIndex(index: number, element: T): void {
        this.items.splice(index, 0, element);
    }

    addAll(elements: Iterable<T>): void {
        for (const element of elements) {
            this.add(element);
        }
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
            callback(item1, i)
            i += 1
        }
    }

    first(callback: (item: T) => boolean): T | undefined {
        for (const item of this.items) {
            if (callback(item)) return item
        }
        return undefined
    }

    reverse() {
        this.items.reverse()
    }

    where(callback: (item: T) => boolean): Array<T> {
        return this.items.filter(value => callback(value))
    }

    orderBy(propertyName: string, inAscendingOrder = true): Array<T> {
        const arr = this.items.sort((a, b) => {
            // @ts-ignore
            if (a[propertyName] < b[propertyName]) return -1
            // @ts-ignore
            if (a[propertyName] > b[propertyName]) return 1;
            return 0
        })

        if (inAscendingOrder) return arr
        return arr.reverse()

    }

    /*
    enforcePositions(positionMap: IPositionDeterminantById[] = [], returnListOrDefaultToArray = false): T[] | IList<T> {
        let fixed: T[] = []
        let remaining: T[] = []

        if (positionMap.length === 0) return this.items

        for (const item of this.items) {
            // @ts-ignore
            const mapper = positionMap.filter(v => v.id === item['id'])[0]
            if (!mapper) remaining.push(item);
            else fixed[mapper.id] = item
        }

        // Fill in any undefined slots with remaining items
        for (let i = 0; i < fixed.length; i++) {
            if (fixed[i] === undefined && remaining.length > 0) {
                // @ts-ignore
                fixed[i] = remaining.shift();
            }
        }

        if (returnListOrDefaultToArray) return this.arrayToList([...fixed, ...remaining]);

        return [...fixed, ...remaining]

    }
    */

    enforcePositions(positionMap: IPositionDeterminantById[] = [], returnListOrDefaultToArray = false): T[] | IList<T> {
        let fixed: (T | undefined)[] = new Array(positionMap.length)
        let remaining: T[] = []

        for (const item of this.items) {
            // @ts-ignore
            const mapper = positionMap.find(v => v.id === item['id'])
            if (!mapper) remaining.push(item);
            else fixed[mapper.index] = item  // Use index, not id
        }

        // Fill gaps
        for (let i = 0; i < fixed.length; i++) {
            if (fixed[i] === undefined && remaining.length > 0) {
                fixed[i] = remaining.shift();
            }
        }

        const result = [...fixed.filter(x => x !== undefined), ...remaining] as T[];

        if (returnListOrDefaultToArray) return this.arrayToList(result);
        return result;
    }

    enforcePositionsByObjectIndex(oldIndex: number, newIndex: number, returnListOrDefaultToArray = false): T[] | IList<T> {
        const arr = this.toArray();
        // Remove 1 item from the old position
        const [element] = arr.splice(oldIndex, 1);
        // Insert the item at the new position
        arr.splice(newIndex, 0, element);
        if (returnListOrDefaultToArray) return this.arrayToList(arr);
        return arr;
    }

    customFunc(fn: (...args: any[]) => this | IList<T> | T[], ...args: any[]): this | IList<T> | T[] {
        if (args) return fn(args);
        return fn()
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

    containsValue(value: V): boolean;
    getOrDefault(key: K, defaultValue: V): V;
    putIfAbsent(key: K, value: V): V | undefined;
    computeIfAbsent(key: K, mappingFunction: (key: K) => V): V;
    computeIfPresent(key: K, remappingFunction: (key: K, value: V) => V): V | undefined;
    forEach(callback: (key: K, value: V, index: number) => void): void;
    entrySet(): Iterable<IKeyValueObject<K, V>>;
    merge(key: K, value: V, remappingFunction: (oldValue: V, newValue: V) => V): V | undefined;

    [Symbol.iterator](): Iterator<IKeyValueObject<K, V>>;

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

    containsValue(value: V): boolean {
        for (let v of this.pair.values()) {
            if (v === value) return true;
        }
        return false;
    }

    getOrDefault(key: K, defaultValue: V): V {
        return this.pair.get(key) ?? defaultValue;
    }

    putIfAbsent(key: K, value: V): V | undefined {
        if (!this.pair.has(key)) {
            this.pair.set(key, value);
            return undefined;
        }
        return this.pair.get(key);
    }

    computeIfAbsent(key: K, mappingFunction: (key: K) => V): V {
        if (!this.pair.has(key)) {
            const newValue = mappingFunction(key);
            this.pair.set(key, newValue);
            return newValue;
        }
        return this.pair.get(key) as V;
    }

    computeIfPresent(key: K, remappingFunction: (key: K, value: V) => V): V | undefined {
        if (this.pair.has(key)) {
            const oldValue = this.pair.get(key) as V;
            const newValue = remappingFunction(key, oldValue);
            this.pair.set(key, newValue);
            return newValue;
        }
        return undefined;
    }

    forEach(callback: (key: K, value: V, index: number) => void): void {
        this.forEach(callback)
    }

    entrySet(): Iterable<IKeyValueObject<K, V>> {
        const array = this.keyValueMapToArray();
        return array;
    }

    merge(key: K, value: V, remappingFunction: (oldValue: V, newValue: V) => V): V | undefined {
        if (this.pair.has(key)) {
            const oldValue = this.pair.get(key) as V;
            const newValue = remappingFunction(oldValue, value);
            this.pair.set(key, newValue);
            return newValue;
        } else {
            this.pair.set(key, value);
            return value;
        }
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
        return Array.from(this.pair, ([key, value]) => ({ key, value }));
    }

    *[Symbol.iterator](): Iterator<IKeyValueObject<K, V>> {
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

export class Stream<T> implements Iterable<T> {
    private source: Iterable<T>;

    constructor(source: Iterable<T>) {
        this.source = source;
    }

    // Add this method to implement Iterable
    *[Symbol.iterator](): Iterator<T> {
        for (const item of this.source) {
            yield item;
        }
    }

    filter(predicate: (item: T) => boolean): Stream<T> {
        const filtered = Array.from(this.source).filter(predicate);
        return new Stream(filtered);
    }

    map<U>(mapper: (item: T) => U): Stream<U> {
        const mapped = Array.from(this.source).map(mapper);
        return new Stream(mapped);
    }

    // Add flatMap method
    flatMap<U>(mapper: (item: T) => Iterable<U>): Stream<U> {
        const result: U[] = [];
        for (const item of this.source) {
            const mapped = mapper(item);
            for (const subItem of mapped) {
                result.push(subItem);
            }
        }
        return new Stream(result);
    }

    collect(): IList<T> {
        const list = new List<T>();
        for (const item of this.source) {
            list.add(item);
        }
        return list;
    }

    toArray(): T[] {
        return Array.from(this.source);
    }

    forEach(consumer: (item: T) => void): void {
        for (const item of this.source) {
            consumer(item);
        }
    }

    reduce(accumulator: (a: T, b: T) => T): T | undefined;
    reduce<U>(accumulator: (acc: U, item: T) => U, initialValue: U): U;
    reduce(accumulator: any, initialValue?: any): any {
        const arr = Array.from(this.source);
        if (initialValue !== undefined) {
            return arr.reduce(accumulator, initialValue);
        }
        return arr.reduce(accumulator);
    }

    distinct(): Stream<T> {
        const unique = Array.from(new Set(this.source));
        return new Stream(unique);
    }

    limit(maxSize: number): Stream<T> {
        const limited = Array.from(this.source).slice(0, maxSize);
        return new Stream(limited);
    }

    skip(n: number): Stream<T> {
        const skipped = Array.from(this.source).slice(n);
        return new Stream(skipped);
    }
}

export class Optional<T> {
    private constructor(private value: T | null | undefined) { }

    static of<T>(value: T): Optional<T> {
        if (value === null || value === undefined) {
            throw new Error("value cannot be null or undefined");
        }
        return new Optional(value);
    }

    static ofNullable<T>(value: T | null | undefined): Optional<T> {
        return new Optional(value);
    }

    static empty<T>(): Optional<T> {
        return new Optional<T>(null);
    }

    isPresent(): boolean {
        return this.value !== null && this.value !== undefined;
    }

    isEmpty(): boolean {
        return !this.isPresent();
    }

    get(): T {
        if (this.isEmpty()) {
            throw new Error("No value present");
        }
        return this.value!;
    }

    orElse(other: T): T {
        return this.isPresent() ? this.value! : other;
    }

    orElseGet(supplier: () => T): T {
        return this.isPresent() ? this.value! : supplier();
    }

    orElseThrow<E extends Error>(errorSupplier: () => E): T {
        if (this.isEmpty()) {
            throw errorSupplier();
        }
        return this.value!;
    }

    map<U>(mapper: (value: T) => U): Optional<U> {
        if (this.isEmpty()) {
            return Optional.empty();
        }
        return Optional.ofNullable(mapper(this.value!));
    }

    flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
        if (this.isEmpty()) {
            return Optional.empty();
        }
        return mapper(this.value!);
    }

    filter(predicate: (value: T) => boolean): Optional<T> {
        if (this.isEmpty() || !predicate(this.value!)) {
            return Optional.empty();
        }
        return this;
    }

    ifPresent(consumer: (value: T) => void): void {
        if (this.isPresent()) {
            consumer(this.value!);
        }
    }
}

export interface IStack<T> {
    push(element: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}

export class Stack<T> implements IStack<T> {
    private list: IList<T>;

    constructor() {
        this.list = new List<T>();
    }

    push(element: T): void {
        this.list.add(element);
    }

    pop(): T | undefined {
        if (this.isEmpty()) return undefined;
        const lastIndex = this.list.size() - 1;
        const element = this.list.get(lastIndex);
        this.list.remove(element);
        return element;
    }

    peek(): T | undefined {
        if (this.isEmpty()) return undefined;
        return this.list.get(this.list.size() - 1);
    }

    isEmpty(): boolean {
        return this.list.isEmpty();
    }

    size(): number {
        return this.list.size();
    }
}

export interface IQueue<T> {
    enqueue(element: T): void;
    dequeue(): T | undefined;
    front(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}

export class Queue<T> implements IQueue<T> {
    private list: IList<T>;

    constructor() {
        this.list = new List<T>();
    }

    enqueue(element: T): void {
        this.list.add(element);
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;
        const element = this.list.get(0);
        this.list.remove(element);
        return element;
    }

    front(): T | undefined {
        if (this.isEmpty()) return undefined;
        return this.list.get(0);
    }

    isEmpty(): boolean {
        return this.list.isEmpty();
    }

    size(): number {
        return this.list.size();
    }
}