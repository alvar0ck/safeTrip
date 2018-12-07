var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
var Token_key = 'auth-token';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storage, plt) {
        var _this = this;
        this.storage = storage;
        this.plt = plt;
        this.authenticationState = new BehaviorSubject(false);
        this.plt.ready().then(function () {
            _this.checkToken();
        });
    }
    AuthenticationService.prototype.checkToken = function () {
        var _this = this;
        this.storage.get(Token_key).then(function (res) {
            if (res) {
                _this.authenticationState.next(true);
            }
        });
    };
    AuthenticationService.prototype.login = function () {
        var _this = this;
        return this.storage.set(Token_key, 'Bearer 1234567').then(function () {
            _this.authenticationState.next(true);
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.storage.remove(Token_key).then(function () {
            _this.authenticationState.next(false);
        });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Storage, Platform])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map