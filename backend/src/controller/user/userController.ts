import { AuthenticateReqHandler } from "../../config/passportJwt";
import User, { Iuser } from "../../model/userSchema";
import { sendResponse } from "../../utils/sendResponse";
import bcrypt from "bcryptjs";

/**
 * GET /api/user/profile
 * Returns only the authenticated user's email
 */export const getEmailOnly: AuthenticateReqHandler = async (req, res) => {
  try {
    const userId = (req.user as Iuser)?._id;

    if (!userId) {
      return sendResponse(res, 401, false, "Sign in to continue");
    }

    // 🔒 Fetch just the email field explicitly
    const user = await User.findById(userId).select("email");

    if (!user) {
      return sendResponse(res, 404, false, "User does not exist");
    }

    console.log("✅ Authenticated email:", user.email);

    return sendResponse(res, 200, true, "Email fetched successfully", {
      email: user.email,
    });
  } catch (error) {
    console.error("❌ Error fetching email:", error);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

/**
 * GET /api/user/details
 * Returns all user details except password
 */
export const getDetails: AuthenticateReqHandler = async (req, res) => {
  try {
    const userId = (req.user as Iuser)?._id;

    if (!userId) {
      return sendResponse(res, 401, false, "Sign in to continue");
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return sendResponse(res, 404, false, "User does not exist");
    }

    console.log("✅ Full user details fetched for:", user.email);

    return sendResponse(res, 200, true, "User fetched successfully", { user });
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

/**
 * POST /api/user/change-password
 * Changes password after verifying the current password
 */
export const changePassword: AuthenticateReqHandler = async (req, res) => {
  try {
    const userId = (req.user as Iuser)?._id;
    const { currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return sendResponse(res, 400, false, "Missing required fields");
    }

    if (newPassword.length < 6) {
  return sendResponse(res, 400, false, "New password must be at least 6 characters long");
}


    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return sendResponse(res, 404, false, "User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, foundUser.password);
    if (!isMatch) {
      return sendResponse(res, 400, false, "Current password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    foundUser.password = await bcrypt.hash(newPassword, salt);
    await foundUser.save();

    console.log("✅ Password updated for user:", foundUser.email);

    return sendResponse(res, 200, true, "Password changed successfully");
  } catch (error) {
    console.error("❌ Error changing password:", error);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

export const updateProfile: AuthenticateReqHandler = async (req, res) => {
  try {
    const userId = (req.user as Iuser)?._id;
    const { email, password } = req.body;

    if (!userId || !email) {
      return sendResponse(res, 400, false, "Email is required");
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    // If email is changing, make sure it's not taken
    if (email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) {
        return sendResponse(res, 409, false, "Email is already in use");
      }
    }

    user.email = email;

    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password.trim(), salt);
    }

    await user.save();

    console.log("✅ Profile updated for user:", user.email);
    return sendResponse(res, 200, true, "Profile updated successfully");
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};
