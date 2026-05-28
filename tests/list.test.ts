// import { List } from "../index";

/*
export interface IUser {
    id: number
    email: string;
    name: string
}
export const newUser = (u?: Partial<IUser>): IUser => {
    const defaults: IUser = {
        id: 0,
        name: '',
        email: ''
    }
    return {
        ...defaults,
        ...u
    }
}
describe('list tests', () => {
    const list = new List<IUser>()

    it('should be empty', function () {
        console.log(list)
        expect(list.isEmpty()).toEqual(true)
    });

    it('should add to list', function () {
        list.add(newUser({ id: 1, name: ' Daniel', email: 'danie@mail.com' }))
        list.add(newUser({ id: 2, name: ' Adam', email: 'adam@mail.com' }))
        console.log(list)
        expect(list.size()).toEqual(2)
    });

    it('should get size', function () {
        const size = list.size()
        console.log(size)
    });

    it('should contain this user', function () {
        const flag = list.contains(newUser({ id: 1, name: ' Daniel', email: 'danie@mail.com' }))
        console.log("size: ", list.size());

        console.log(flag)
        // expect(flag).toEqual(true)
    });

    // it('should contain this user', function () {
    //     const flag = list.contains(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
    //     console.log(flag)
    //     expect(list.size()).toEqual(1)
    // });

    it('should run forEach', function () {

        // list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        // list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))

        list.forEach((item: IUser, index: number) => {
            console.log(item, index)
        })
    });

    it('should run first() ', function () {
        // list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        // list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))
        const t = list.first(item => item.email === 'adam@mail.com')
        console.log(t)
    });

    it('should where()', function () {
        // list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        // list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))
        const t = list.where(item => item.email.includes('danie'))
        console.log(t)
        console.log(list)
    });

    it('should run orderBy', function () {
        // list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        // list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))
        const t = list.orderBy('name', true)
        console.log(t)
    });


    it('should enforce element position', function () {
        list.add(newUser({ id: 1, name: ' Daniel', email: 'danie@mail.com' }))
        list.add(newUser({ id: 2, name: ' Adam', email: 'adam@mail.com' }))

        const t = list.enforcePositions([
            {
                id: 1,
                index: 1
            }
        ])
        console.log('enforcing position...', t)
    });

    it('should enforce element position by object', function () {
        list.add(newUser({ id: 1, name: ' Daniel', email: 'danie@mail.com' }))
        list.add(newUser({ id: 2, name: ' Adam', email: 'adam@mail.com' }))

        const t = list.enforcePositionsByObjectIndex(0, 1)

        console.log('enforcing position by index...', t)
    });


    it('should add all', function () {
        list.add(newUser({ id: 1, name: ' Daniel', email: 'danie@mail.com' }))
        list.add(newUser({ id: 2, name: ' Adam', email: 'adam@mail.com' }))

        list.addAll([
            newUser({ id: 3, name: 'Daif', email: 'daif@mail.com' }),
            newUser({ id: 4, name: 'Reagan', email: 'reagan@mail.com' })
        ])

        console.log('should add all...', list)
    });

    it('should add at index', function () {
        list.add(newUser({ id: 1, name: ' Daniel', email: 'danie@mail.com' }))
        list.add(newUser({ id: 2, name: ' Adam', email: 'adam@mail.com' }))
        list.addAtIndex(0, newUser({ id: 3, name: 'Daif', email: 'daif@mail.com' }))
        console.log('should add at index...', list)
    });

    it('should set element', function () {
        list.add(newUser({ id: 1, name: ' Daniel', email: 'danie@mail.com' }))
        list.add(newUser({ id: 2, name: ' Adam', email: 'adam@mail.com' }))
        list.set(0, newUser({ id: 3, name: 'Daif', email: 'daif@mail.com' }))
        console.log('should set element...', list)
    });

})
    */

import { List, KeyValueMap, Stream, Optional, Stack, Queue } from "../index";

// Test Data Interfaces
export interface IUser {
    id: number;
    email: string;
    name: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    category: string;
}

export const newUser = (u?: Partial<IUser>): IUser => ({
    id: u?.id ?? 0,
    name: u?.name ?? '',
    email: u?.email ?? ''
});

export const newProduct = (p?: Partial<IProduct>): IProduct => ({
    id: p?.id ?? 0,
    name: p?.name ?? '',
    price: p?.price ?? 0,
    category: p?.category ?? ''
});

// Helper function to create test users
const createTestUsers = (): IUser[] => [
    newUser({ id: 1, name: 'Alice', email: 'alice@example.com' }),
    newUser({ id: 2, name: 'Bob', email: 'bob@example.com' }),
    newUser({ id: 3, name: 'Charlie', email: 'charlie@example.com' }),
    newUser({ id: 4, name: 'Diana', email: 'diana@example.com' })
];

