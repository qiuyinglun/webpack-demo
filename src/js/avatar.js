import avatar from '../img/avatar.jpg';
import avatarStyle from '../scss/avatar.scss';

function Avatar() {
    let img = new Image();
    img.src = avatar;
    img.classList.add('avatar')
    img.classList.add(avatarStyle.avatar)
    return img;
}
export default Avatar;