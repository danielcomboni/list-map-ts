# list-map-ts project 
### This project provides Java-like List and Map functionalities

# Usage:
### step1: install
```cli
npm i list-map-ts
```

### step2: import

```typescript
import {KeyValueMap, List} from "list-map-ts";

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

// initialize list
const list = new List<IUser>()

// 1. add to list
list.add(newUserObject({id: 1, name: 'Daniel', email: 'daniel@example.com'}))

```

### examples for other methods will be coming soon but everything works fine