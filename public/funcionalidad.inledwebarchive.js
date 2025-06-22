
// Blog cards functionality
document.addEventListener('DOMContentLoaded', () => {
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', () => {
            const newsSlug = card.getAttribute('data-news-slug');
            // Redirigir a la página específica de la noticia
            window.location.href = `/blog/${newsSlug}`;
        });
    });
});
