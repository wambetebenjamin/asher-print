export type RecaptchaResult = {
  success: boolean;
  score: number | null;
  needsV2: boolean;
  bypassed: boolean;
  error?: string;
};

/**
 * Server side Google reCAPTCHA verification.
 * The secret key is read from RECAPTCHA_SECRET_KEY on the server only and is
 * never sent to the client. When no secret is configured (local preview),
 * verification is bypassed and flagged so forms remain testable.
 * A v3 score below 0.5 asks the client to complete the v2 challenge, and a
 * valid v2 token then passes.
 */
export async function verifyRecaptcha(
  token: string,
  v2Token = "",
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { success: true, score: null, needsV2: false, bypassed: true };
  }
  const candidate = v2Token || token;
  if (!candidate) {
    return { success: false, score: null, needsV2: true, bypassed: false, error: "Missing CAPTCHA token." };
  }
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: candidate }).toString(),
    });
    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      "error-codes"?: string[];
    };
    if (!data.success) {
      return {
        success: false,
        score: typeof data.score === "number" ? data.score : null,
        needsV2: !v2Token,
        bypassed: false,
        error: "CAPTCHA verification failed. Please try again.",
      };
    }
    const score = typeof data.score === "number" ? data.score : null;
    if (!v2Token && score !== null && score < 0.5) {
      return {
        success: false,
        score,
        needsV2: true,
        bypassed: false,
        error: "Please complete the extra verification step.",
      };
    }
    return { success: true, score, needsV2: false, bypassed: false };
  } catch {
    return {
      success: false,
      score: null,
      needsV2: false,
      bypassed: false,
      error: "CAPTCHA check could not be completed. Please try again.",
    };
  }
}
