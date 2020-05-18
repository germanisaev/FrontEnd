import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
// import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  cType = 'Invalid';

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: PaymentDetail) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(pmId: number) {
    // if (confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(pmId)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.warning('Deletted successfully', 'Payment Detail Register');
            // this.onWarning('Deletted successfully');
          },
          err => {
            console.log(err);
          }
        );
    // }
  }

  filterCreditCard(cardNum: string) {
    if(cardNum.length == 16) {
      return "****-****-****-"+cardNum.substring(12,16);
      // return cardNum.substring(0,4)+"-"+cardNum.substring(4,8)+"-"+cardNum.substring(8,12)+"-"+cardNum.substring(12,16);
    }
    if(cardNum.length == 15) {
      return "***-****-****-"+cardNum.substring(11,15);
      // return cardNum.substring(0,4)+"-"+cardNum.substring(4,8)+"-"+cardNum.substring(8,12)+"-"+cardNum.substring(12,16);
    }
    if(cardNum.length == 14) {
      return "**-****-****-"+cardNum.substring(10,14);
      // return cardNum.substring(0,4)+"-"+cardNum.substring(4,8)+"-"+cardNum.substring(8,12)+"-"+cardNum.substring(12,16);
    }
    if(cardNum.length == 13) {
      return "*****-****-"+cardNum.substring(9,13);
      // return cardNum.substring(0,4)+"-"+cardNum.substring(4,8)+"-"+cardNum.substring(8,12)+"-"+cardNum.substring(12,16);
    }
    if(cardNum.length == 11) {
      return "***-****-"+cardNum.substring(8,11);
      // return cardNum.substring(0,4)+"-"+cardNum.substring(4,8)+"-"+cardNum.substring(8,12)+"-"+cardNum.substring(12,16);
    }
  }

  ccFormat(event: any) {
    var cardnumber = event.target.value;
    // cardnumber = cardnumber.replace(/[ -]/g, '');
    var match = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(cardnumber);
    if (match) {
      // List of card types, in the same order as the regex capturing groups
      var types = ['Visa', 'Master Card', 'Discover', 'American Express',
        'Diners Club', 'JCB'];
      // Find the capturing group that matched
      // Skip the zeroth element of the match array (the overall match)
      for (var i = 1; i < match.length; i++) {
        if (match[i]) {
          // Display the card type for that group
          // document.getElementById('notice').innerHTML = types[i - 1];
          this.cType = types[i - 1];
          break;
        }
      }
    } else {
      // document.getElementById('notice').innerHTML = '(invalid card number)';
      this.cType = 'Invalid';
    }
  }

  /*
  onWarning(message) {
    this.toastr.warn('Waring', message, {
      position: ['top', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
  */
  
}
