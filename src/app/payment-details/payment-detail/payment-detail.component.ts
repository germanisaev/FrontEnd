import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
// import { UpperCaseText } from './../../shared/uppercase.directive';
// import { DatePipe } from '@angular/common';
// import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
// import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

// import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit, AfterViewChecked {

  cType = 'Invalid';
  cPattern = '';
  minLength = '';
  maxLength = '';

  selectedMonth: string;
  selectedYear: string;

  dataMonth: Array<Object> = [
    { id: 1, name: "01" },
    { id: 2, name: "02" },
    { id: 3, name: "03" },
    { id: 4, name: "04" },
    { id: 5, name: "05" },
    { id: 6, name: "06" },
    { id: 7, name: "07" },
    { id: 8, name: "08" },
    { id: 9, name: "09" },
    { id: 10, name: "10" },
    { id: 11, name: "11" },
    { id: 12, name: "12" }
  ];

  dataYear: Array<Object> = [
    { id: 1, name: "2020" },
    { id: 2, name: "2021" },
    { id: 3, name: "2022" },
    { id: 4, name: "2023" },
    { id: 5, name: "2024" },
    { id: 6, name: "2025" },
    { id: 7, name: "2026" },
    { id: 8, name: "2027" },
    { id: 9, name: "2028" },
    { id: 10, name: "2029" },
    { id: 11, name: "2030" },
    { id: 12, name: "2031" }
  ];

  // @ViewChild('element') element: ToastComponent;

  // @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  constructor(
    private service: PaymentDetailService,
    private toastr: ToastrService
    // private datePipe: DatePipe, 
    // private toastr: NotificationsService
  ) { } // , private toastr: ToastrService

  ngOnInit() {
    // this.toastrService.overlayContainer = this.toastContainer;
    // alert(this.service.formData.ExpirationDate);
    this.resetForm();
    this.ccFormat(this.service.formData.CardNumber);
  }

  ngAfterViewChecked() {
    // alert(this.service.formData.ExpirationDate);
    // console.log(this.service.formData.ExpirationDate);
    if(this.service.formData.ExpirationDate != "") {
      var expr = this.service.formData.ExpirationDate.toString();
      var ddyy = expr.split("/");
      this.selectedMonth = ddyy[0];
      this.selectedYear = "20"+ddyy[1];
      this.ccFormat(this.service.formData.CardNumber);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    }
  }

  onSubmit(form?: NgForm) {
    if (this.service.formData.PMId == 0) {
      // var MMYY = this.datePipe.transform(form.value.ExpirationDate, "MM/YY");
      // console.log(MMYY); //output - 14-02-2019
      // console.log(form.value.CardNumber);
      // form.value.CardNumber = form.value.CardNumber.split(' ').join('');
      // console.log(form.value.CardNumber);
      var fullYear = (new Date().getFullYear()).toString();
      var today = fullYear.substring(2, 4);
      var oDate = form.value.ExpirationDate.split("/");
      if (oDate[0] >= 1 && oDate[0] <= 12) {
        if (oDate[1] >= today) {

        } else {
          return;
        }
      } else {
        return;
      }
      this.insertRecord(form);
      this.cType == 'Invalid';
    } else {
      this.updateRecord(form);
      this.cType == 'Invalid';
    }
  }

  onClear() {
    this.resetForm();
    this.selectedMonth = "0";
    this.selectedYear = "0";
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        // form.value.CardOwnerName = form.value.CardOwnerName
        // var mm = document.getElementById("ddlByMonth")[0];
        // var yyyy = document.getElementById("ddlByYear")[0];
        // var yy = yyyy.options[yyyy.selectedIndex].value;
        // form.value.ExpirationDate = (mm.options[mm.selectedIndex].value + "/" + yy.substring(2, 4)).toString();
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Payment Detail Register');
        // this.onSuccess('Submitted successfully');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        // this.onError('Submitted error');
      })
  }

  onChange(event: any) {

    var expirationDate;
    if (event.target.value.length == 2)
      this.selectedMonth = event.target.value;
    else
      this.selectedYear = event.target.value;

    if(this.selectedMonth != null && this.selectedMonth != "0") {
      expirationDate = this.selectedMonth;
    }
    if(this.selectedYear != null && this.selectedYear != "0") {
      expirationDate = expirationDate + "/" + this.selectedYear.substring(2,4);
    }
    this.service.formData.ExpirationDate = expirationDate;
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Payment Detail Register');
        // this.onSuccess('Submitted successfully');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        // this.onError('Submitted error');
      })
  }
  /*
  onSuccess(message) {
    this.toastr.success('Success', message, {
      position: ['top', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message) {
    this.toastr.error('Error', message, {
      position: ['top', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onWarning(message) {
    this.toastr.warn('Waring', message, {
      position: ['top', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onInfo(message) {
    this.toastr.info('Info', message, {
      position: ['top', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
  */

  /*
  ^(?:4[0-9]{12}(?:[0-9]{3})?                                                       # Visa
 |  (?:5[1-5][0-9]{2}                                                               # MasterCard
 | 222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}3[47][0-9]{13}    # American Express
 |  3(?:0[0-5]|[68][0-9])[0-9]{11}                                                  # Diners Club
 |  6(?:011|5[0-9]{2})[0-9]{12}                                                     # Discover
 |  (?:2131|1800|35\d{3})\d{11}                                                     # JCB
)$
  function validatecardnumber(cardnumber) {
  // Strip spaces and dashes
  cardnumber = cardnumber.replace(/[ -]/g, '');
  // See if the card is valid
  // The regex will capture the number in one of the capturing groups
  var match = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|↵
(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])↵
[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(cardnumber);
  if (match) {
    // List of card types, in the same order as the regex capturing groups
    var types = ['Visa', 'MasterCard', 'Discover', 'American Express',
                 'Diners Club', 'JCB'];
    // Find the capturing group that matched
    // Skip the zeroth element of the match array (the overall match)
    for (var i = 1; i < match.length; i++) {
      if (match[i]) {
        // Display the card type for that group
        document.getElementById('notice').innerHTML = types[i - 1];
        break;
      }
    }
  } else {
    document.getElementById('notice').innerHTML = '(invalid card number)';
  }

*/

  ccFormat(event: any) {
    var cardnumber = event;
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
          switch (types[i - 1]) {
            case 'Visa':
              this.minLength = '13';
              this.maxLength = '16';
              break;
            case 'Master Card':
              this.minLength = '16';
              this.maxLength = '16';
              break;
            case 'Discover':
              this.minLength = '16';
              this.maxLength = '16';
              break;
            case 'American Express':
              this.minLength = '15';
              this.maxLength = '15';
              break;
            case 'Diners Club':
              this.minLength = '14';
              this.maxLength = '14';
              break;
            case 'JCB':
              this.minLength = '15';
              this.maxLength = '15';
              break;
          }
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

    // var typeCheck = ccNumString.substring(0, 2);
    // var lastCheck = ccNumString.substring(ccNumString.length-1, ccNumString.length);
    /*
    if (typeCheck.length == 2) {
      typeCheck = parseInt(typeCheck);
      console.log(typeCheck);
      if (typeCheck >= 40 && typeCheck <= 49) {
        this.cType = 'Visa';
        this.cPattern = '^4[0-9]{12}(?:[0-9]{3})?$';
      }
      else if (typeCheck >= 51 && typeCheck <= 55) {
        this.cType = 'Master Card';
      }
      else if ((typeCheck >= 60 && typeCheck <= 62) || (typeCheck == 64) || (typeCheck == 65)) {
        this.cType = 'Discover';
      }
      else if (typeCheck == 34 || typeCheck == 37) {
        this.cType = 'American Express';
      }
      else if(typeCheck == 30 && lastCheck == 40) {
        this.cType = 'Diners Club';
      }
      else if(typeCheck == 35 && lastCheck == 90) {
        this.cType = 'JCB';
      }
      else {
        this.cType = 'Invalid';
      }
    }
    console.log(this.cType);
    */
  }

}
