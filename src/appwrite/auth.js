/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    createAccount = async ({ email, password, name }) => {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call login method as user's account is created
                return this.login(email, password);
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    login = async ({ email, password }) => {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    getCurrentUser = async () => {
        try {
            const user = await this.account.get();
            if (user) {
                return user;
            } else {
                return null;
            }

        } catch (error) {
            throw error;
        }

    }

    logout = async () => {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;