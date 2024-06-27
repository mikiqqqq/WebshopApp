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

// Calculate the width of the scrollbar
const getScrollbarWidth = (): number => {
    // Create a temporary div container and append it into the body
    const container = document.createElement('div');
    // Append the container to the document
    document.body.appendChild(container);

    // Force scrollbar on the container
    container.style.overflow = 'scroll';
    container.style.visibility = 'hidden';
    container.style.width = '50px';
    container.style.height = '50px';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';

    // Add an inner div
    const inner = document.createElement('div');
    container.appendChild(inner);
    inner.style.height = '100px';

    // Calculate the width based on the difference between container's full width and the inner element width
    const scrollbarWidth = container.offsetWidth - inner.offsetWidth;

    // Remove the elements from the document
    document.body.removeChild(container);

    return scrollbarWidth;
};

// Function to enable scroll lock
export const enableScrollLock = (): void => {
    if (document.body.offsetHeight > window.innerHeight + 1) {
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        document.body.classList.remove('no_scroll_lock');

        const scrollBarPlaceholder = document.querySelector('.scrollbar_placeholder');
        if(scrollBarPlaceholder) {
            (scrollBarPlaceholder as HTMLElement).style.width = getScrollbarWidth() + "px";
        }          
    } else {
        document.body.style.paddingRight = "0";
        document.body.classList.remove('no_scroll_lock');

        const scrollBarPlaceholder = document.querySelector('.scrollbar_placeholder');
        if(scrollBarPlaceholder) {
            (scrollBarPlaceholder as HTMLElement).style.width = "0";
        }    
    }
};

// Function to disable scroll lock
export const disableScrollLock = (): void => {
    document.body.style.paddingRight = "0";
    document.body.classList.add('no_scroll_lock');
};

// Export an empty object to ensure this file is treated as a module
export {};