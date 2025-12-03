import { databases } from "../lib/appwrite";
import { ID, Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

class DatabaseService {
  async createUserProfile(userId, profileData) {
    try {
      // Validate inputs
      if (!userId || !profileData) {
        throw new Error("User ID and profile data are required");
      }

      // Ensure capital is within valid range (100 to 10,000,000)
      const capital = parseInt(profileData.monthlyInvestment || 0);
      const validCapital = Math.max(100, Math.min(capital, 10000000));

      const document = await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          age: parseInt(profileData.age) || 0,
          capital: validCapital,
          initialInvestment: parseInt(profileData.initialInvestment) || 0, // <-- Add this line
          goal: profileData.investmentGoal || "",
          goalYears: parseInt(profileData.investmentPeriod) || 0,
          riskAppetite: profileData.riskTolerance || "moderate",
          riskProfile: this.mapRiskToleranceToProfile(
            profileData.riskTolerance
          ),
          investmentType: this.getInvestmentTypes(profileData),
          createdAt: new Date().toISOString(),
        }
      );

      return { success: true, data: document };
    } catch (error) {
      console.error("Error creating user profile:", error);
      return { success: false, error: error.message };
    }
  }

  async updateUserProfile(userId, profileData) {
    try {
      // Find existing profile document for the user
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );

      if (!documents.length) {
        return await this.createUserProfile(userId, profileData);
      }

      // Ensure capital is within valid range (100 to 10,000,000)
      const capital = parseInt(profileData.monthlyInvestment || 0);
      const validCapital = Math.max(100, Math.min(capital, 10000000));

      // Prepare update data
      const updateData = {
        age: parseInt(profileData.age),
        capital: validCapital,
        initialInvestment: parseInt(profileData.initialInvestment) || 0,
        goal: profileData.investmentGoal,
        goalYears: parseInt(profileData.investmentPeriod),
        riskAppetite: profileData.riskTolerance,
      };

      // If AI has provided a risk profile, use it, otherwise use the mapping function
      if (profileData.riskProfile) {
        updateData.riskProfile = profileData.riskProfile;
      } else {
        updateData.riskProfile = this.mapRiskToleranceToProfile(
          profileData.riskTolerance
        );
      }

      // If AI has provided investment types, use them, otherwise use the generation function
      if (profileData.investmentType && Array.isArray(profileData.investmentType)) {
        updateData.investmentType = profileData.investmentType;
      } else {
        updateData.investmentType = this.getInvestmentTypes(profileData);
      }

      const document = await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        documents[0].$id,
        updateData
      );

      return { success: true, data: document };
    } catch (error) {
      console.error("Error updating user profile:", error);
      return { success: false, error: error.message };
    }
  }

  async getUserProfile(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );

      if (!documents.length) {
        return { success: false, error: "Profile not found" };
      }

      return { success: true, data: documents[0] };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return { success: false, error: error.message };
    }
  }

  async deleteUserProfile(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );

      if (documents.length) {
        await databases.deleteDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          documents[0].$id
        );
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting user profile:", error);
      return { success: false, error: error.message };
    }
  }

  // Helper methods to map profile data
  mapRiskToleranceToProfile(riskTolerance) {
    if (!riskTolerance || typeof riskTolerance !== "string") {
      return "Moderate";
    }

    const riskMap = {
      low: "Conservative",
      medium: "Moderate",
      high: "Aggressive",
    };

    return riskMap[riskTolerance.toLowerCase().trim()] || "Moderate";
  }

  getInvestmentTypes(profileData) {
    const types = ["SIP"];
    const investment = parseInt(profileData.initialInvestment || 0);
    const riskTolerance = profileData.riskTolerance;

    if (investment > 100000) {
      types.push("Mutual Funds");
    }

    if (riskTolerance === "conservative") {
      types.push("Fixed Deposits", "Gold");
    } else if (riskTolerance === "aggressive") {
      types.push("Stocks", "International Funds");
    } else {
      types.push("Hybrid Funds");
    }

    return types;
  }
}

export const databaseService = new DatabaseService();
