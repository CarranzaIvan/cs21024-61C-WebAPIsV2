/*Iván Alexander Carranza Sánchez*/codigoCat
var fila1="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td>";
//Fila de botones
var fila2="<th><button class ='eliminar' onclick='return eliminarProducto(this);'><b>Eliminar</b></button></th><th><button class ='actualizar' onclick='return actualizarProducto(this);'><b>Actualizar</b></button></th></tr>";
var fila=fila1+fila2;
var productos=null;

var orden=0; 
var bandera=0;
/*Asignacion de codigos*/
function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   

//Validar si es URL
function esURL(cadena) {
	// Expresión regular para validar una URL
	var patronURL = /^(http(s)?:\/\/)?[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\S*)?$/i;;
	
	return patronURL.test(cadena);
}

//Eliminar un producto
function eliminarProducto(boton) 
{
	// Obtén la fila actual
	var fila = boton.parentNode.parentNode;
	
	// Obtén los elementos de la fila
	var celdas = fila.getElementsByTagName('td');
	// Obtenemos el id
	var informacionFila = celdas[0].textContent;
	fetch("https://api-generator.retool.com/Y2YMPb/productos/"+informacionFila,{method:"delete"}).then(res=>res.json()).then(data=>productos=data); 
	obtenerProductos();
	obtenerProductos();
	orden=0;
	obtenerProductos();
	obtenerProductos();
	return false;	
}

var idEnFunción;
function actualizarProducto(boton) 
{
	// Obtén la fila actual
	var fila = boton.parentNode.parentNode;

	// Obtén los elementos de la fila
	var celdas = fila.getElementsByTagName('td');
	
	var priceString = celdas[2].textContent;
	var cleanPriceString = priceString.replace(/[^0-9.]/g, "");
	var price = parseFloat(cleanPriceString);

	//ID del producto
	var numID= celdas[0].textContent;
	idEnFunción=numID;

	// Todo el array de ID según el orden
	var tabla = document.getElementById("tabla");
  	var columnaIndex = 0;
  	var filas = tabla.rows;
  	var columna = [];

	//Obtener posicion actual
  	for (var i = 1; i < filas.length; i++) { // Comienza desde 1 para omitir la fila de encabezado
		var celda = filas[i].cells[columnaIndex];
		columna.push(celda.textContent);
  	}
	var posicion = columna.indexOf(numID);
	posicion= posicion+1;
	//Obtenemos el enlace
	var tabla = document.getElementById("tabla");
	var filas = tabla.getElementsByTagName("tr");
	var fila = tabla.rows[posicion];
	var celdaImagen = fila; 
	var imagen = celdaImagen.querySelector("img"); 
	var urlImagen = imagen.src;
	//var urlImagen = imagen.src;
	console.log(urlImagen);

	// Obtén el elemento select por su ID
	var select = document.getElementById("tipoIn");
	document.getElementById("imagenIn").value= urlImagen;
	document.getElementById("precioIn").value= price;
	document.getElementById("tituloIn").value= celdas[3].textContent;
	document.getElementById("descripcionIn").value= celdas[4].textContent;
	select.value= celdas[5].textContent;

	// Obtén el botón por su ID
	var editar = document.getElementById("aceptar");

	// Cambia la acción del botón
	editar.onclick = editarProducto;

	return false;
}

function editarProducto() {

	// Obtén la tabla por su ID 
	var TituloEntrada = document.getElementById("tituloIn").value;
	var ImagenEntrada = document.getElementById("imagenIn").value;
	var PrecioEntrada = document.getElementById("precioIn").value;
	var DesEntrada = document.getElementById("descripcionIn").value;
	var TipoEntrada = document.getElementById("tipoIn").value;
	if( esURL(ImagenEntrada) == true & ImagenEntrada != '' & PrecioEntrada  != '' & TituloEntrada != '' & DesEntrada != '' & TipoEntrada != '')
	{
		/*Creamos el objeto Nuevo */
		var producto={
		id:idEnFunción,
		image:ImagenEntrada,
		price:PrecioEntrada,
		title:TituloEntrada,
		category:TipoEntrada,
		description:DesEntrada,
		}; 
		var listadoProductos;
		fetch("https://api-generator.retool.com/Y2YMPb/productos/"+idEnFunción,{method:"PUT",body: JSON.stringify(producto),
		headers: {
			'Accept': 'application/json','Content-type': 'application/json; charset=UTF-8',
		}}).then(res=>res.json()).then(data=>listadoProductos=data);

		//Limpieza del input
		document.getElementById("imagenIn").value='';
		document.getElementById("precioIn").value='';
		document.getElementById("tituloIn").value='';
		document.getElementById("descripcionIn").value='';
		// Obtén el botón por su ID
		var editar = document.getElementById("aceptar");
		// Cambia la acción del botón
		editar.onclick = guardarProducto;
		obtenerProductos();
		obtenerProductos();
		obtenerProductos();
		obtenerProductos();
		orden=0;
		bandera=1;
	}
	return false;
}

