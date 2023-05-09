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
    const list  = new List()

    it('should be empty', function () {
        console.log(list)
        expect(list.isEmpty()).toEqual(true)
    });

    it('should add to list', function () {
        list.add(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        console.log(list)
        expect(list.size()).toEqual(1)
    });

    it('should contain this user', function () {
        const flag = list.contains(newUser({id: 1, name: ' Daniel', email: 'danie@mail.com'}))
        console.log(flag)
        expect(list.size()).toEqual(1)
    });
})