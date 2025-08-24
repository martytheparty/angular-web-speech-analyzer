import { Injectable, OnDestroy, signal } from '@angular/core';
import { DiscreteResult } from '../../../../interfaces/voice';

@Injectable({
  providedIn: 'root'
})
export class DiscreteService {

  clearCountSignal = signal<number>(0);
  results: DiscreteResult[] = []; 

  clear(): void
  {
    const count = this.clearCountSignal() + 1;
    this.clearCountSignal.set(count);
  }
}
