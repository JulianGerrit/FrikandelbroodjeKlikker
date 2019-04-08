/*
  TODO LIST:
    - Upgrades
*/

var count = 0;
var incr = 1;


// TODO: Animate when clicked
function add()
{
  count += incr;
  refresh();
}

function refresh()
{
  document.getElementById("counter").value = count;
  // Element.value = variable
  // Add each element containing a variable here
}

var storage = {

  save: function()
  {
    cookies.set("frikandelbroodjes", count.toString());
  },

  load: function()
  {
    count = parseInt(cookies.get("frikandelbroodjes"));
    refresh();
  },

  reset: function()
  {
    // Delete cookies or not???
    count = 0;
    incr = 1;
    refresh();
  }

}

var cookies = {

  get: function(name)
  {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  },

  set: function(name, value, days)
  {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  },

  delete: function(name)
  {
    document.cookie = name+'=; Max-Age=-99999999;';
  }

}