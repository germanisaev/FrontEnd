import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
// import { ToastModule } from 'ng2-toastr/ng2-toastr';
// import { ToastModule } from '@syncfusion/ej2-angular-notifications';
// import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailComponent } from './payment-details/payment-detail/payment-detail.component';
import { PaymentDetailListComponent } from './payment-details/payment-detail-list/payment-detail-list.component';
import { PaymentDetailService } from './shared/payment-detail.service';
import { ReversePipe } from './shared/reverse.pipe';
import { InterseptorService } from './shared/interseptor.service';
// import { CreditCardDirective } from './shared/credit-card.directive';


@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailsComponent,
    PaymentDetailComponent,
    PaymentDetailListComponent,
    ReversePipe,
    // CreditCardDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterseptorService,
      multi: true
    },
    PaymentDetailService, 
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
