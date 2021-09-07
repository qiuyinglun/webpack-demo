import {
    addFn
} from './common/util.js';

function Content() {
    let div = document.createElement('div');
    div.innerHTML = addFn('<p class="iconfont icon-zan">', 'Content</p>');
    return div;
}
export default Content;