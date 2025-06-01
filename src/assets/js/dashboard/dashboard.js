// DOM elements
const zoneCards = document.querySelectorAll('.zone-card');

// Initialize fns
document.addEventListener('DOMContentLoaded', function() {
    initializeZoneCards();
});

// zone cards animations
function initializeZoneCards() {
    zoneCards.forEach(card => {
        // cards effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}