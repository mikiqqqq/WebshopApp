document.addEventListener('DOMContentLoaded', () => {
    let isUsingKeyboard = false;

    document.addEventListener('keydown', () => {
        isUsingKeyboard = true;
        console.log(isUsingKeyboard);
    });

    document.addEventListener('mousedown', (event: MouseEvent) => {
        isUsingKeyboard = false;
        console.log(isUsingKeyboard);
        (event.target as HTMLElement).classList.remove('user-is-tabbing');
    });

    document.addEventListener('focusin', (event: FocusEvent) => {
        if (isUsingKeyboard) {
            console.log("added");
            (event.target as HTMLElement).classList.add('user-is-tabbing');
        }
    });

    document.addEventListener('focusout', (event: FocusEvent) => {
        console.log("removed");
        (event.target as HTMLElement).classList.remove('user-is-tabbing');
    });
});

// Export an empty object to ensure this file is treated as a module
export {};