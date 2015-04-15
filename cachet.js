
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
    
    this.sanityCheck = function()
    {
        if (!this.baseURL)
        {
            console.log('cachet.js: No base URL set for your cachet instance. Set one with the setBaseURL method.');
            return false;
        }
        else
        {
            return true;
        }
    };
    
    this.getComponents = function(callback)
    {
        if (!this.sanityCheck()) return;
        
        var url = this.baseURL + 'components';
        
        var result = null;
        
        var successCallback = function(data)
        {
            if (data.data) data = data.data; // Remove the 'data' top level JSON element if present
            
            callback(data);
        };
        
        var options = { url: url, success: successCallback, username: this.email, password: this.password };
        
        $.ajax(options);
        
    };
    
    this.getComponentByID = function(id, callback)
    {
        if (!this.sanityCheck()) return;
        
        if (!id)
        {
            console.log('cachet.js: You attempted to retrieve a component by ID without specifying an ID.');
            return;
        }
        
        var url = this.baseURL + 'components/'+id;
        
        var result = null;
        
        var successCallback = function(data)
        {
            if (data.data) data = data.data; // Remove the 'data' top level JSON element if present
            
            callback(data);
        };
        
        var options = { url: url, success: successCallback, username: this.email, password: this.password };
        
        $.ajax(options);
        
    };
}
