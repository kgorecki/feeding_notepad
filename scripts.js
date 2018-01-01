function mysqlTimeStampToDate(timestamp)
{
  //function parses mysql datetime string and returns javascript Date object
  //input has to be in this format: 2007-06-05 15:26:02
  var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
  var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
  return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
}

function getFeedingTimes()
{
  $.getJSON('api/v1.php?operation=select', function(data)
  {
    var feeding_content = "<table><tr><td>Czas</td><td>Typ</td><td>Komentarz</td></tr>";
    for (i = 0; i < data.length; i++)
    {
      var comment = data[i].comment;
      feeding_content += "<tr><td>" + mysqlTimeStampToDate(data[i].feeding_time)
                      + "</td><td>" + data[i].type_name
                      + "</td><td>" + (comment == undefined ? '' : comment) + "</td></tr>";
    }
    feeding_content += "</table>";
    document.getElementById("feeding_content").innerHTML = feeding_content;
  });
}

function setFeeding(type)
{
  $.get('api/v1.php?operation=insert&typeName=' + encodeURI(type), function()
  {
    alert("Saved!");
    location.reload();
  });  
}

function getButtons()
{
  $.getJSON('api/v1.php?operation=getTypes', function(data)
  {
//    var feeding_content = "<table><tr><td>Czas</td><td>Typ</td><td>Komentarz</td></tr>";
    var feeding_content = "";
    for (i = 0; i < data.length; i++)
    {
      feeding_content += "<button onClick='setFeeding(\""
        + data[i].type_name
        + "\")' class=\"" + data[i].type_colour
        + " w3-btn w3-block w3-jumbo w3-wide mybutton\"><b>"
        + data[i].type_name + "</b></button><br />";
    }
    document.getElementById("buttons").innerHTML = feeding_content;
  });
}