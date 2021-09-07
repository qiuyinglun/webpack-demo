const tip = () => import( /* webpackChunkName: "tip" */ './module/chunk.js');

function Header() {
    let div = document.createElement('div');
    div.innerHTML = 'Header, click and load chunk';
    div.addEventListener('click', () => {
        tip().then(({
            default: tip
        }) => {
            tip();
        })
    });
    return div;
}
export default Header;