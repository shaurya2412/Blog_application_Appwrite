import { Client, Account } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService {
    client = new Client();
    account;


    constructor() {
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId)
        this.account = new Account(this.client)


    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
                return this.login({email,password})
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }


    async login({email,password}){
        try{
   return  await this.account.createEmailSession(email,password)
        } catch(error){
   throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
            console.log(error)
        }
        return null;
    }
     
    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log(error)
        }
    }


}

const authservice = new AuthService();

export default authservice