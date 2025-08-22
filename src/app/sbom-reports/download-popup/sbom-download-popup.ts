import { Component, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Artifact } from '../../../dto/artifact';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorStatus } from '../../shared/error-status/error-status';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sbom-download-popup',
  imports: [MatButtonModule, MatProgressSpinnerModule, AsyncPipe, ErrorStatus],
  templateUrl: './sbom-download-popup.html',
  styleUrl: './sbom-download-popup.scss',
})
export class SbomDownloadPopup {
  protected filename = signal('');
  public httpErrorMessage = signal('');
  public httpErrorCode = signal(-1);

  private readonly data = inject<Artifact[]>(MAT_DIALOG_DATA);
  private readonly httpClient = inject(HttpService);
  protected download$: Observable<HttpResponse<Blob>> = this.httpClient
    .downloadSboms(this.data)
    .pipe(
      catchError((err) => {
        this.httpErrorMessage.set(err.message);
        this.httpErrorCode.set(err.status);
        return EMPTY;
      }),
      tap((reponse) => {
        const blob = reponse.body!;
        const filename = reponse.headers
          .get('Content-Disposition')!
          .split('filename=')[1]
          .slice(1, -1);

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }),
    );
}