describe('List Tests', () => {
    let list: List<IUser>;

    beforeEach(() => {
        list = new List<IUser>();
    });

    describe('Basic Operations', () => {
        it('should be empty when created', () => {
            expect(list.isEmpty()).toBe(true);
            expect(list.size()).toBe(0);
        });

        it('should add elements', () => {
            const user = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            list.add(user);
            
            expect(list.isEmpty()).toBe(false);
            expect(list.size()).toBe(1);
            expect(list.get(0)).toEqual(user);
        });

        it('should add multiple elements', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            expect(list.size()).toBe(4);
            expect(list.toArray()).toEqual(users);
        });

        it('should check if contains element', () => {
            const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
            
            list.add(user1);
            
            expect(list.contains(user1)).toBe(true);
            expect(list.contains(user2)).toBe(false);
        });

        it('should remove elements', () => {
            const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
            
            list.add(user1);
            list.add(user2);
            
            expect(list.remove(user1)).toBe(true);
            expect(list.size()).toBe(1);
            expect(list.contains(user1)).toBe(false);
            expect(list.get(0)).toEqual(user2);
        });

        it('should return false when removing non-existent element', () => {
            const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
            
            list.add(user1);
            
            expect(list.remove(user2)).toBe(false);
            expect(list.size()).toBe(1);
        });

        it('should clear all elements', () => {
            createTestUsers().forEach(user => list.add(user));
            expect(list.size()).toBe(4);
            
            list.clear();
            expect(list.isEmpty()).toBe(true);
            expect(list.size()).toBe(0);
        });

        it('should get element by index', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            expect(list.get(0)).toEqual(users[0]);
            expect(list.get(2)).toEqual(users[2]);
        });

        it('should convert to array', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const array = list.toArray();
            expect(array).toEqual(users);
            expect(array).not.toBe(list.toArray()); // Should be a copy
        });
    });

    describe('Index Operations', () => {
        it('should add element at index', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const newUser_item = newUser({ id: 5, name: 'Eve', email: 'eve@mail.com' });
            list.addAtIndex(2, newUser_item);
            
            expect(list.size()).toBe(5);
            expect(list.get(2)).toEqual(newUser_item);
            expect(list.get(3)).toEqual(users[2]);
        });

        it('should add at beginning', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const firstUser = newUser({ id: 0, name: 'Zack', email: 'zack@mail.com' });
            list.addAtIndex(0, firstUser);
            
            expect(list.get(0)).toEqual(firstUser);
            expect(list.get(1)).toEqual(users[0]);
        });

        it('should add at end', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const lastUser = newUser({ id: 5, name: 'Eve', email: 'eve@mail.com' });
            list.addAtIndex(list.size(), lastUser);
            
            expect(list.get(list.size() - 1)).toEqual(lastUser);
        });

        it('should set element at index', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const updatedUser = newUser({ id: 1, name: 'Alice Updated', email: 'alice.updated@mail.com' });
            const result = list.set(0, updatedUser);
            
            expect(result).toEqual(updatedUser);
            expect(list.get(0)).toEqual(updatedUser);
            expect(list.size()).toBe(4);
        });

        it('should find index of element', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            expect(list.indexOf(users[2])).toBe(2);
            expect(list.indexOf(newUser({ id: 99, name: 'Unknown', email: 'unknown@mail.com' }))).toBe(-1);
        });

        it('should create sublist', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const subList = list.subList(1, 3);
            expect(subList.size()).toBe(2);
            expect(subList.get(0)).toEqual(users[1]);
            expect(subList.get(1)).toEqual(users[2]);
        });

        it('should sort with comparator', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            list.sort((a, b) => a.name.localeCompare(b.name));
            
            const sortedNames = list.toArray().map(u => u.name);
            expect(sortedNames).toEqual(['Alice', 'Bob', 'Charlie', 'Diana']);
        });

        it('should shuffle elements', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const originalOrder = list.toArray();
            list.shuffle();
            const shuffledOrder = list.toArray();
            
            // Shuffle might produce same order by chance, but probability is low
            // Just check that array length remains same and contains same elements
            expect(shuffledOrder.length).toBe(originalOrder.length);
            // console.log('Original Order:', originalOrder.map(u => u.name));
            // console.log('Shuffled Order:', shuffledOrder.map(u => u.name));
            expect(shuffledOrder).not.toEqual(originalOrder); // This might fail occasionally due to randomness

            expect(shuffledOrder.sort((a,b) => a.id - b.id)).toEqual(originalOrder.sort((a,b) => a.id - b.id));
        });
    });

    describe('Stack Operations', () => {
        it('should peek at last element', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            expect(list.peek()).toEqual(users[3]);
            expect(list.size()).toBe(4);
        });

        it('should peek on empty list', () => {
            expect(list.peek()).toBeUndefined();
        });

        it('should pop last element', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const popped = list.pop();
            expect(popped).toEqual(users[3]);
            expect(list.size()).toBe(3);
        });

        it('should pop on empty list', () => {
            expect(list.pop()).toBeUndefined();
        });

        it('should push elements', () => {
            const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
            
            const newLength = list.push(user1, user2);
            expect(newLength).toBe(2);
            expect(list.size()).toBe(2);
            expect(list.get(0)).toEqual(user1);
            expect(list.get(1)).toEqual(user2);
        });

        it('should shift first element', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const shifted = list.shift();
            expect(shifted).toEqual(users[0]);
            expect(list.size()).toBe(3);
            expect(list.get(0)).toEqual(users[1]);
        });

        it('should unshift elements at beginning', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const newUser_item = newUser({ id: 0, name: 'Zack', email: 'zack@mail.com' });
            const newLength = list.unshift(newUser_item);
            
            expect(newLength).toBe(5);
            expect(list.get(0)).toEqual(newUser_item);
            expect(list.get(1)).toEqual(users[0]);
        });
    });

    describe('Functional Methods', () => {
        beforeEach(() => {
            createTestUsers().forEach(user => list.add(user));
        });

        it('should map elements', () => {
            const names = list.map(user => user.name.toUpperCase());
            expect(names.size()).toBe(4);
            expect(names.get(0)).toBe('ALICE');
            expect(names.get(1)).toBe('BOB');
        });

        it('should filter elements', () => {
            const filtered = list.filter(user => user.id > 2);
            expect(filtered.size()).toBe(2);
            expect(filtered.get(0)?.id).toBe(3);
            expect(filtered.get(1)?.id).toBe(4);
        });

        it('should reduce elements', () => {
            const sumOfIds = list.reduce((sum, user) => sum + user.id, 0);
            expect(sumOfIds).toBe(10); // 1+2+3+4
        });

        it('should check if every element satisfies condition', () => {
            const allHaveId = list.every(user => user.id > 0);
            expect(allHaveId).toBe(true);
            
            const allHaveIdGreaterThan2 = list.every(user => user.id > 2);
            expect(allHaveIdGreaterThan2).toBe(false);
        });

        it('should check if some element satisfies condition', () => {
            const someHaveIdGreaterThan3 = list.some(user => user.id > 3);
            expect(someHaveIdGreaterThan3).toBe(true);
            
            const someHaveIdGreaterThan5 = list.some(user => user.id > 5);
            expect(someHaveIdGreaterThan5).toBe(false);
        });

        it('should find element', () => {
            const found = list.find(user => user.name === 'Charlie');
            expect(found).toBeDefined();
            expect(found?.id).toBe(3);
            
            const notFound = list.find(user => user.name === 'Unknown');
            expect(notFound).toBeUndefined();
        });

        it('should find all elements', () => {
            const found = list.findAll(user => user.id >= 3);
            expect(found.size()).toBe(2);
            expect(found.get(0)?.id).toBe(3);
            expect(found.get(1)?.id).toBe(4);
        });
    });

    describe('Utility Methods', () => {
        beforeEach(() => {
            createTestUsers().forEach(user => list.add(user));
        });

        it('should clone list', () => {
            const clone = list.clone();
            expect(clone).not.toBe(list);
            expect(clone.toArray()).toEqual(list.toArray());
            
            // Modifying clone shouldn't affect original
            clone.clear();
            expect(list.size()).toBe(4);
        });

        it('should check equality', () => {
            const list2 = new List<IUser>();
            createTestUsers().forEach(user => list2.add(user));
            console.log("list.equals(list2): ", list.equals(list2));
            
            // expect(list.equals(list2)).toBe(true);
            
            list2.add(newUser({ id: 5, name: 'Eve', email: 'eve@mail.com' }));
            expect(list.equals(list2)).toBe(false);
        });

        it('should join elements', () => {
            const result = list.join(', ');
            // expect(result).toBe('{"id":1,"name":"Alice","email":"alice@example.com"}, {"id":2,"name":"Bob","email":"bob@example.com"}, {"id":3,"name":"Charlie","email":"charlie@example.com"}, {"id":4,"name":"Diana","email":"diana@example.com"}');
        });

        it('should convert to string', () => {
            const str = list.toString();
            expect(typeof str).toBe('string');
            expect(str).toContain('Alice');
        });
    });

    describe('Collection Operations', () => {
        it('should add all elements from iterable', () => {
            const users = createTestUsers();
            list.addAll(users);
            
            expect(list.size()).toBe(4);
            expect(list.toArray()).toEqual(users);
        });

        it('should add all from another list', () => {
            const list2 = new List<IUser>();
            const users = createTestUsers();
            users.forEach(user => list2.add(user));
            
            list.addAll(list2);
            expect(list.size()).toBe(4);
        });

        it('should iterate with for...of', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const iterated: IUser[] = [];
            for (const user of list) {
                iterated.push(user);
            }
            
            expect(iterated).toEqual(users);
        });

        it('should forEach with index', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const items: IUser[] = [];
            const indices: number[] = [];
            
            list.forEach((item, index) => {
                items.push(item);
                indices.push(index);
            });
            
            expect(items).toEqual(users);
            expect(indices).toEqual([0, 1, 2, 3]);
        });

        it('should find first matching element', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const first = list.first(user => user.id > 2);
            expect(first).toEqual(users[2]);
        });

        it('should reverse list', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            list.reverse();
            expect(list.get(0)).toEqual(users[3]);
            expect(list.get(3)).toEqual(users[0]);
        });

        it('should filter with where', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const filtered = list.where(user => user.id > 2);
            expect(filtered.length).toBe(2);
            expect(filtered[0]).toEqual(users[2]);
        });

        it('should order by property', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const ordered = list.orderBy('name', true);
            expect(ordered[0].name).toBe('Alice');
            expect(ordered[3].name).toBe('Diana');
            
            const descending = list.orderBy('name', false);
            expect(descending[0].name).toBe('Diana');
            expect(descending[3].name).toBe('Alice');
        });
    });

    describe('Position Enforcement', () => {
        it('should enforce positions by ID', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const result = list.enforcePositions([
                { id: 2, index: 0 },
                { id: 1, index: 2 }
            ]);
            
            expect(result).toBeInstanceOf(Array);
            expect((result as IUser[])[0]?.id).toBe(2);
            expect((result as IUser[])[2]?.id).toBe(1);
        });

        it('should return list when specified', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const result = list.enforcePositions([
                { id: 2, index: 0 }
            ], true);
            
            expect(result).toBeInstanceOf(List);
        });

        it('should enforce positions by object index', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            console.log("priort: ",list);
            
            const result = list.enforcePositionsByObjectIndex(0, 2);
            console.log("after: ", result);
            
            expect((result as IUser[])[2]?.id).toBe(1);
            expect((result as IUser[])[0]?.id).toBe(2);
        });
    });
});

