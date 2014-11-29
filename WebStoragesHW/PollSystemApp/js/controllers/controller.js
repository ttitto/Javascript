var PollSystemApp = PollSystemApp || {};

PollSystemApp.Controller = (function(){
    function Controller(dataPersister, headers){
        this.persister = dataPersister;
        this.setHeaders(headers);
    }

    Controller.prototype.getHeaders  = function(){
        return this._headers;
    };

    Controller.prototype.setHeaders = function(headers){
      this._headers =   headers;
    };

    return Controller;
}());