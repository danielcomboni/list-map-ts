# list-map-ts project 
### This project provides Java-like List and Map functionalities


1. [Install](#install)
2. [Import](#import)
3. [List](#list)
   1. [add()](#add-to-list)
   2. [size()](#size-of-list)
   3. [isEmpty()](#check-if-list-is-empty)
   4. [contains()](#check-if-list-contains)
   5. [remove()](#check-if-list-contains) - removes an element from list
   6. [clear()](#check-if-list-contains) - removes all elements from the list
   7. [get()](#check-if-list-contains) - gets an element by index
   8. [toArray()](#check-if-list-contains) - converts the list to an array
   9. [arrayToList()](#where-condition) - converts a provided array to list
   10. [forEach()](#foreach-loop) - loops through the entire list
   11. [where()](#where-condition) - returns all the elements from the collection which satisfy a given condition.
   12. [orderBy()](#orderby) - returns an array ordered by the specified property in either descending or ascending order

# Usage:
<a name="install"></a>
### step1: install
```cli
npm i list-map-ts
```

### step2: import

<a name="import"></a>
```typescript
import {KeyValueMap, List} from "list-map-ts";
```

### a model to provide an object blue print
```typescript

// a model
interface IUser {
    id: number
    email: string;
    name: string
}
// this helps to create a new user instance/object
const newUserObject = (u?: Partial<IUser>): IUser => {
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

```












### List
<a name="list"></a>

### instantiate list
```typescript
// initialize list
const list = new List<IUser>()
```

### add to list
<a name="add-to-list"></a>

```typescript

// 1. add to list
list.add(newUserObject({id: 1, name: 'Daniel', email: 'daniel@example.com'}))
list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))

```
### size of list
show how many elements are in list

<a name="size-of-list"></a>
```typescript
// 
const size = list.size()
console.log(size) // prints 2
```

### check if list is empty
<a name="#check-if-list-is-empty"></a>

```typescript
console.log(list.isEmpty()) // prints false
```

### check if list contains
<a name="#check-if-list-contains"></a>

```typescript
const flag = list.contains(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
console.log(flag) // prints true
        
```

### forEach loop
```typescript
        list.forEach((item: IUser, index: number) => {
            console.log(item, index)
        })
```

### where condition
```typescript
const t = list.where(item => item.email.includes('danie'))
console.log(t) // produces     [ { id: 1, name: ' Daniel', email: 'danie@mail.com' } ]


```

### orderBy
```typescript
        const t = list.orderBy('name', true)
        console.log(t)
/**
 * prints
 * 
 [
    { id: 2, name: ' Adam', email: 'adam@mail.com' },
    { id: 1, name: ' Daniel', email: 'danie@mail.com' }
 ]
 */
```
### examples for other methods will be coming soon but everything works fine