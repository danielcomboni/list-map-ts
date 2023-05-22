import {List} from "../index";

interface IUser {
    id: number
    email: string;
    name: string
}
const newUser = (u?: Partial<IUser>): IUser => {
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
describe('list tests', () =>{
    const list  = new List<IUser>()

    it('should be empty', function () {
        console.log(list)
        expect(list.isEmpty()).toEqual(true)
    });

    it('should add to list', function () {
        list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))
        console.log(list)
        expect(list.size()).toEqual(2)
    });

    it('should get size', function () {
        const size = list.size()
        console.log(size)
    });

    it('should contain this user', function () {
        const flag = list.contains(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        console.log(flag)
        expect(list.size()).toEqual(1)
    });

    it('should contain this user', function () {
        const flag = list.contains(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        console.log(flag)
        expect(list.size()).toEqual(1)
    });

    it('should run forEach', function () {
        list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))

        list.forEach((item: IUser, index: number) => {
            console.log(item, index)
        })
    });

    it('should run first() ', function () {
        list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))
        const t = list.first(item => item.email === 'adam@mail.com')
        console.log(t)
    });

    it('should where()', function () {
        list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))
        const t = list.where(item => item.email.includes('danie'))
        console.log(t)
        console.log(list)
    });

    it('should run orderBy', function () {
        list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        list.add(newUser({id: 2, name: ' Adam', email: 'adam@mail.com'}))
        const t = list.orderBy('name', true)
        console.log(t)

    });
})