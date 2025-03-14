/* Loads all dispensers in user -> runs when the page reloads*/
function LoadAllDispensers() {
    var UserData = JSON.parse( localStorage.getItem("UserData") );

    fetch(/* endpoint -> fetchDispensers + UserData.id */)
    .then(response => response.json())
    .then(data => {
        if(!isEmpty(data)) {
            data.forEach(dispenser => {
                gerarCard(dispenser.nome, dispenser.horarios);
           }); 
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

/* add new dispenser */
document.querySelector('#ExemploModalCentralizado .modal-footer button.btn-primary')
  .addEventListener('click', function() {

    var nomeEvento = document.getElementById('fname').value;
    var horarios = [document.getElementById('appt').value];
    var aux;

    // limita o numero de horarios para 10
    for (var i=1; i<10; i++) {
        try {
            aux = document.getElementById('appt'+i).value ;
        } catch (error) {
            continue;
        }
        horarios.push(aux);
    }

    fetch(/* endpoint -> PostDispenser + nome + horarios[] */)
    .then(response => response.json())
    .then(data => {
        if(!isEmpty(data)) {
            location.reload();
        } else {
            return /* mensagem de erro */
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


/* Fatch Unique dispenser */
// function SelectUniqueDispenser(dispenserID) {
//     fetch(/* endpoint -> GetUniqueDispenser (dispenserID) */)
//     .then(response => response.json())
//     .then(data => {
//         if(!isEmpty(data)) {
//             /* open Dispenser PopUp updating with the data we got */
//         } else {
//             return /* mensagem de erro */
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

/* update dispenser */
// function UpdateDispenser(dispenserID, data) {
//     fetch(/* endpoint -> UpdateDispenser (dispenserID, name, horarios) */)
//     .then(response => response.json())
//     .then(data => {
//         if(!isEmpty(data)) {
//             location.reload();
//         } else {
//             return /* mensagem de erro */
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }


/* remove Dispenser */
// function RemoveDispenser(dispenserID) {
//     fetch(/* endpoint -> RemoveDispenser (dispenserID) */)
//     .then(response => {
//         if (response.ok) {
//             return /* confirm delete message */
//         } else {
//           return /* error message */
//         }
//       })      
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }


function gerarCard(nome, horarios) {
    const card = document.createElement('div');
    card.classList.add('card');

    const div2 = document.createElement('div');
    const p2 = document.createElement('p');
    p2.textContent = nome+': '; // nome do dispenser
    div2.appendChild(p2);
    p2.style.fontSize = "21px"
    card.appendChild(div2);

    horarios.forEach ( horario => {
        const div1 = document.createElement('div');
        div1.style.display = "flex"
        div1.style.alignItems = "flex-end"

        const img = document.createElement('img');
        img.src = 'img/clock.png';
        img.style.width = "21px"
        img.style.height = '21px'
        img.classList.add('card-image');
        const p1 = document.createElement('p');
        p1.style.fontSize = "15px"

        p1.textContent = 'Horário:' + horario; // horario
        p1.style.margin = '0px'
        p1.classList.add('card-text-1');
        div1.appendChild(img);
        div1.appendChild(p1);
        card.appendChild(div1);
    }); 
    
    const div3 = document.createElement('div');
    card.appendChild(div3);

    cardContainer.appendChild(card);
}

