import conf from '../conf/conf'
import {Client, Databases,Storage, ID, Query, } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
     }   
     
    async createPost({title,slug ,content ,featuredImage,
    status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteProjectId,
                conf.appwriteCollectionId,
                slug,
                {
                  title,
                  content,
                  featuredImage,
                  status,
                  userID  
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title,content , featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabasetId,
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
            throw error
        }


    }
    async deletePost( slug ){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabasetId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
             
        }
    }
    async getPost(slug){
        try {
           return  await this.databases.getDocument(
            conf.appwriteDatabasetId,
            conf.appwriteCollectionId,
            slug
           )
        } catch (error) {
            console.log(" Appwrite service :: getPost:: error ", error);
            return false
        }
    }

    async getPosts(quaries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabasetId,
                conf.appwriteCollectionId,
                quaries
            )
        } catch (error) {
            console.log(" Appwrite service :: getPosts:: error ", error);
            return false
    
        }
    }

    // file uploading method

    async uploadFIle(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID ,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(" Appwrite service ::uploadFile  :: error ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log(" Appwrite service ::deleteFile  :: error ", error);
            return false
        }
     
    }


    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const service = new Service()
export default service;