"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// speakerForm.ts
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var fileUploadService_1 = require("../common/fileUploadService");
var SpeakerForm = (function () {
    function SpeakerForm(http, upload) {
        this.http = http;
        this.upload = upload;
        this.model = {};
        this.isBusy = false;
        this.error = null;
        this.imageError = null;
        this.onLoad();
    }
    SpeakerForm.prototype.onLoad = function () {
        var _this = this;
        this.isBusy = true;
        this.http.get(this.baseUrl)
            .subscribe(function (res) {
            _this.model = res.json();
        }, function (e) {
            _this.error = e.json();
        }, function () { return _this.isBusy = false; });
    };
    Object.defineProperty(SpeakerForm.prototype, "baseUrl", {
        get: function () {
            return '/' + this.moniker + "/api/cfs/speaker";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpeakerForm.prototype, "moniker", {
        get: function () {
            return window.location.pathname.split('/')[1];
        },
        enumerable: true,
        configurable: true
    });
    SpeakerForm.prototype.onSave = function () {
        var _this = this;
        this.isBusy = true;
        var url = this.baseUrl;
        this.http.post(url, this.model)
            .subscribe(function (res) {
            window.location.href = "./manage";
        }, function (e) {
            _this.error = e.response.json();
        }, function () { return _this.isBusy = false; });
    };
    SpeakerForm.prototype.onImagePicked = function (filePicker) {
        var _this = this;
        this.isBusy = true;
        this.upload.uploadFile(filePicker.files[0], this.baseUrl + "/headshot")
            .then(function (imageUrl) {
            _this.model.imageUrl = imageUrl;
        }, function (e) {
            _this.imageError = e.json();
        })
            .then(function () { return _this.isBusy = false; });
    };
    SpeakerForm.prototype.validImage = function () {
        if (this.model && this.model.imageUrl && this.model.imageUrl.length > 0)
            return true;
        return false;
    };
    SpeakerForm = __decorate([
        core_1.Component({
            selector: "speaker-form",
            moduleId: module.id,
            templateUrl: "speakerForm.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, fileUploadService_1.FileUploadService])
    ], SpeakerForm);
    return SpeakerForm;
}());
exports.SpeakerForm = SpeakerForm;
//# sourceMappingURL=speakerForm.js.map