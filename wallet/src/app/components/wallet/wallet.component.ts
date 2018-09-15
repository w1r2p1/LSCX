import { Component, OnInit } from '@angular/core'

import { AccountService } from '../../services/account.service'
import { Web3 } from '../../services/web3.service';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
})
export class WalletComponent implements OnInit {

  constructor(public _account:AccountService, private _web3: Web3) {
  }
  ngOnInit() {
  }
   
}
