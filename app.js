function showError(container, errorMessage) {
  container.className = 'error';
  var element = document.createElement("p"),
      resultMes = document.getElementById('result');
  resultMes.classList.toggle("error");
  element.appendChild(document.createTextNode(errorMessage + '\n'));
  document.getElementById('result').appendChild(element);
}

function showSuccess(container) {
  container.className = 'success';
}

function resetError(container) {
  container.className = '';
  if (container.lastChild.className == "error-message") {
    container.removeChild(container.lastChild);
  }
}

/*
function reset() {
  setTimeout(function() {
    var resultDiv = document.getElementById('result'),
        j = resultDiv.children.length ;
  for( var i = 0; i < j; i++) {

    console.log(resultDiv.children[i]);
    console.log(typeof(resultDiv.children[i]));
  }       
  }, 1000)
}
*/
var reset = function() {
  setTimeout(function() {
    var resultDiv = document.getElementById('result');

    resultDiv.children.each(function(index, el) {
      console.log(el);
    });
  }, 1000);
};
function validate(form) {

  var elems      = form.elements,
      checkMail  = /(\W|^)[\w.+\-]{1,25}@(yandex|ya|google|mail|rambler)\.(com|ru|kz|by|ua|uk)(\W|$)/,
      checkPhone = /(\+7){1}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/,
      checkName  = /^[а-я]{1,25}\s[а-я]{1,25}\s[а-я]{1,25}$/;
  

  // check FIO
  //resetError(elems.result.parentNode);



  resetError(elems.name.parentNode);
  if (!elems.name.value  || elems.name.value.search(checkName) != 0) {
    showError(elems.name, 'Invalid Name');
  } else {
    showSuccess(elems.name);
  }

  // check Phone
  resetError(elems.phone.parentNode);
  if (!elems.phone.value || elems.phone.value.search(checkPhone) != 0) {
    showError(elems.phone, 'Invalid phone');
  } else {
    showSuccess(elems.phone);
  }

  // check Mail
  resetError(elems.mail.parentNode);
  if ( !elems.mail.value || elems.mail.value.search(checkMail) != 0) { 
    showError(elems.mail, 'Invalid  mail')
  } else {
    showSuccess(elems.mail);
  }

  reset();

}