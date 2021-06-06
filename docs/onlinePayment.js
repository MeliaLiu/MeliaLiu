function pay()
{
    var success_elem = document.getElementById('success');
    success_elem.style.visibility = 'visible';

    var amount_elem = document.getElementById('cost');
    amount_elem.innerText = '0元';

    var btn_elem = document.getElementById('payBtn');
    btn_elem.disabled = true;
    
    var id_str = document.getElementById('id').innerText.split('#')[1];
    saveToFirebase(id_str);
}

function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}


function initializeWebPage()
{
    var id_str = getURLParameter('id');
    var cost_str = getURLParameter('cost');

    var id_elem = document.getElementById('id');
    id_elem.innerText = '订单编号#' + id_str;

    var cost_elem = document.getElementById('cost');
    cost_elem.innerText = '¥ ' + cost_str;

    check();
}

function saveToFirebase(id)
{

    var elem = document.getElementById('cost');

    firebase.database().ref(id).set({
        status: true
      });
}

function check(id)
{
    var id_str = document.getElementById('id').innerText.split('#')[1];
    var ref = firebase.database().ref();

    var status;

    ref.once("value")
    .then(function(snapshot) {
        status = snapshot.hasChild(id_str);
        if (status == true)
        {
            pay();
        }
    });
}

