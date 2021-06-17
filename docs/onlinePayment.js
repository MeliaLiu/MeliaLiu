function pay()
{
    var success_elem = document.getElementById('success');
    success_elem.style.visibility = 'visible';
    var code_elem = document.getElementById('code');
    var id_str = getURLParameter('id');
    var cost_str = getURLParameter('cost');
    code_elem.innerText = '验证码：'+ encode(id_str, cost_str);
    

    var amount_elem = document.getElementById('cost');
    amount_elem.innerText = '待支付¥0';

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

function setProductList(products_string)
{
    var products_elem = document.getElementById('products');
    var products = products_string.split('+');
    for (var i = 0; i < products.length; i++)
    {
        var attributes = products[i].split('_');

        products_elem.innerHTML = products_elem.innerHTML + decodeURI(attributes[0]) + ' - ' + attributes[1] + '<br>';
    }
}


function initializeWebPage()
{
    var id_str = getURLParameter('id');
    var cost_str = getURLParameter('cost');
    var products_string = getURLParameter('products');

    var id_elem = document.getElementById('id');
    id_elem.innerText = '订单编号#' + id_str;

    setProductList(products_string);

    var cost_elem = document.getElementById('cost');
    cost_elem.innerText = '待支付¥' + cost_str;

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

function encode(id_str, cost_str)
{
    var id = parseInt(id_str, 10);
    var cost = parseInt(cost_str, 10);
    var x = id*cost + Math.round(2*Math.sqrt(cost+2001)+2*Math.sqrt(id+620));
    var code = Math.round(Math.log(x+2001)*(x+620));
    var oxCode = code.toString(16);

    return oxCode;
}