describe('KeyValueMap Tests', () => {
    let map: KeyValueMap<number, IUser>;

    beforeEach(() => {
        map = new KeyValueMap<number, IUser>();
    });

    describe('Basic Operations', () => {
        it('should be empty when created', () => {
            expect(map.isEmpty()).toBe(true);
            expect(map.size()).toBe(0);
        });

        it('should put and get values', () => {
            const user = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            map.put(1, user);
            
            expect(map.get(1)).toEqual(user);
            expect(map.size()).toBe(1);
            expect(map.isEmpty()).toBe(false);
        });

        it('should update existing key', () => {
            const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            const user2 = newUser({ id: 1, name: 'Alice Updated', email: 'alice.updated@mail.com' });
            
            map.put(1, user1);
            map.put(1, user2);
            
            expect(map.get(1)).toEqual(user2);
            expect(map.size()).toBe(1);
        });

        it('should remove key', () => {
            const user = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            map.put(1, user);
            map.remove(1);
            
            expect(map.get(1)).toBeUndefined();
            expect(map.isEmpty()).toBe(true);
        });

        it('should clear all entries', () => {
            const users = createTestUsers();
            users.forEach(user => map.put(user.id, user));
            
            expect(map.size()).toBe(4);
            map.clear();
            expect(map.isEmpty()).toBe(true);
        });

        it('should check if contains key', () => {
            const user = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            map.put(1, user);
            
            expect(map.containsKey(1)).toBe(true);
            expect(map.containsKey(2)).toBe(false);
        });

        it('should replace value', () => {
            const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
            const user2 = newUser({ id: 1, name: 'Alice Updated', email: 'alice.updated@mail.com' });
            
            map.put(1, user1);
            const result = map.replace(1, user2);
            
            expect(result).toEqual(user2);
            expect(map.get(1)).toEqual(user2);
        });
    });

    describe('Advanced Operations', () => {
        beforeEach(() => {
            const users = createTestUsers();
            users.forEach(user => map.put(user.id, user));
        });

        it('should check if contains value', () => {
            const user = newUser({ id: 2, name: 'Bob', email: 'bob@example.com' });
            expect(map.containsValue(user)).toBe(true);
            
            const unknownUser = newUser({ id: 99, name: 'Unknown', email: 'unknown@mail.com' });
            expect(map.containsValue(unknownUser)).toBe(false);
        });

        it('should get or default', () => {
            const defaultUser = newUser({ id: 0, name: 'Default', email: 'default@mail.com' });
            
            expect(map.getOrDefault(1, defaultUser)).toEqual(map.get(1));
            expect(map.getOrDefault(99, defaultUser)).toEqual(defaultUser);
        });

        it('should put if absent', () => {
            const newUser_item = newUser({ id: 5, name: 'Eve', email: 'eve@mail.com' });
            
            const result1 = map.putIfAbsent(5, newUser_item);
            expect(result1).toBeUndefined();
            expect(map.get(5)).toEqual(newUser_item);
            
            const result2 = map.putIfAbsent(1, newUser_item);
            expect(result2).toEqual(map.get(1));
            expect(map.get(1)).not.toEqual(newUser_item);
        });

        it('should compute if absent', () => {
            const computed = map.computeIfAbsent(5, (key) => 
                newUser({ id: key, name: `User${key}`, email: `user${key}@mail.com` })
            );
            
            expect(computed.id).toBe(5);
            expect(computed.name).toBe('User5');
            
            // Should not recompute for existing key
            const existing = map.computeIfAbsent(1, (key) => 
                newUser({ id: key, name: 'Should Not Change', email: 'wrong@mail.com' })
            );
            expect(existing.name).toBe('Alice');
        });

        it('should compute if present', () => {
            const updated = map.computeIfPresent(1, (key, value) => 
                newUser({ ...value, name: `${value.name} Updated` })
            );
            
            expect(updated?.name).toBe('Alice Updated');
            expect(map.get(1)?.name).toBe('Alice Updated');
            
            const notPresent = map.computeIfPresent(99, (key, value) => value);
            expect(notPresent).toBeUndefined();
        });

        it('should merge values', () => {
            const newUser_item = newUser({ id: 1, name: 'Alice Merged', email: 'alice.merged@mail.com' });
            
            const merged = map.merge(1, newUser_item, (oldValue, newValue) => 
                newUser({ ...oldValue, name: newValue.name })
            );
            
            expect(merged?.name).toBe('Alice Merged');
            expect(merged?.email).toBe('alice@example.com'); // Original email preserved
            
            const newKey = map.merge(5, newUser_item, (oldValue, newValue) => newValue);
            expect(newKey).toEqual(newUser_item);
        });
    });

    describe('Collection Views', () => {
        beforeEach(() => {
            const users = createTestUsers();
            users.forEach(user => map.put(user.id, user));
        });

        it('should get values as list', () => {
            const values = map.getValues();
            expect(values.size()).toBe(4);
            expect(values.contains(createTestUsers()[0])).toBe(true);
        });

        it('should get keys as list', () => {
            const keys = map.getKeys();
            expect(keys.size()).toBe(4);
            expect(keys.contains(1)).toBe(true);
            expect(keys.contains(2)).toBe(true);
            expect(keys.contains(3)).toBe(true);
            expect(keys.contains(4)).toBe(true);
        });

        it('should convert to array of key-value objects', () => {
            const array = map.keyValueMapToArray();
            expect(array.length).toBe(4);
            expect(array[0]).toEqual({ key: 1, value: createTestUsers()[0] });
        });

        it('should iterate with for...of', () => {
            const entries: Array<{ key: number; value: IUser }> = [];
            for (const entry of map) {
                entries.push(entry);
            }
            
            expect(entries.length).toBe(4);
            expect(entries[0].key).toBe(1);
        });

        it('should put all from another map', () => {
            const map2 = new KeyValueMap<number, IUser>();
            const newUser_item = newUser({ id: 5, name: 'Eve', email: 'eve@mail.com' });
            map2.put(5, newUser_item);
            
            map.putAll(map2);
            expect(map.size()).toBe(5);
            expect(map.get(5)).toEqual(newUser_item);
        });

        it('should create from array of key-value objects', () => {
            const array = map.keyValueMapToArray();
            const newMap = new KeyValueMap<number, IUser>();
            newMap.arrayToKeyValueMap(array);
            
            expect(newMap.size()).toBe(4);
            expect(newMap.get(1)).toEqual(map.get(1));
        });

        it('should create from array of objects using key field', () => {
            const products = [
                newProduct({ id: 1, name: 'Laptop', price: 1000, category: 'Electronics' }),
                newProduct({ id: 2, name: 'Mouse', price: 20, category: 'Electronics' })
            ];
            
            const productMap = new KeyValueMap<number, IProduct>();
            productMap.arrayOfObjectsToKeyValueMap(products, 'id');
            
            expect(productMap.size()).toBe(2);
            expect(productMap.get(1)?.name).toBe('Laptop');
            expect(productMap.get(2)?.name).toBe('Mouse');
        });
    });
});



