/**
 * Password validator for login pages
 */

// has number
const hasNumber = (pass: string) => new RegExp(/[0-9]/).test(pass)

// has mix of small and capitals
const hasMixed = (pass: string) =>
  new RegExp(/[a-z]/).test(pass) && new RegExp(/[A-Z]/).test(pass)

// has special chars
const hasSpecial = (pass: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(pass)

// set color based on password strength
export const strengthColor = (count: number) => {
  if (count < 2) return { label: 'Poor', color: '#f44336' }
  if (count < 3) return { label: 'Weak', color: '#ffc107' }
  if (count < 4) return { label: 'Normal', color: '#ffab91' }
  if (count < 5) return { label: 'Good', color: '#00e676' }
  if (count < 6) return { label: 'Strong', color: '#00c853' }
  return { label: 'Poor', color: '#f44336' }
}

// password strength indicator
export const strengthIndicator = (pass: string): number => {
  let strengths = 0
  if (pass.length > 5) strengths += 1
  if (pass.length > 7) strengths += 1
  if (hasNumber(pass)) strengths += 1
  if (hasSpecial(pass)) strengths += 1
  if (hasMixed(pass)) strengths += 1
  return strengths
}
