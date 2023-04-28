document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
});
//navegacion
function eventListeners() {
    const button = document.querySelector('#button-responsive');
    const nav = document.querySelector('#nav');

    button.addEventListener('click', ()=> {
        nav.classList.toggle('active');
    })
}  


// Obtener todos los botones
const buttons = document.querySelectorAll('.button');

// Agregar un controlador de eventos de clic para cada botón
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Eliminar la clase "selected" de los demás botones
    buttons.forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.classList.remove('selected');
      }
    });

    // Agregar la clase "selected" al botón actual
    button.classList.add('selected');
  });
});

//topic para peticion (TODO EL TEXTO A PETICION SE TINE QUE JUNTAR - SIN SALTO DE LINEA)
const topic = document.querySelector('#topic');
const textarea = document.querySelector('#textarea');
const textResponse = document.querySelector('#textResponse');
const alertMesage = document.querySelector('#alert');
const form = document.querySelector('#form');
const copyBoton = document.querySelector('#copyBoton');
const spinner = document.querySelector('#spinner');

const objSearch = {
    topicName: '',
    textSearch: ''
}

document.addEventListener('DOMContentLoaded', () => {
    topic.addEventListener('change', readValue );
    textarea.addEventListener('blur', readValue );
    form.addEventListener('submit', sendForm );

})

function readValue(e) {
    objSearch[e.target.name] = e.target.value; //escribe en el objecto
   /*  if( objSearch[e.target.name] = e.target.value.trim() === ''){
        showAlert();
    } */
}

function sendForm(e) {
    e.preventDefault();

    //validacion
    const {topicName, textSearch} = objSearch;
    if(textSearch.trim() === '' || topicName === ''){
        showAlert('todos los campos son abligatorios');
        return;
    }

    //consultar API
    requestAPI();


}

function showAlert(alert){
    const thereError = document.querySelector('.error');

    if(!thereError){
        const divAlert = document.createElement('div');
        divAlert.classList.add('error');
        divAlert.textContent = alert;
        alertMesage.appendChild(divAlert);
    
        setTimeout(() => {
            divAlert.remove();
        }, 5000);
    }
   
}

function requestAPI() {
    const {topicName, textSearch} = objSearch;

    if(topicName === 'summarizations'){
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer gAAAAABkSHh_nHtzA3A-p10VpTteg5HpTgPkj2jta97m_w9bNOIAMt52PHdLYN5gw47QDJyX_jUYz0FXpIE8a7L34REwpJpWqSocQPLGn8-Jx-P8ogMO4WNE5TCXB1hrmOJueKRfh-3l'
            },
            body: `{"max_tokens":256,"model":"sophos-1","n":1,"source_lang":"es","target_lang":"es","temperature":0.7,"text":"${textSearch}"}`
          };

          showSpinner();
          
          fetch(`https://api.textcortex.com/v1/texts/${topicName}`, options)
            .then(response => response.json())
            .then(response => showResponse(response.data.outputs[0].text))
            .catch(err => console.error(err));
    }else{
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer gAAAAABkSHh_nHtzA3A-p10VpTteg5HpTgPkj2jta97m_w9bNOIAMt52PHdLYN5gw47QDJyX_jUYz0FXpIE8a7L34REwpJpWqSocQPLGn8-Jx-P8ogMO4WNE5TCXB1hrmOJueKRfh-3l'
            },
            body: `{"max_tokens":256,"model":"sophos-1","n":1,"source_lang":"es","target_lang":"es","temperature":0.7,"text":"${textSearch}"}`
          };
    
          showSpinner();
          
          fetch(`https://api.textcortex.com/v1/texts/${topicName}`, options)
            .then(response => response.json())
            .then(response => showResponse(response.data.outputs[0].text))
            .catch(err => console.error(err));
    }

}

function showResponse(response){
        spinner.classList.add('hidden');
        textResponse.value = response;

        copyBoton.addEventListener('click', () => {
            textResponse.select();
            document.execCommand('copy');
            alert('Contenido copiado al portapapeles!');
          });
}

function showSpinner() {
    spinner.classList.remove('hidden');
}  