//Almacenar un nuevo producto
function guardarProducto() {
	var numID;
	//Información de Tabla
	var tabla = document.getElementById('tabla');
	//Arreglo que almacenara columnas
	var datosColumna = [];

	for (var i = 1; i < tabla.rows.length; i++) { 
		var celda = tabla.rows[i].cells[1];
		datosColumna.push(celda.textContent);
	}
	//ID del nuevo objeto
	numID = 1 + parseFloat(datosColumna.length);
	
	var ImagenEntrada = document.getElementById("imagenIn").value;
	var PrecioEntrada = document.getElementById("precioIn").value;
	var TituloEntrada = document.getElementById("tituloIn").value;
	var DesEntrada = document.getElementById("descripcionIn").value;
	var TipoEntrada = document.getElementById("tipoIn").value;
	if( esURL(ImagenEntrada) == true & ImagenEntrada != '' & PrecioEntrada  != '' & TituloEntrada != '' & DesEntrada != '' & TipoEntrada != '')
	{
		/*Creamos el objeto Nuevo */
		var producto={
		id:numID,
		image:ImagenEntrada,
		price:PrecioEntrada,
		title:TituloEntrada,
		category:TipoEntrada,
		description:DesEntrada,
		}; 
		var listadoProductos;
		fetch("https://api-generator.retool.com/Y2YMPb/productos",{method:"POST",body: JSON.stringify(producto),
		headers: {
			'Accept': 'application/json','Content-type': 'application/json; charset=UTF-8',
		}})
		.then(response=>response.json()).then(data=>listadoProductos=data);

		//Limpieza del input
		document.getElementById("imagenIn").value='';
		document.getElementById("precioIn").value='';
		document.getElementById("tituloIn").value='';
		document.getElementById("descripcionIn").value='';
		
		obtenerProductos();
		obtenerProductos();
		orden=1;
		obtenerProductos();
		obtenerProductos();
		
	}
	return false;
}   

/*Listar columnas*/
function listarProductos(productos) {
		console.log("Esta es la bandera "+bandera);
		console.log("Esta es el orden "+orden);
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");   
	  if(orden==0) {
		if (bandera==1)
		{
			console.log("Aqui entro");
			console.log(bandera);
			bandera=0;
		}
		else {orden=-1; precio.innerHTML="Precio";} 
	  }
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}

	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
	}
}

/*Obtiene productos del API*/
function obtenerProductos() {
	
	fetch("https://retoolapi.dev/Y2YMPb/productos")
	.then(res=>res.json())
		.then(data=>{
			productos=data;
			productos.forEach(
				function(producto){
					producto.price=parseFloat(producto.price)
				}
			);
			listarProductos(data);
	})
	console.log("Aqui llego");
}


/*Orden Descendente*/
function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

/*Orden Ascendente*/
function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}

/*Animación de Carga*/
var Loading=(loadingDelayHidden=0)=>{let loading=null;const myLoadingDelayHidden=loadingDelayHidden;let imgs=[];let lenImgs=0;let counterImgsLoading=0;function incrementCounterImgs(){counterImgsLoading+=1;if(counterImgsLoading===lenImgs){hideLoading()}}function hideLoading(){if(loading!==null){loading.classList.remove('show');setTimeout(function(){loading.remove()},myLoadingDelayHidden)}}function init(){document.addEventListener('DOMContentLoaded',function(){loading=document.querySelector('.loading');imgs=Array.from(document.images);lenImgs=imgs.length;if(imgs.length===0){hideLoading()}else{imgs.forEach(function(img){img.addEventListener('load',incrementCounterImgs,false)})}})}return{'init':init}}

Loading(100).init();