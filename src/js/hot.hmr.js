import '../css/item.css';
let app = document.getElementById('app');
let button = document.createElement('button');
button.innerHTML = 'Add';
button.addEventListener('click', () => {
    let item = document.createElement('div');
    item.innerHTML = 'Item';
    item.classList.add('item');
    app.appendChild(item);
});
app.appendChild(button);

// alert('hmr')