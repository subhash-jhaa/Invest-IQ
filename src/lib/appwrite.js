import { Client, Account, Databases, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Database and collection configuration
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// Helper function to retry requests in case of network issues
export const withRetry = async (fn, retries = 2, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (
      retries > 0 && 
      (error.code === 'unknown_error' || 
       error.code === 'network_error' ||
       error.code === 'service_unavailable')
    ) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
};

// User profile database operations
export const userProfileDB = {
  async createProfile(userId, profileData) {
    try {
      const documentId = ID.unique();
      return await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        documentId,
        {
          userId,
          ...profileData,
          createdAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error('Failed to create user profile:', error);
      throw error;
    }
  },

  async getProfile(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [
          Query.equal('userId', userId),
          Query.orderDesc('createdAt'),
          Query.limit(1)
        ]
      );
      return response.documents[0] || null;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  },

  async updateProfile(documentId, profileData) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        documentId,
        profileData
      );
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  }
};

export { client };
