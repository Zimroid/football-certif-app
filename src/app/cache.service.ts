import { Injectable } from '@angular/core';

interface Cache<T> { time: number, cacheByUrl: { [url: string]: T } };

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cacheName = 'myCache';
  private oneDay = 86400000 // 24 * 60 * 60 * 1000

  private retrieveCache<T>(): Cache<T> {
    const cacheInLocalStorage = localStorage.getItem(this.cacheName);
    if (!cacheInLocalStorage) {
      return { time: Date.now(), cacheByUrl: {} };
    }

    try {
      let parsedCache = JSON.parse(cacheInLocalStorage);
      if (parsedCache?.time < Date.now() - this.oneDay) {
        localStorage.removeItem(this.cacheName);
        return { time: Date.now(), cacheByUrl: {} };
      }
      return parsedCache;

    } catch {
      localStorage.removeItem(this.cacheName);
      return { time: Date.now(), cacheByUrl: {} };
    }
  }

  public cacheUrl<T>(url: string, data: T) {
    const cache = this.retrieveCache<T>();
    cache.cacheByUrl[url] = data;
    localStorage.setItem(this.cacheName, JSON.stringify(cache));
  }

  public retrieveFromCache<T>(url: string): T | null {
    const cache = this.retrieveCache<T>();

    return cache.cacheByUrl[url] ?? null;
  }
}
