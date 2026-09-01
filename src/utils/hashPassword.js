// Hashes a password with SHA-256 using the browser's built-in Web Crypto API.
//
// IMPORTANT LIMITATION: this project has no backend — everything lives in
// localStorage on the user's own device. A client-only hash cannot provide
// real protection against someone with access to that device/browser, and
// there is no per-user salt or server secret involved. Its purpose here is
// narrow: avoid storing passwords as plain, human-readable text, and
// demonstrate the correct pattern (hash, never compare/store raw passwords)
// for when this app gets a real backend. In production, hashing MUST happen
// server-side with a salted, slow algorithm (bcrypt/argon2/scrypt).
async function hashPassword(plainText) {
  const encoded = new TextEncoder().encode(plainText);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default hashPassword;
