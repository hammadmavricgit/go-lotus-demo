interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  maxSize?: number; // Maximum number of entries (default: 100)
}

class StaffDetailsCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes
  private readonly defaultMaxSize = 100;

  constructor(private options: CacheOptions = {}) {
    this.options.ttl = options.ttl || this.defaultTTL;
    this.options.maxSize = options.maxSize || this.defaultMaxSize;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttl || this.options.ttl!);

    // Remove expired entries
    this.cleanup();

    // Check if cache is full
    if (this.cache.size >= this.options.maxSize!) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.options.maxSize,
      ttl: this.options.ttl,
    };
  }
}

// Create cache instances for different data types
export const staffProfileCache = new StaffDetailsCache({ ttl: 10 * 60 * 1000 }); // 10 minutes
export const staffHoursCache = new StaffDetailsCache({ ttl: 5 * 60 * 1000 }); // 5 minutes
export const clinicInfoCache = new StaffDetailsCache({ ttl: 5 * 60 * 1000 }); // 5 minutes
export const specialConditionsCache = new StaffDetailsCache({
  ttl: 5 * 60 * 1000,
}); // 5 minutes
export const credentialsCache = new StaffDetailsCache({ ttl: 5 * 60 * 1000 }); // 5 minutes
export const emergencyContactsCache = new StaffDetailsCache({
  ttl: 5 * 60 * 1000,
}); // 5 minutes

// Cache key generators
export function generateStaffProfileKey(staffId: string): string {
  return `staff-profile-${staffId}`;
}

export function generateStaffHoursKey(staffId: string): string {
  return `staff-hours-${staffId}`;
}

export function generateClinicInfoKey(staffId: string): string {
  return `clinic-info-${staffId}`;
}

export function generateSpecialConditionsKey(staffId: string): string {
  return `special-conditions-${staffId}`;
}

export function generateCredentialsKey(staffId: string): string {
  return `credentials-${staffId}`;
}

export function generateEmergencyContactsKey(staffId: string): string {
  return `emergency-contacts-${staffId}`;
}

// Invalidation helpers
export function invalidateStaffData(staffId: string): void {
  const pattern = `.*-${staffId}`;
  staffProfileCache.invalidatePattern(pattern);
  staffHoursCache.invalidatePattern(pattern);
  clinicInfoCache.invalidatePattern(pattern);
  specialConditionsCache.invalidatePattern(pattern);
  credentialsCache.invalidatePattern(pattern);
  emergencyContactsCache.invalidatePattern(pattern);
}

export function invalidateAllStaffData(): void {
  staffProfileCache.clear();
  staffHoursCache.clear();
  clinicInfoCache.clear();
  specialConditionsCache.clear();
  credentialsCache.clear();
  emergencyContactsCache.clear();
}
