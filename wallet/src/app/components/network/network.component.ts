import { Component, OnInit, DoCheck }  from '@angular/core'
import { MarketService } from '../../services/market.service';
import { Web3 } from '../../services/web3.service';
import { AccountService } from '../../services/account.service';
import { DialogService } from '../../services/dialog.service';

import { ContractStorageService } from '../../services/contractStorage.service';
import { LSCXContractService } from '../../services/LSCX-contract.service';
import { CustomContractService } from '../../services/custom-contract.service';

@Component({
    selector: 'app-network',
    templateUrl: './network.component.html',
})
export class NetWorkComponent implements OnInit, DoCheck{
    networks: any[] = [{chain:1, name: "Main Ethereum Network"}, {chain:3, name: "Ropsten Test Network"}]
    net: any;
    show: boolean = false;
    loading: boolean =  false;
    dialog;
    constructor(private _market: MarketService, private _web3: Web3, private _account: AccountService, private _dialog: DialogService, private _LSCXcontract: LSCXContractService, private _customContract: CustomContractService, private _contractStorage: ContractStorageService) {

    }
    ngOnInit(){
        this.net = (this._web3.network == 1)? this.networks[0]: this.networks[1];
    }

    ngDoCheck(){
        if(this._account.updated == true && this.loading){
            this.loading = false;
            this.dialog.close();
            this.show = !this.show;
        }
    }

    toggleShow(){
        this.show = !this.show;
    }

    async selectNetwork(network: any){
        if(this.net.chain == network.chain ){
            this.show = !this.show;
            return false
        }
        this._account.updated = false;
        this.loading = true;
        this.dialog = this._dialog.openLoadingDialog();
        this.net = network;
        this._web3.setNetwork(network.chain);
        
        if('address' in this._account.account){
                this._contractStorage.setAccContracts();
                this._market.setMarket();
                this._market.resetSocket();
                this._LSCXcontract.reset();
                this._customContract.reset();
                await this._account.refreshAccountData();

        }else{
            this.dialog.close();
            this.show = !this.show;
        }
        
    }
}
