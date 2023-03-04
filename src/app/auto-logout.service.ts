import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from "./auth.service";
import { DialogService } from "primeng/dynamicdialog";
//import { IdledialogComponent } from './idledialog/idledialog.component';

let AUTO_LOGOUT_TIME // in mins
let SESSION_TIME // in mins
const CHECK_INTERVAL = 15 // in ms
const STORE_KEY = 'lastAction';
@Injectable()
export class AutoLogoutService {
    isFirst: boolean = true;
    token:string;
    public getLastAction() {
        return parseInt(localStorage.getItem(STORE_KEY));
    }
    public setLastAction(lastAction: number) {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    }

    constructor(private router: Router,private dialogService: DialogService, private authService: AuthService,) {
        this.check();
        this.initListener();
        this.initInterval();
        localStorage.setItem(STORE_KEY, Date.now().toString());
    }

    getLoginTimeout() {
        // this.http.doget('get_login_timeout').subscribe((res:any)=>{
        //   MINUTES_UNITL_AUTO_LOGOUT = res.data;
        // })
        SESSION_TIME = 1;
        AUTO_LOGOUT_TIME = 1;
        this.token = localStorage.getItem('careToken');
    }

    initListener() {
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('mouseover', () => this.reset());
        document.body.addEventListener('mouseout', () => this.reset());
        document.body.addEventListener('keydown', () => this.reset());
        document.body.addEventListener('keyup', () => this.reset());
        document.body.addEventListener('keypress', () => this.reset());
    }

    reset() {
        this.setLastAction(Date.now());
    }

    initInterval() {
        setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }

    check() {
        const now = Date.now();
        const timeleft = this.getLastAction() + SESSION_TIME * 60 * 1000;
        const logoutTimeleft = this.getLastAction() + AUTO_LOGOUT_TIME * 60 * 1000;
        const diff = timeleft - now;
        const logoutDiff = logoutTimeleft - now;

        const isTimeout = diff < 0;
        const isLogoutTime = logoutDiff < 0;

        // if ((isTimeout && this.isFirst) && this.token) {
        //     this.isFirst = false;
        //     const ref = this.dialogService.open(IdledialogComponent,
        //         {
        //             header: 'Session Timeout',
        //             width: '40%'
        //         })
        //     ref.onClose.subscribe(res => {
        //         this.isFirst = true;
        //     });
        // }

        if (isLogoutTime && this.token) {
            this.authService.logout();
            this.dialogService.dialogComponentRefMap.forEach(dialog => {
                dialog.destroy();
            });
        }

    }
}}