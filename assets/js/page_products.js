function beginLoad() {
		if (parameters.indexOf("?") + 1 != 0) { //If there are parameters
			hasargs = true;
			parameters = parameters.substring(parameters.indexOf("?") + 1).split("&");
			var img = new Image();
			img.onerror = function() {
				console.log('Page not found! Redirecting...');
				loadfourohfour();
			}
			img.src = 'products/' + parameters[0] + '/product.jpg';
		} else hasargs = false;
	}

function loadfourohfour() {
	loadPath("404.html", loadfourohfour_cont);
}

function loadfourohfour_cont() {
		document.body.innerHTML = result.contentWindow.document.body.innerHTML;
		document.head.removeChild(result);
	}
	/*
function loadfourohfour() {
  // Webserver only
  var xmlhttp;
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      return document.getElementsByTagName('html')[0].innerHTML = xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET", "404.html", false);
  xmlhttp.send();
}
*/

function finishLoad() {
	document.getElementById('container').style.display = 'inherit'; // aka showDocument() @ util.js;
	if (productready) {
		productcategory = productinfo[0].substring(productinfo[0].indexOf(';') + 1).toLowerCase().trim(); //Seems to be a zero-width character somewhere, although trimming fixes the issue.
		productname = productinfo[0].substring(0, productinfo[0].indexOf(';'));
		if (productcategory == 'scuba/snorkeling gear') document.getElementById('product_location').innerHTML = "<a href='home.html'><img style='margin-right: 2px; padding-bottom: 4px; vertical-align: middle;' src='../assets/images/home.png' alt='Home logo'/>Home</a> > <a href='products.html'>Products</a> > <a href='scubasnorkelinggear'>" + productinfo[0].substring(productinfo[0].indexOf(';') + 1) + "</a> > <b>" + productname + "</b>";
		else document.getElementById('product_location').innerHTML = "<a href='home.html'><img style='margin-right: 2px; padding-bottom: 4px; vertical-align: middle;' src='../assets/images/home.png' alt='Home logo'/>Home</a> > <a href='products.html'>Products</a> > <a href='" + productcategory + "'>" + productinfo[0].substring(productinfo[0].indexOf(';') + 1) + "</a> > <b>" + productname + "</b>";
		document.getElementById('productname').innerHTML = productname;
		document.getElementById('productcode').innerHTML = "Product Code: " + parameters[0];
		if (productinfo[1].indexOf(";") > -1) {
			//Discount
			priceinfo = productinfo[1].split(';');
			document.getElementById('productdatabaseinfo_price').innerHTML = "Price: <strike>$" + priceinfo[0] + "</strike> $" + priceinfo[2] + "<br>" + priceinfo[1] + "% discount";
		} else document.getElementById('productdatabaseinfo_price').innerHTML = "Price: $" + productinfo[1]; //No discount
		if (productinfo[2] != 0) document.getElementById('productdatabaseinfo_availability').innerHTML = "Availability: <span style='color: green';>Product In Stock</span>";
		else document.getElementById('productdatabaseinfo_availability').innerHTML = "Availability: <span style='color: red';>Product Out Of Stock</span>";
		document.getElementById('productdescription').innerHTML = productinfo[3];
		if (productcategory == 'scuba/snorkeling gear') document.getElementById('product_category_scubasnorkeling_gear').className += ' active'; //Set product category
		else document.getElementById('product_category_' + productcategory).className += ' active';
		document.getElementById('productimage').src = "products/" + parameters[0] + "/product.jpg";
		$("#productbarcode").barcode(parameters[0], "code128");
		document.getElementById('ccontent').style.display = "inherit";
		delete hasargs;
		delete productinfo;
		delete productready;
	}
}