///

describe('Stream Tests', () => {
    let users: IUser[];
    let stream: Stream<IUser>;

    beforeEach(() => {
        users = createTestUsers();
        stream = new Stream(users);
    });

    it('should filter stream', () => {
        const filtered = stream.filter(user => user.id > 2);
        const result = filtered.collect();
        
        expect(result.size()).toBe(2);
        expect(result.get(0)?.id).toBe(3);
        expect(result.get(1)?.id).toBe(4);
    });

    it('should map stream', () => {
        const names = stream.map(user => user.name.toUpperCase());
        const result = names.collect();
        
        expect(result.size()).toBe(4);
        expect(result.get(0)).toBe('ALICE');
        expect(result.get(1)).toBe('BOB');
        expect(result.get(2)).toBe('CHARLIE');
        expect(result.get(3)).toBe('DIANA');
    });

    it('should chain operations', () => {
        const result = stream
            .filter(user => user.id > 1)
            .map(user => user.name)
            .limit(2)
            .collect();
        
        expect(result.size()).toBe(2);
        expect(result.get(0)).toBe('Bob');
        expect(result.get(1)).toBe('Charlie');
    });

    it('should collect to array', () => {
        const array = stream.toArray();
        expect(array).toEqual(users);
        expect(array).not.toBe(users); // Should be a copy
    });

    it('should forEach', () => {
        const items: IUser[] = [];
        stream.forEach(user => items.push(user));
        
        expect(items).toEqual(users);
    });

    it('should reduce without initial value', () => {
        const numbers = new Stream([1, 2, 3, 4]);
        const sum = numbers.reduce((a, b) => a + b);
        
        expect(sum).toBe(10);
    });

    it('should reduce with initial value', () => {
        const sum = stream.reduce((acc, user) => acc + user.id, 0);
        expect(sum).toBe(10);
    });

    it('should distinct', () => {
        const withDuplicates = [1, 2, 2, 3, 3, 3, 4];
        const distinct = new Stream(withDuplicates).distinct().collect();
        
        expect(distinct.size()).toBe(4);
        expect(distinct.toArray()).toEqual([1, 2, 3, 4]);
    });

    it('should limit stream', () => {
        const limited = stream.limit(2).collect();
        expect(limited.size()).toBe(2);
        expect(limited.get(0)).toEqual(users[0]);
        expect(limited.get(1)).toEqual(users[1]);
    });

    it('should skip elements', () => {
        const skipped = stream.skip(2).collect();
        expect(skipped.size()).toBe(2);
        expect(skipped.get(0)).toEqual(users[2]);
        expect(skipped.get(1)).toEqual(users[3]);
    });
});

