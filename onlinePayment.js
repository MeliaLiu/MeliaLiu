function pay()
{
    var success_elem = document.getElementById('success');
    success_elem.style.visibility = 'visible';

    var amount_elem = document.getElementById('cost');
    amount_elem.innerText = '0元';

    var btn_elem = document.getElementById('payBtn');
    btn_elem.disabled = true;
    
    var id_str = document.getElementById('id').innerText.split('#')[1];
    // localStorage.setItem(id_str, true);
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

function clearStorage()
{
    localStorage.clear();
}

function initializeWebPage()
{
    var id_str = getURLParameter('id');
    var cost_str = getURLParameter('cost');

    var id_elem = document.getElementById('id');
    id_elem.innerText = '订单编号#' + id_str;

    var cost_elem = document.getElementById('cost');
    cost_elem.innerText = '¥ ' + cost_str;

    var status = localStorage.getItem(id_str);
    if (status != null)
    {
       pay();
    }
}

function saveToFirebase(id)
{
    var orderObject = {id: id};

    firebase.database().ref('paid-order-ids').push().set(orderObject);

}

function readFromFirebase(id)
{
    const dbRef = firebase.database().ref();
    dbRef.child("paid-order-ids").child(id).get().then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    });
}




