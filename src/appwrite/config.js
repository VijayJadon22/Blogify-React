/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            // Attempt to delete the document from the Appwrite database
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            // Log the error with context for easier debugging
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false;
        }
    }



    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            // Fetch documents from the database using the provided queries
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            // Log the error with the correct method context
            console.error("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }


    //file upload services:- need to transfer them to a separate file lateron in bucket

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            // Log the error with the correct method context
            console.error("Appwrite service :: Storage :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            // Log the error with the correct method context
            console.error("Appwrite service :: Storage :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        // Call the getFilePreview method on the bucket object with the bucket ID and file ID
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, // The ID of the bucket where the file is stored
            fileId // The ID of the file to retrieve the preview for
        );
    }



}

const service = new Service(); //created object of the class that we can use to access the functions
export default service;

