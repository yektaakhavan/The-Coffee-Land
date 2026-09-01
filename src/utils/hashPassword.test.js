import { describe, it, expect } from "vitest";
import hashPassword from "./hashPassword";

describe("hashPassword", () => {
  it("produces a 64-character hex string (SHA-256 output)", async () => {
    const hash = await hashPassword("MyP@ssw0rd");
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("is deterministic — same input always produces the same hash", async () => {
    const hash1 = await hashPassword("MyP@ssw0rd");
    const hash2 = await hashPassword("MyP@ssw0rd");
    expect(hash1).toBe(hash2);
  });

  it("produces different hashes for different passwords", async () => {
    const hash1 = await hashPassword("MyP@ssw0rd");
    const hash2 = await hashPassword("DifferentP@ss1");
    expect(hash1).not.toBe(hash2);
  });

  it("never returns the plain text password itself", async () => {
    const hash = await hashPassword("MyP@ssw0rd");
    expect(hash).not.toBe("MyP@ssw0rd");
  });
});
