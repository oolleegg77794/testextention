//Preloader
// window.addEventListener('DOMContentLoaded', () => {
//     alert('yes');
//
//
//
// })

let optionBlocks = [...document.querySelectorAll('.js-wtg-toolbar__option-block')],
    imageCounter = 0;

optionBlocks.forEach( el => {

    let images = el.querySelectorAll('img'),
        imagesLen = images.length;

    images.forEach( elem => {



        if (elem.complite) {
            console.log(elem);
        }
        //
        // elem.addEventListener('load', () => {
        //     imageCounter ++;
        //     console.log(elem);
        //     console.log(imageCounter);
        // });
        // if (imageCounter === imagesLen) {
        //     el.classList.remove('preloader');
        //
        // }
    })

    // console.log(imagesLen);

    // console.log(imageCounter);

    // el.classList.remove('preloader');
    // console.log(el);
})

// console.log(imageCounter);

//Tabs

let tabLinks = [...document.querySelectorAll('.js-wtg-toolbar-modal__tab')],
    tabContents = [...document.querySelectorAll('.js-wtg-toolbar-modal__tab-content')];

tabLinks.forEach( el => {

    el.addEventListener('click', (e) => {
        let linkTarget = e.currentTarget,
            contentTab = linkTarget.getAttribute('id');

        tabContents.forEach( el => {
            el.classList.remove('active');
        })

        tabLinks.forEach( el => {
            el.classList.remove('active');
        })

        document.querySelector(`[data-tab="${contentTab}"]`).classList.add('active');
        linkTarget.classList.add('active');

    });

})

//Modal
const modal = document.querySelector('.js-wtg-toolbar-modal'),
    closeBtn = document.querySelector('.js-wtg-toolbar-modal__close-btn'),
    setBtn = document.querySelector('.js-wtg-toolbar__btn-setting');

//Listeners
setBtn.addEventListener('click', () => openModal(modal, setBtn));
closeBtn.addEventListener('click', () => closeModal(modal, setBtn));
document.addEventListener('click', (e) => closeModalOutside(e));

//Func
const openModal = (modal, button) => {

    if (button.classList.contains('active')) {
        closeModal(modal, setBtn)
    } else {
        modal.style.display = 'flex';
        setTimeout( () => {
            modal.classList.add('open');
            button.classList.add('active');
        }, 100)
    }


}
const closeModal = (modal, button) => {
    modal.classList.remove('open');
    button.classList.remove('active');
    setTimeout( () => {
        modal.style.display = 'none';
    }, 100)
}
const closeModalOutside = (e) => {
    if (!e.target.closest('.js-wtg-toolbar-modal') && !e.target.closest('.js-wtg-toolbar__btn-setting')) {
        closeModal(modal, setBtn);
    }
}




