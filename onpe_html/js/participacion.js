const getVotos = async () => {
    const id = (new URLSearchParams(window.location.search)).get('id')
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/participacion/${id}`)
    //const data = await fetch(`http://localhost/onpe_sweb_php/participacion/${id}`)
    
    if (data.status == 200) {
        const votos = await data.json()
        const parametros = id.split("/")

        const mAmbito = [["Departamento","Provincia","Distrito"],["Continente","Pais","Ciudad"]]
        const bNacional = parametros[0] == 'Nacional'
        const length = parametros.length

        let ambito = 'Ambito : ' + parametros[0]
        
        if ( length > 1 ) ambito += "<br>" + mAmbito[bNacional ? 0 : 1][0] + ' : ' + parametros[1]
        if ( length > 2 ) ambito += "<br>" + mAmbito[bNacional ? 0 : 1][1] + ' : ' + parametros[2]
        if ( length > 3 ) ambito += "<br>" + mAmbito[bNacional ? 0 : 1][2] + ' : ' + parametros[3]
        document.getElementById('ambito').innerHTML = ambito

        if (length == 4) {
            document.getElementById('consulta-participacion').innerHTML = ''
            return
            }

        let html = ''
        votos.data.forEach(voto => {
        html +=`
            <tr onclick="location.href='./participacion_total.html?id=${id}/${voto.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                <td>${voto.DPD}</td>
                <td>${voto.TV}</td>
                <td>${voto.PTV}td>
                <td>${voto.TA}</td>
                <td>${voto.PTA}</td>
                <td>${voto.EH}</td>
            </tr>
        `
    });

        document.getElementById('dpd').innerHTML = mAmbito[ bNacional ? 0 : 1 ][ length - 1 ].toUpperCase()
        document.getElementById('resultados').innerHTML += html
    }
}

getVotos()