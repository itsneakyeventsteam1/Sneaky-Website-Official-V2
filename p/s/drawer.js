const drawer = document.getElementById('drawer');
const overlay = document.getElementsByTagName('body')[0];
const menuBtn = document.getElementById('menuBtn');

function openDrawer() {
    drawer.classList.add('drawer-open');
    overlay.classList.add('active');
}

function closeDrawer() {
    drawer.classList.remove('drawer-open');
    overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openDrawer);

// Close drawer when clicking outside
document.addEventListener('click', (event) => {
    if (drawer.classList.contains('drawer-open') && !drawer.contains(event.target) && !menuBtn.contains(event.target)) {
        closeDrawer();
    }
});
