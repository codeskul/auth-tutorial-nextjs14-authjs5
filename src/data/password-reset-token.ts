import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = (token: string) => {
  try {
    const passwordToken = db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = (email: string) => {
  try {
    const passwordToken = db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordToken;
  } catch {
    return null;
  }
};
