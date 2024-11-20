document.addEventListener('DOMContentLoaded', function() {
    // Accessibility Menu Toggle
    const toggleButton = document.querySelector('.accessibility-toggle');
    const menu = document.getElementById('accessibility-menu');
    
    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
        toggleButton.setAttribute('aria-expanded', !isExpanded);
        menu.hidden = isExpanded;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.accessibility-nav')) {
            toggleButton.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
        }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            toggleButton.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
        }
    });

    // Existing accessibility feature handlers
    const menuItems = menu.querySelectorAll('button[role="menuitem"]');
    
    let currentTextSize = 100;

    // Increase or Decrease Text Size for All Elements
function changeTextSize(increase = true) {
    const elements = document.querySelectorAll('.landing-container h1, .landing-container h2, .landing-container p, .landing-container input, .landing-container button');

    elements.forEach(element => {
        const currentFontSize = parseFloat(getComputedStyle(element).fontSize);
        const newSize = increase ? currentFontSize * 1.1 : currentFontSize * 0.9;

        element.style.fontSize = `${newSize}px`;
    });
}

document.querySelector('.btnMenuOption[aria-label="Increase Text Size"]').addEventListener('click', () => changeTextSize(true));
document.querySelector('.btnMenuOption[aria-label="Decrease Text Size"]').addEventListener('click', () => changeTextSize(false));
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('aria-label');
            
            switch(action) {
                // case 'Increase Text Size':
                //     if (currentTextSize < 200) {
                //         currentTextSize += 10;
                //         document.querySelector('.landing-container').style.fontSize = `${currentTextSize}%`;
                //         announceChange('Text size increased');
                //     }
                //     break;
                // case 'Decrease Text Size':
                //     if (currentTextSize > 70) {
                //         currentTextSize -= 10;
                //         document.querySelector('.landing-container').style.fontSize = `${currentTextSize}%`;
                //         announceChange('Text size decreased');
                //     }
                //     break;

                case 'Toggle High Contrast':
                    document.querySelector('.landing-container').classList.toggle('high-contrast');
                    announceChange('High contrast toggled');
                    break;
                case 'Toggle Light Background':
                    document.querySelector('.landing-container').classList.toggle('light-background');
                    announceChange('Background changed');
                    break;
                case 'Toggle Links Underline':
                    document.querySelector('.landing-container').classList.toggle('underline-links');
                    announceChange('Links underline toggled');
                    break;
                case 'Toggle Readable Font':
                    document.querySelector('.landing-container').classList.toggle('readable-font');
                    announceChange('Font changed');
                    break;
            }
        });
    });

    // Keyboard navigation within menu
    menu.addEventListener('keydown', (event) => {
        const items = Array.from(menuItems);
        const currentIndex = items.indexOf(document.activeElement);

        switch(event.key) {
            case 'ArrowDown':
                event.preventDefault();
                items[(currentIndex + 1) % items.length].focus();
                break;
            case 'ArrowUp':
                event.preventDefault();
                items[(currentIndex - 1 + items.length) % items.length].focus();
                break;
        }
    });

    function announceChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('class', 'visually-hidden');
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
}); 