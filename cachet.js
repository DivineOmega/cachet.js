
function cachetjs()
{
    var baseURL = '';
    var email = '';
    var password = '';
    
    this.setBaseURL = function(baseURL)
    {
        this.baseURL = baseURL;
    };
    
    this.setEmail = function(email)
    {
        this.email = email;
    };
    
    this.setPassword = function(password)
    {
        this.password = password;
    };
    
    this.sanityCheck = function(authorisationRequired)
    {
        if (!window.jQuery)
        {
            console.log('cachet.js: jQuery does not appear to be loaded. Please include it!');
        }
        else if (!this.baseURL)
        {
            console.log('cachet.js: The base URL is not set for your cachet instance. Set one with the setBaseURL method.');
            return false;
        }
        else if (authorisationRequired && !this.email)
        {
            console.log('cachet.js: The email is not set for your cachet instance. Set one with the setEmail method.');
            return false;
        }
        else if (authorisationRequired && !this.password)
        {
            console.log('cachet.js: The password is not set for your cachet instance. Set one with the setPassword method.');
            return false;
        }
        else
        {
            return true;
        }
    };
    
    this.get = function(type, callback)
    {
        if (type!=='components' && type!=='incidents' && type!=='metrics')
        {
            console.log('cachet.js: Invalid type specfied. Must be \'components\', \'incidents\' or \'metrics\'.');
        }
        
        if (!this.sanityCheck(false)) return;
        
        var url = this.baseURL + type;
        
        var successCallback = function(data)
        {
            if (data.data) data = data.data; // Remove the 'data' top level JSON element if present
            
            callback(data);
        };
        
        var options = { url: url, success: successCallback };
        
        $.ajax(options);
        
    };
    
    this.getByID = function(type, id, callback)
    {
        if (type!=='components' && type!=='incidents' && type!=='metrics')
        {
            console.log('cachet.js: Invalid type specfied. Must be \'components\', \'incidents\' or \'metrics\'.');
        }
        
        if (!this.sanityCheck(false)) return;
        
        var url = this.baseURL + type + '/' + id;
        
        var successCallback = function(data)
        {
            if (data.data) data = data.data; // Remove the 'data' top level JSON element if present
            
            callback(data);
        };
        
        var options = { url: url, success: successCallback };
        
        $.ajax(options);
    };
    
    this.getComponents = function(callback)
    {
        this.get('components', callback);
    };
    
    this.getComponentByID = function(id, callback)
    {
        this.getByID('components', id, callback);
    };
    
    this.setComponentStatusByID = function(id, status, callback)
    {
        if (!this.sanityCheck(true)) return;
        
        if (!id)
        {
            console.log('cachet.js: You attempted to set a component status by ID without specifying an ID.');
            return;
        }
        
        var url = this.baseURL + 'components/'+id;
        
        var successCallback = function(data)
        {
            if (data.data) data = data.data; // Remove the 'data' top level JSON element if present
            
            callback(data);
        };
        
        var requestData = 'status='+status;
        
        var options = { url: url, method: 'PUT', data: requestData, success: successCallback, headers: {"Authorization": "Basic " + btoa(this.email + ":" + this.password)} };
        
        $.ajax(options);
        
    };
    
    this.getIncidents = function(callback)
    {
        this.get('incidents', callback);
    };
    
    this.getIncidentByID = function(id, callback)
    {
        this.getByID('incidents', id, callback);
    };
    
    this.getMetrics = function(callback)
    {
        this.get('metrics', callback);
    };
    
    this.getMetricByID = function(id, callback)
    {
        this.getByID('metrics', id, callback);
    };
}
