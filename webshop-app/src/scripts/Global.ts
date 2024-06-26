document.addEventListener('DOMContentLoaded', () => {
    let isUsingKeyboard = false;

    document.addEventListener('keydown', () => {
        isUsingKeyboard = true;
    });

    document.addEventListener('mousedown', (event: MouseEvent) => {
        isUsingKeyboard = false;
        (event.target as HTMLElement).classList.remove('user-is-tabbing');
    });

    document.addEventListener('focusin', (event: FocusEvent) => {
        if (isUsingKeyboard) {
            (event.target as HTMLElement).classList.add('user-is-tabbing');
        }
    });

    document.addEventListener('focusout', (event: FocusEvent) => {
        (event.target as HTMLElement).classList.remove('user-is-tabbing');
    });
});

// Export an empty object to ensure this file is treated as a module
export {};