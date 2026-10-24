const shareBtn = document.getElementById('card__share-btn')
const footer = document.getElementById('card__footer')

shareBtn.onclick = () => {
    footer.classList.toggle('active');
}
