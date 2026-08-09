import * as Yup from 'yup';

/**
 * Mirrors atrri-backend/src/services/passwordService.ts validatePassword.
 * If one side changes, change both — the backend is authoritative and will
 * reject anything this lets through.
 */
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;

/** Length only. OWASP advises against composition rules: forcing a digit or
 *  symbol pushes users toward "Password1!" and lowers real entropy. */
export const passwordYupSchema = Yup.string()
    .required('Password is required')
    .min(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters`)
    .max(PASSWORD_MAX, `Password must be ${PASSWORD_MAX} characters or fewer`);

export const confirmPasswordYupSchema = (ref: string) =>
    Yup.string()
        .required('Please re-enter your password')
        .oneOf([Yup.ref(ref)], 'Passwords do not match');

export type PasswordScore = {
    score: 0 | 1 | 2 | 3 | 4;
    label: string;
};

/**
 * Guidance only — never blocks submission. A weak-but-valid password is the
 * user's call; the meter just makes the trade-off visible.
 */
export const scorePassword = (value: string): PasswordScore => {
    if (!value) return { score: 0, label: `Use at least ${PASSWORD_MIN} characters` };

    let points = 0;
    if (value.length >= 8) points++;
    if (value.length >= 12) points++;
    if (/\d/.test(value) || /[^a-zA-Z0-9]/.test(value)) points++;
    if (value.length >= 16) points++;

    const score = Math.max(1, Math.min(4, points)) as 1 | 2 | 3 | 4;
    const labels: Record<1 | 2 | 3 | 4, string> = {
        1: 'Too short',
        2: 'Okay',
        3: 'Good',
        4: 'Strong',
    };

    return { score, label: value.length < PASSWORD_MIN ? 'Too short' : labels[score] };
};
