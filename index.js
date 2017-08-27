function App(form) {

  let self = this;
  // форма с элементами
  this.form = form;
  // показывает в каких полях ошибки
  this.validate = {
    name : false,
    mail : false,
    phone: false
  }
  // показывает что ввели
  this.getData = {
    name : false,
    mail : false,
    phone: false
  }

  this.falseData = {
    name : "Sergey Brin",
    mail : "brin@google.com",
    phone: "+7(222)444-55-66 "
  }
  //
  this.setData = {
    name : 'Венгеров Дмитрий Валентинович',
    mail : 'vdv@ya.ru',
    phone: '+7(111)222-33-11'
  }

  this.sum = false;
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    self.resetForm(function() {
      // зажаем значение полям
      self.setValue();
      // проверяем поля
      self.valSum(form.elements.phone);
      self.valName(form.elements.name);
      self.valPhone(form.elements.phone);
      self.valMail(form.elements.mail);
      // сабмитим
      self.submit();
    });
  });
}

App.prototype.resetForm = function resetForm(callback) {
  this.form.reset();
  this.form;
  if(document.getElementsByTagName("p")){
    res = document.getElementById("result");
    setTimeout( function() {
      res.innerHTML = '';
      res.classList.remove('error');


      }, 3000);
    }
  if (typeof callback === 'function') {
      callback();
  }
};

App.prototype.setValue = function setValue() {
  
  let object = this.setData,
      form   = this.form;
 /*
  console.log('object: ');
  console.log(object);
*/
  form.elements.name.value  = object.name;
  form.elements.mail.value  = object.mail;
  form.elements.phone.value = object.phone;
 
}

App.prototype.submit = function submit () {
/*
  console.log('validate: ');
  console.log(this.validate);
  console.log('getData: ');
  console.log(this.getData);
  console.log('setData: ');
  console.log(this.setData);
  console.log('form: ');
  console.log(this.form);
*/
  res = document.getElementById("result");

  if( this.validate.name == true && this.validate.mail == true && this.validate.phone == true) {
    this.showSuccess(res);
    res.innerHTML = 'Success'
  }
}

App.prototype.showSuccess = function showSuccess(container) {
  container.classList.add('success');
}

App.prototype.resetError = function resetError(container) {
  container.classList.remove('error');
}

App.prototype.showError = function showError(container, errorMessage) {
  container.classList.add('error');
  
  let element = document.createElement("p"),
      resultMes = document.getElementById('result');
      
  resultMes.classList.add("error");
  element.appendChild(document.createTextNode(errorMessage + '\n'));
  document.getElementById('result').appendChild(element);
}

App.prototype.valName = function valName(container) {
  let checkName  = /^[А-Яа-я]{1,25}\s[А-Яа-я]{1,25}\s[А-Яа-я]{1,25}$/;
  this.resetError(container);
  this.getData.name = container.value;

  if (container.value.search(checkName)) {
    this.showError(container, 'Invalid Name');
  } else {
    this.showSuccess(container);
    this.validate.name = true;
  }
}

App.prototype.valPhone = function valPhone(container) {
  let checkPhone = /(\+7){1}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/;
  this.resetError(container);
  this.getData.phone = container.value;
  if (container.value.search(checkPhone)!= 0 ||  this.sum >= 30  ) {
    
    this.showError(container, 'Invalid phone');
    
  } else {
    this.showSuccess(container);
    this.validate.phone = true;
  }
}

App.prototype.valMail = function valMail(container) {
  let checkMail  = /(\W|^)[\w.+\-]{1,25}@(yandex|ya)\.(com|ru|kz|by|ua|uk)(\W|$)/;
  this.resetError(container);
  this.getData.mail = container.value;
  if (container.value.search(checkMail)) {
    this.showError(container, 'Invalid mail');
  } else {
    this.showSuccess(container);
    this.validate.mail = true;
  }
}

App.prototype.valSum = function valSum(container) {

  let str  = container.value,
      str1 = parseInt(str.replace(/\D/g, '')),
      sum  = 0,
      tmp;

  while (str1) { tmp = str1 % 10; str1 = (str1 - tmp)/10; sum += tmp; }
  this.sum = sum
}

const Application = new App(document.forms.myForm);
