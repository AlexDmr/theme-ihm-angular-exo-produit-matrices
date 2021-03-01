import { Component } from '@angular/core';
import { zip } from 'rxjs';
import { MatrixService } from './matrix.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  M1: number[][] = [];
  M2: number[][] = [];
  MR: number[][] = [];
  W = 0;
  H = 0;
  private hiLine = -1;
  private hiCol  = -1;

  constructor(private MS: MatrixService) {
    zip(MS.obsM1, MS.obsM2).subscribe( ([M1, M2]) => {
      this.M1 = M1;
      this.M2 = M2;
      this.W = M2.length;
      this.H = M1.length;
      this.MR = MS.multiply(M1, M2);
    });
  }

  random(): void {
    this.MS.randomMatrix(this.W, this.H);
  }

  hilight(iM: number, iL: number, iC: number): boolean {
    return iM === 0 && iL === this.hiLine
        || iM === 1 && iC === this.hiCol
        || iM === 2 && iL === this.hiLine && iC === this.hiCol;
  }

  setHilight(iM: number, iL: number, iC: number): void {
    if (iM === 2) { // Result Matrix
      this.hiLine = iL;
      this.hiCol  = iC;
    } else {
      this.hiLine = this.hiCol = -1;
    }
  }

}
