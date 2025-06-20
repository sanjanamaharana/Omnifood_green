document.addEventListener('DOMContentLoaded', function () {
  // Password validation
  const registrationForm = document.getElementById('registrationForm');
  const passwordInput = document.getElementById('password');
  const pwLength = document.getElementById('pwLength');
  const pwLowercase = document.getElementById('pwLowercase');
  const pwUppercase = document.getElementById('pwUppercase');
  const pwNumber = document.getElementById('pwNumber');
  const pwSpecial = document.getElementById('pwSpecial');

  const passwordRequirements = [
    { element: pwLength, regex: /.{8,}/, message: 'At least 8 characters' },
    { element: pwLowercase, regex: /[a-z]/, message: 'One lowercase letter' },
    { element: pwUppercase, regex: /[A-Z]/, message: 'One uppercase letter' },
    { element: pwNumber, regex: /[0-9]/, message: 'One number' },
    { element: pwSpecial, regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, message: 'One special character' }
  ];

  function validatePassword() {
    const password = passwordInput.value;
    let allValid = true;

    passwordRequirements.forEach(req => {
      const isValid = req.regex.test(password);
      if (isValid) {
        req.element.classList.remove('invalid-feedback-item');
        req.element.classList.add('valid');
        req.element.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${req.message}`;
      } else {
        req.element.classList.remove('valid');
        req.element.classList.add('invalid-feedback-item');
        req.element.innerHTML = `<i class="bi bi-x-circle-fill"></i> ${req.message}`;
        allValid = false;
      }
    });

    if (password.length > 0) {
      passwordInput.classList.toggle('is-valid', allValid);
      passwordInput.classList.toggle('is-invalid', !allValid);
    } else {
      passwordInput.classList.remove('is-valid', 'is-invalid');
      allValid = false;
    }

    return allValid;
  }

  passwordInput.addEventListener('keyup', validatePassword);
  passwordInput.addEventListener('change', validatePassword);

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const isPasswordValid = validatePassword();
    const isFullNameValid = document.getElementById('full-name').checkValidity();
    const isEmailValid = document.getElementById('email').checkValidity();
    const isSelectWhereValid = document.getElementById('select-where').checkValidity();

    if (isPasswordValid && isFullNameValid && isEmailValid && isSelectWhereValid) {
      alert('Form submitted successfully! Your password meets all requirements.');
      registrationForm.reset();
      passwordRequirements.forEach(req => {
        req.element.classList.remove('valid');
        req.element.classList.add('invalid-feedback-item');
        req.element.innerHTML = `<i class="bi bi-x-circle-fill"></i> ${req.message}`;
      });
      passwordInput.classList.remove('is-valid', 'is-invalid');
    } else {
      registrationForm.reportValidity();
      alert('Please correct the highlighted errors before signing up.');
    }
  });

  validatePassword();

  // Button scroll to pricing section
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const pricingSection = document.querySelector('#pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
