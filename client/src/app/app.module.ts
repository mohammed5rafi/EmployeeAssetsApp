import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MastersModule } from './masters/masters.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    MastersModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AccountModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
