const getCine = async()=> {
    const id = (new URLSearchParams(window.location.search)).get('id')
    const data = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`)

    if (data.status == 200 ){
        let cine = await  data.json ()
        cine = cine.data
        let html = `
            <h2>${cine.RazonSocial}</h2>
				<div class="cine-info">
					<div class="cine-info datos">
						<p>${cine.Direccion} - ${cine.Ciudad}</p>
						<p>Teléfono: ${cine.Telefonoss} anexo 865</p>
						<br/>
						<div class="tabla">
        
        
        `
            
		cine.tarifas.forEach((tarifa, index) => {
			let i = (index%2===0) ? 'fila': 'fila impar';
            html += `
                        <div class=${i}>
								<div class="celda-titulo">${tarifa.DiasSemana}</div>
								<div class="celda">${tarifa.Precio}</div>
							</div>
            
            `
					 
		});
		
        html += `
        
        </div>

        <div class="aviso">
            <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
        </div>
    </div>

    <img src="img/cine/1.2.jpg"/>

    <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>

    <div class="cine-info peliculas">
        <div class="tabla">
            <div class="fila">
                <div class="celda-cabecera">Películas</div>
                <div class="celda-cabecera">Horarios</div>
            </div>
        
        `	
						
		
		cine.peliculas.forEach((pelicula,i)=>{
			let index = (i%2 ===0) ? 'fila impar' : 'fila'
            html += `
            
            <div class=${index}>
								<div class="celda-titulo">${pelicula.Titulo}</div>
								<div class="celda">${pelicula.Horarios}</div>
							</div>
						</div>
					</div>
            
            `	
	
			
		});
        
        document.getElementById('contenido-interno').innerHTML = html;
    }
    
}

getCine()