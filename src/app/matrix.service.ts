import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private _M1 = new BehaviorSubject<number[][]>([]);
  private _M2 = new BehaviorSubject<number[][]>([]);
  readonly obsM1 = this._M1.asObservable();
  readonly obsM2 = this._M2.asObservable();

  constructor() {
    this.randomMatrix(3, 2);
  }

  /**
   * @param W Matrix M1 width  (and matrix M2 height)
   * @param H Matrix M1 height (and matrix M2 width )
   */
  randomMatrix(W: number = 3, H: number = 2): void {
    this._M1.next(
      Array(H).fill(0).map( () => Array(W).fill(0).map( () => Math.floor(Math.random()*10)) )
    );
    this._M2.next(
      Array(W).fill(0).map( () => Array(H).fill(0).map( () => Math.floor(Math.random()*10)) )
    );
  }

  transpose(M: number[][]): number[][] {
    return M[0].map( (_, j) => M.map( (_x, i) => M[i][j] ) );
  }

  multiply(m1: number[][], m2: number[][]): number[][] {
    const m2t = this.transpose(m2);
    return m1.map( V1 => m2t.map( V2 => this.scalarProduct(V1, V2) ));
  }

  scalarProduct(v1: number[], v2: number[]): number {
    return v1.reduce( (S, x, i) => S + x * v2[i], 0);
  }
}