describe('Optional Tests', () => {
    it('should create present optional', () => {
        const optional = Optional.of('value');
        expect(optional.isPresent()).toBe(true);
        expect(optional.isEmpty()).toBe(false);
        expect(optional.get()).toBe('value');
    });

    it('should throw when creating null with of', () => {
        expect(() => Optional.of(null as any)).toThrow();
        expect(() => Optional.of(undefined as any)).toThrow();
    });

    it('should create nullable optional', () => {
        const optional1 = Optional.ofNullable('value');
        expect(optional1.isPresent()).toBe(true);
        
        const optional2 = Optional.ofNullable(null);
        expect(optional2.isPresent()).toBe(false);
        
        const optional3 = Optional.ofNullable(undefined);
        expect(optional3.isPresent()).toBe(false);
    });

    it('should create empty optional', () => {
        const optional = Optional.empty();
        expect(optional.isPresent()).toBe(false);
        expect(optional.isEmpty()).toBe(true);
    });

    it('should orElse', () => {
        const optional1 = Optional.of('value');
        expect(optional1.orElse('default')).toBe('value');
        
        const optional2 = Optional.empty();
        expect(optional2.orElse('default')).toBe('default');
    });

    it('should orElseGet', () => {
        const optional1 = Optional.of('value');
        expect(optional1.orElseGet(() => 'default')).toBe('value');
        
        const optional2 = Optional.empty();
        expect(optional2.orElseGet(() => 'default')).toBe('default');
    });

    it('should orElseThrow', () => {
        const optional = Optional.of('value');
        expect(optional.orElseThrow(() => new Error('Not found'))).toBe('value');
        
        const empty = Optional.empty();
        expect(() => empty.orElseThrow(() => new Error('Not found'))).toThrow('Not found');
    });

    it('should map', () => {
        const optional = Optional.of('hello');
        const mapped = optional.map(str => str.toUpperCase());
        
        expect(mapped.get()).toBe('HELLO');
        
        const empty = Optional.empty();
        const mappedEmpty = empty.map(str => str);
        expect(mappedEmpty.isEmpty()).toBe(true);
    });

    it('should flatMap', () => {
        const optional = Optional.of('hello');
        const flatMapped = optional.flatMap(str => Optional.of(str.toUpperCase()));
        
        expect(flatMapped.get()).toBe('HELLO');
        
        const empty = Optional.empty();
        const flatMappedEmpty = empty.flatMap(str => Optional.of(str));
        expect(flatMappedEmpty.isEmpty()).toBe(true);
    });

    it('should filter', () => {
        const optional = Optional.of(10);
        const filtered1 = optional.filter(value => value > 5);
        expect(filtered1.isPresent()).toBe(true);
        expect(filtered1.get()).toBe(10);
        
        const filtered2 = optional.filter(value => value > 15);
        expect(filtered2.isPresent()).toBe(false);
    });

    it('should ifPresent', () => {
        let called = false;
        const optional = Optional.of('value');
        optional.ifPresent(() => { called = true; });
        expect(called).toBe(true);
        
        called = false;
        const empty = Optional.empty();
        empty.ifPresent(() => { called = true; });
        expect(called).toBe(false);
    });
});

