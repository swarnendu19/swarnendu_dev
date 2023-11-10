const conf = {
    appwriteUrl : String(import.meta.env.VITE_appWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_appWRITE_PROJECT_ID ),
    appwriteDatabasetId: String(import.meta.env.VITE_appWRITE_DATABASE_ID ),
    appwriteCollectionId: String(import.meta.env.VITE_appWRITE_COLLECTION_ID),
    appwriteBucketID : String(import.meta.env.VITE_appWRITE_BUCKET_ID)

}

export default conf