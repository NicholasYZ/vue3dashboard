type StorageType = "localStorage" | "sessionStorage";

class Storeage {
  store: any;
  constructor(type: StorageType) {
    this.store = window[type];
  }
  setItem(key: string, value: any): void {
    this.store.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): any {
    return JSON.parse(this.store.getItem(key) || "{}");
  }
  removeItem(key: string): void {
    this.store.removeItem(key);
  }
  clear(): void {
    this.store.clear();
  }
  length(): number {
    return this.setItem.length;
  }
  key(index: number): string {
    return this.store.key(index);
  }
}

export default Storeage;

export const storage = new Storeage("localStorage");
