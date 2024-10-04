
window.onload = function() {
  const savedLength = localStorage.getItem('passwordLength') || 12;
  const savedLowercase = localStorage.getItem('includeLowercase') === 'true';
  const savedUppercase = localStorage.getItem('includeUppercase') === 'true';
  const savedNumbers = localStorage.getItem('includeNumbers') === 'true';
  const savedSymbols = localStorage.getItem('includeSymbols') === 'true';

  document.getElementById('length').value = savedLength;
  document.getElementById('length-value').textContent = savedLength;
  document.getElementById('include-lowercase').checked = savedLowercase;
  document.getElementById('include-uppercase').checked = savedUppercase;
  document.getElementById('include-numbers').checked = savedNumbers;
  document.getElementById('include-symbols').checked = savedSymbols;
};

document.getElementById('length').addEventListener('input', function() {
  document.getElementById('length-value').textContent = this.value;
});

document.getElementById('generate').addEventListener('click', function(e) {
  e.preventDefault(); 

  const length = document.getElementById('length').value;
  const includeLowercase = document.getElementById('include-lowercase').checked;
  const includeUppercase = document.getElementById('include-uppercase').checked;
  const includeNumbers = document.getElementById('include-numbers').checked;
  const includeSymbols = document.getElementById('include-symbols').checked;

  localStorage.setItem('passwordLength', length);
  localStorage.setItem('includeLowercase', includeLowercase);
  localStorage.setItem('includeUppercase', includeUppercase);
  localStorage.setItem('includeNumbers', includeNumbers);
  localStorage.setItem('includeSymbols', includeSymbols);

  if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      alert('Debes seleccionar al menos una opción.');
      return;
  }

  const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
  document.getElementById('password-output').value = password;
});


function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  let characterPool = '';

  if (includeLowercase) characterPool += lowercase;
  if (includeUppercase) characterPool += uppercase;
  if (includeNumbers) characterPool += numbers;
  if (includeSymbols) characterPool += symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
  }

  return password;
}

document.getElementById('copy').addEventListener('click', function() {
  const passwordOutput = document.getElementById('password-output').value;

  if (navigator.clipboard) {
      navigator.clipboard.writeText(passwordOutput).then(function() {
          alert('Contraseña copiada: ' + passwordOutput);
      }).catch(function(error) {
          alert('Error al copiar la contraseña: ' + error);
      });
  } else {
      const passwordOutputElement = document.getElementById('password-output');
      passwordOutputElement.select();
      document.execCommand('copy');
      alert('Contraseña copiada: ' + passwordOutputElement.value);
  }
});
