"use strict";

let playState = false;
let currentWord;
let hintWord;
let indexOf = [];
let rightLetters = [];
let wrongLetters = [];
let errorCount = 0;
let count = 0;
let currentWordLength = 0;

let wordsArray = ["FACA", "TESOURA", "DADO", "CELULAR", "ARGENTINA", "VENEZUELA", "PORTUGAL", "CHINA", "ARROZ", "BANANA", "SALADA", "LEITE"]
let hint = ["OBJETO", "OBJETO", "OBJETO", "OBJETO","PAÍS", "PAÍS","PAÍS","PAÍS","ALIMENTO", "ALIMENTO", "ALIMENTO", "ALIMENTO"];

//----------------------------------------------------------------------//
const containerLines = document.querySelector(".container-lines");
const wrongLettersHTML = document.querySelectorAll('.wrong-letters');
const newGameBtn = document.querySelector(".new-game");
const hintHTML = document.querySelector(".hint");
const modalLoseHTML = document.querySelector(".modal-lose");
const modalHTML = document.querySelector(".modal");
const gallowsHTML = document.querySelector(".gallows");

const eraseData = function() {
   wrongLetters = [];
   rightLetters = [];
   document.querySelectorAll('.wrong-letters').forEach(function(wrong) {
      wrong.remove();
   })
   errorCount = 0;
   count = 0;
   document.querySelectorAll(".lines").forEach(function(line) {
      line.remove();
   }); 
   gallowsHTML.src = "forca.png";
}

//----------------------------------------------------------------------//


newGameBtn.addEventListener('click', function() {  

   playState = true;

   if (count !== currentWordLength) {
      wordsArray.push(currentWord);
      hint.push(hintWord);
   }

   eraseData();
    
   let randomIndex = Math.floor(Math.random() * wordsArray.length)
   currentWord = wordsArray[randomIndex];
   currentWordLength = currentWord.length;

   for (let i = 0; i < currentWord.length; i++) {
    containerLines.innerHTML += `<span class="lines">_</span>`;
   }

   hintHTML.textContent = hint[randomIndex];
   hintWord = hint[randomIndex];
   hint.splice(randomIndex, 1);
   wordsArray.splice(randomIndex, 1);
}) 

document.addEventListener("keydown", function(event) {

      if (event.keyCode >= 65 && event.keyCode <= 90 && playState == true) {
         if (modalHTML.classList.contains("hidden")) {
            
            let key = event.key.toUpperCase();
      
            if(wrongLetters.includes(key)) {
               alert("Letra repetida");
               
            } else {      
      
               if (!currentWord.includes(key)) {
                  if (event.keyCode >= 65 && event.keyCode <= 90) {
                     wrongLetters.push(key);
                     errorCount += 1;
                     document.querySelector(".wrong-letters-div").innerHTML += `<span class="wrong-letters">${key}</span>`;

                     switch (errorCount) {
                        case 1 :
                           gallowsHTML.src = "miranha1.png";
                        break;

                        case 2 :
                           gallowsHTML.src = "miranha2.png";
                        break;

                        case 3 :
                           gallowsHTML.src = "miranha3.png";
                        break;

                        case 4 :
                           gallowsHTML.src = "miranha4.png";
                        break;

                        case 5 :
                           gallowsHTML.src = "miranha5.png";
                        break;

                        case 6 :
                           gallowsHTML.src = "miranha6.png";
                        break;
                     }
                  }
                 
                  if (errorCount > 5) {
                     playState = false;
                     modalLoseHTML.classList.remove("hidden");
                      setTimeout(function() {modalLoseHTML.classList.add("hidden")}, 2000); 
                  }
      
               } else {  
                  if (!rightLetters.includes(key)) {
                     rightLetters.push(key);  

                     for (let i = 0; i < currentWord.length; i++) {
                        if (key == currentWord[i]) {
                           indexOf.push(i);
                           count += 1;
                           
                           let lines = document.querySelectorAll(".lines");
                           
                           for (let i = 0; i < indexOf.length; i++){
                              lines[indexOf[i]].textContent = key;
                           }      
                       }   
                     } 
                  }     
               }  
            }
            
            if (count === currentWordLength) {
               document.querySelector(".modal-win").classList.remove("hidden")
               
               setTimeout(function() {document.querySelector(".modal-win").classList.add("hidden")}, 2000);

               playState = false;
      
               if (wordsArray.length == 0) {
                  alert("Você acertou todas as palavras");
               }
            }
            indexOf = [];  
         }
      }  
})

document.querySelector(".resign").addEventListener ("click", function() {
   location.reload();
})

const textArea1 = document.querySelector(".text-area1");
const textArea2 = document.querySelector(".text-area2");

document.querySelector(".add-word").addEventListener("click", function() {
   document.querySelector(".modal").classList.remove("hidden");
})

document.querySelector(".btn-add-word").addEventListener("click", function() {

   if (textArea1.value && textArea2.value) {
      wordsArray.push(textArea1.value.toUpperCase());
      hint.push(textArea2.value.toUpperCase());
      textArea1.value = "";
      textArea2.value = "";
   } 
   
})

document.querySelector(".btn-close-modal").addEventListener("click", function() {
   document.querySelector(".modal").classList.add("hidden");
})

