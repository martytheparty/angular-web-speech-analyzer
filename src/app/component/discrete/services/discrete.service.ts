import { Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscreteService {

  clearCountSignal = signal<number>(0);

  clear(): void
  {
    const count = this.clearCountSignal() + 1;
    this.clearCountSignal.set(count);
  }
}
