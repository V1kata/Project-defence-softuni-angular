import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPassValidator(
  passCtrlValue1: string,
  passCtrlValue2: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const pass1 = group.get(passCtrlValue1);
    const pass2 = group.get(passCtrlValue2);
    console.log(control.value);

    return pass1?.value == pass2?.value || control.value == '' ? null : { matchPassValidator: true };
  };
}
