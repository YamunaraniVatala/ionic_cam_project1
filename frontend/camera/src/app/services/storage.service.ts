import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    if(this._storage != null) {
      return;
    }
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any): Promise<any> {
    await this.init();
    return await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.init();
    return await this._storage?.get(key)
;
  }

  public remove(key: string){
    this._storage?.remove(key)
;
  }

  public clearData(){
    this._storage?.clear();
  }
}
