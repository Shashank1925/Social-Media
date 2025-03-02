import { v4 as uuidv4 } from 'uuid';

export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    // here is the static array to store the registered user data
    static registeredUserData = [];
    // this method is for sign up 
    static signUp(name, email, password) {
        const id = uuidv4();
        const userModel = new UserModel(id, name, email, password);
        this.registeredUserData.push(userModel);
    }

}