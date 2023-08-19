import { ValidatorFn } from '@angular/forms';

export function appPasswordValidator(): ValidatorFn {
  const regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
  return (control) => {
    return control.value == '' || regExp.test(control.value)
      ? null
      : { appPasswordValidator: true };
  };
}