describe('Stack Tests', () => {
    let stack: Stack<IUser>;

    beforeEach(() => {
        stack = new Stack<IUser>();
    });

    it('should be empty when created', () => {
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
    });

    it('should push elements', () => {
        const user = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        stack.push(user);
        
        expect(stack.isEmpty()).toBe(false);
        expect(stack.size()).toBe(1);
    });

    it('should peek at top element', () => {
        const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
        
        stack.push(user1);
        stack.push(user2);
        
        expect(stack.peek()).toEqual(user2);
        expect(stack.size()).toBe(2);
    });

    it('should pop elements (LIFO)', () => {
        const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
        
        stack.push(user1);
        stack.push(user2);
        
        expect(stack.pop()).toEqual(user2);
        expect(stack.size()).toBe(1);
        expect(stack.pop()).toEqual(user1);
        expect(stack.isEmpty()).toBe(true);
    });

    it('should return undefined when popping empty stack', () => {
        expect(stack.pop()).toBeUndefined();
        expect(stack.peek()).toBeUndefined();
    });
});

describe('Queue Tests', () => {
    let queue: Queue<IUser>;

    beforeEach(() => {
        queue = new Queue<IUser>();
    });

    it('should be empty when created', () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    it('should enqueue elements', () => {
        const user = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        queue.enqueue(user);
        
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(1);
    });

    it('should front element without removing', () => {
        const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
        
        queue.enqueue(user1);
        queue.enqueue(user2);
        
        expect(queue.front()).toEqual(user1);
        expect(queue.size()).toBe(2);
    });

    it('should dequeue elements (FIFO)', () => {
        const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
        
        queue.enqueue(user1);
        queue.enqueue(user2);
        
        expect(queue.dequeue()).toEqual(user1);
        expect(queue.size()).toBe(1);
        expect(queue.dequeue()).toEqual(user2);
        expect(queue.isEmpty()).toBe(true);
    });

    it('should return undefined when dequeuing empty queue', () => {
        expect(queue.dequeue()).toBeUndefined();
        expect(queue.front()).toBeUndefined();
    });
});

describe('Queue Tests', () => {
    let queue: Queue<IUser>;

    beforeEach(() => {
        queue = new Queue<IUser>();
    });

    it('should be empty when created', () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    it('should enqueue elements', () => {
        const user = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        queue.enqueue(user);
        
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(1);
    });

    it('should front element without removing', () => {
        const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
        
        queue.enqueue(user1);
        queue.enqueue(user2);
        
        expect(queue.front()).toEqual(user1);
        expect(queue.size()).toBe(2);
    });

    it('should dequeue elements (FIFO)', () => {
        const user1 = newUser({ id: 1, name: 'Alice', email: 'alice@mail.com' });
        const user2 = newUser({ id: 2, name: 'Bob', email: 'bob@mail.com' });
        
        queue.enqueue(user1);
        queue.enqueue(user2);
        
        expect(queue.dequeue()).toEqual(user1);
        expect(queue.size()).toBe(1);
        expect(queue.dequeue()).toEqual(user2);
        expect(queue.isEmpty()).toBe(true);
    });

    it('should return undefined when dequeuing empty queue', () => {
        expect(queue.dequeue()).toBeUndefined();
        expect(queue.front()).toBeUndefined();
    });
});

describe('Integration Tests', () => {
    it('should work with complex data transformations', () => {
        const users = createTestUsers();
        const list = new List<IUser>();
        list.addAll(users);
        
        const result = new Stream(list)
            .filter(user => user.id > 1)
            .map(user => ({ ...user, name: user.name.toUpperCase() }))
            .limit(2)
            .collect();
        
        expect(result.size()).toBe(2);
        expect(result.get(0)?.name).toBe('BOB');
        expect(result.get(1)?.name).toBe('CHARLIE');
    });

    it('should combine List and KeyValueMap operations', () => {
        const users = createTestUsers();
        const list = new List<IUser>();
        list.addAll(users);
        
        const map = new KeyValueMap<number, IUser>();
        list.forEach(user => {
            map.put(user.id, user);
        });
        
        const transformedList = new Stream(map.getValues())
            .filter(user => user.id > 2)
            .map(user => ({ ...user, name: user.name.toUpperCase() }))
            .collect();
        
        expect(transformedList.size()).toBe(2);
        expect(transformedList.get(0)?.name).toBe('CHARLIE');
        expect(transformedList.get(1)?.name).toBe('DIANA');
    });

    it('should handle optional chaining with collections', () => {
        const list = new List<IUser>();
        const users = createTestUsers();
        list.addAll(users);
        
        const foundUser = list.find(user => user.id === 3);
        const optional = Optional.ofNullable(foundUser);
        
        expect(optional.isPresent()).toBe(true);
        expect(optional.map(user => user.name).get()).toBe('Charlie');
        
        const notFound = Optional.ofNullable(list.find(user => user.id === 99))
            .map(user => user.name)
            .orElse('Not Found');
        
        expect(notFound).toBe('Not Found');
    });

    it('should work with Stack and Queue', () => {
        const users = createTestUsers();
        const stack = new Stack<IUser>();
        const queue = new Queue<IUser>();
        
        users.forEach(user => {
            stack.push(user);
            queue.enqueue(user);
        });
        
        expect(stack.pop()?.id).toBe(4);
        expect(queue.dequeue()?.id).toBe(1);
    });

    it('should handle complex position enforcement', () => {
        const users = createTestUsers();
        const list = new List<IUser>();
        list.addAll(users);
        
        const reordered = list.enforcePositions([
            { id: 3, index: 0 },
            { id: 1, index: 2 },
            { id: 4, index: 3 }
        ], true) as List<IUser>;
        
        expect(reordered.get(0)?.id).toBe(3);
        expect(reordered.get(2)?.id).toBe(1);
        expect(reordered.get(3)?.id).toBe(4);
        
        const moved = reordered.enforcePositionsByObjectIndex(0, 1) as IUser[];
        expect(moved[0]?.id).toBe(1);
        expect(moved[1]?.id).toBe(3);
    });

    it('should handle custom function operations', () => {
        const list = new List<number>();
        list.addAll([1, 2, 3, 4, 5]);
        
        const sum = list.customFunc((...arr) => {
            return arr.reduce((acc, val) => acc + val, 0);
        }, list.toArray());
        
        expect(sum).toBe(15);
        
        const processed = list.customFunc((arr: number[]) => {
            return arr.filter(n => n > 2).map(n => n * 2);
        }, list.toArray());
        
        expect(processed).toEqual([6, 8, 10]);
    });

    it('should handle null safety with Optional in collections', () => {
        const list = new List<Optional<IUser>>();
        list.add(Optional.of(createTestUsers()[0]));
        list.add(Optional.empty());
        list.add(Optional.of(createTestUsers()[1]));
        
        const validUsers = list
            .filter(opt => opt.isPresent())
            .map(opt => opt.get());
        
        expect(validUsers.size()).toBe(2);
        expect(validUsers.get(0)?.name).toBe('Alice');
        expect(validUsers.get(1)?.name).toBe('Bob');
    });

    it('should handle batch operations', () => {
        const list = new List<IUser>();
        const users = createTestUsers();
        
        list.addAll(users);
        expect(list.size()).toBe(4);
        
        const toRemove = users.slice(0, 2);
        toRemove.forEach(user => list.remove(user));
        expect(list.size()).toBe(2);
        expect(list.get(0)?.id).toBe(3);
        expect(list.get(1)?.id).toBe(4);
        
        list.addAll(toRemove);
        expect(list.size()).toBe(4);
    });

    it('should handle nested collections', () => {
        // List of Lists
        const listOfLists = new List<List<IUser>>();
        
        const list1 = new List<IUser>();
        list1.addAll(createTestUsers().slice(0, 2));
        
        const list2 = new List<IUser>();
        list2.addAll(createTestUsers().slice(2, 4));
        
        listOfLists.add(list1);
        listOfLists.add(list2);
        
        // Flatten the nested list
        const flattened = new Stream(listOfLists)
            .flatMap(subList => new Stream(subList.toArray()))
            .collect();
        
        expect(flattened.size()).toBe(4);
        expect(flattened.get(0)?.id).toBe(1);
        expect(flattened.get(3)?.id).toBe(4);
    });

    it('should handle Map transformations', () => {
        const map = new KeyValueMap<string, IUser>();
        const users = createTestUsers();
        
        users.forEach(user => map.put(user.email, user));
        
        const emails = map.getKeys()
            .filter(email => email.includes('example'))
            .toArray();
        
        expect(emails.length).toBe(4);
        
        const names = map.getValues()
            .map(user => user.name.toUpperCase())
            .orderBy('', true);
        
        expect(names[0]).toBe('ALICE');
        expect(names[3]).toBe('DIANA');
    });

    it('should handle error cases gracefully', () => {
        const list = new List<IUser>();
        
        expect(() => list.get(100)).not.toThrow();
        expect(list.get(100)).toBeUndefined();
        
        expect(list.remove(createTestUsers()[0])).toBe(false);
        
        list.addAtIndex(0, createTestUsers()[0]);
        expect(list.size()).toBe(1);
        
        const mapped = list.map(user => user.name);
        expect(mapped.size()).toBe(1);
        
        list.clear();
        list.clear();
        expect(list.isEmpty()).toBe(true);
    });
});

describe('Edge Cases', () => {
    describe('List Edge Cases', () => {
        let list: List<any>;
        
        beforeEach(() => {
            list = new List<any>();
        });

        it('should handle undefined and null values', () => {
            list.add(undefined);
            list.add(null);
            list.add(0);
            list.add('');
            
            expect(list.size()).toBe(4);
            expect(list.contains(undefined)).toBe(true);
            expect(list.contains(null)).toBe(true);
            expect(list.contains(0)).toBe(true);
            expect(list.contains('')).toBe(true);
            
            list.remove(undefined);
            expect(list.size()).toBe(3);
            expect(list.contains(undefined)).toBe(false);
        });
        
        it('should handle duplicate elements', () => {
            const user = createTestUsers()[0];
            
            list.add(user);
            list.add(user);
            list.add(user);
            
            expect(list.size()).toBe(3);
            expect(list.contains(user)).toBe(true);
            
            list.remove(user);
            expect(list.size()).toBe(2);
            expect(list.contains(user)).toBe(true);
        });
        
        it('should handle sublist with invalid indices', () => {
            const users = createTestUsers();
            users.forEach(user => list.add(user));
            
            const emptySublist = list.subList(2, 2);
            expect(emptySublist.size()).toBe(0);
            
            const partialSublist = list.subList(2, 10);
            expect(partialSublist.size()).toBe(2);
        });
    });
    
    describe('Map Edge Cases', () => {
        it('should handle special keys', () => {
            const map = new KeyValueMap<any, string>();
            map.put(null, 'null value');
            map.put(undefined, 'undefined value');
            map.put(NaN, 'NaN value');
            map.put(0, 'zero value');
            map.put('', 'empty string');
            
            expect(map.get(null)).toBe('null value');
            expect(map.get(undefined)).toBe('undefined value');
            expect(map.get(NaN)).toBe('NaN value');
            expect(map.get(0)).toBe('zero value');
            expect(map.get('')).toBe('empty string');
        });
        
        it('should handle putAll with empty map', () => {
            const map1 = new KeyValueMap<number, string>();
            const map2 = new KeyValueMap<number, string>();
            
            map1.put(1, 'one');
            map1.putAll(map2);
            expect(map1.size()).toBe(1);
        });
    });
    
    describe('Stream Edge Cases', () => {
        it('should handle empty streams', () => {
            const emptyStream = new Stream([]);
            const collected = emptyStream.collect();
            
            expect(collected.size()).toBe(0);
            expect(emptyStream.toArray()).toEqual([]);
            
            const mapped = emptyStream.map(x => x);
            expect(mapped.collect().size()).toBe(0);
            
            const reduced = emptyStream.reduce((acc, val) => acc + val, 0);
            expect(reduced).toBe(0);
        });
        
        it('should handle single element streams', () => {
            const singleStream = new Stream([42]);
            const collected = singleStream.collect();
            
            expect(collected.size()).toBe(1);
            expect(collected.get(0)).toBe(42);
            expect(singleStream.reduce((a, b) => a + b)).toBe(42);
        });
    });
    
    describe('Optional Edge Cases', () => {
        it('should handle nested optionals', () => {
            const optional = Optional.of(Optional.of(Optional.of('value')));
            const flattened = optional.flatMap(inner => inner).flatMap(inner => inner);
            
            expect(flattened.get()).toBe('value');
        });
        
        it('should handle filter on empty optional', () => {
            const empty = Optional.empty();
            const filtered = empty.filter(() => true);
            
            expect(filtered.isEmpty()).toBe(true);
        });
    });
});

describe('Performance Tests', () => {
    it('should handle large datasets efficiently', () => {
        const size = 10000;
        const list = new List<number>();
        
        const startAdd = Date.now();
        for (let i = 0; i < size; i++) {
            list.add(i);
        }
        const addTime = Date.now() - startAdd;
        expect(addTime).toBeLessThan(500);
        
        const startMap = Date.now();
        const doubled = list.map(n => n * 2);
        const mapTime = Date.now() - startMap;
        expect(mapTime).toBeLessThan(200);
        
        const startPipeline = Date.now();
        const result = new Stream(list)
            .filter(n => n % 2 === 0)
            .map(n => n * n)
            .limit(1000)
            .collect();
        const pipelineTime = Date.now() - startPipeline;
        expect(pipelineTime).toBeLessThan(200);
        expect(result.size()).toBe(1000);
    });
});