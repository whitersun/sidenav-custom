const template = document.createElement('template');
template.innerHTML = `
    <style>
        .user-card {
            font-family: 'Poppins', sans-serif;
            background-color: #f4f4f4;
            max-width: 100%;
            width: 500px;
            height: auto;

            display: grid;
            grid-template-columns: 1.2fr 2fr;
            grid-gap: 15px;
            margin-bottom: 15px;
            border-bottom: brown 5px solid;
        }

        .user-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .user-card button {
            cursor: pointer;
            background-color: gray;
            color: #fff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
            margin-bottom: 0.75rem;
        }
    </style>
    
    <div class="user-card">
        <img />
        <div>
            <h3></h3>

            <div class="info">
                <p><slot name="email" /></p>
                <p><slot name="phone" /></p>
            </div>

            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`;

const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `<div class="hidden-overlay"></div>`

class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name')
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;

        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if (this.showInfo) {
            info.setAttribute('style', 'display: block; transition: opacity 500ms ease');

            toggleBtn.innerText = 'Hide Info'
            setTimeout(() => info.style.opacity = 1, 500)
        } else {
            info.setAttribute('style', 'opacity: 0; transition: opacity 500ms ease');
            
            toggleBtn.innerText = 'Show Info'
            setTimeout(() => info.style.display = 'none', 500)

        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => {
            this.toggleInfo()
        })
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener()
    }
}

class ShadowElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('.hidden-overlay').style.height = `${document.body.offsetHeight + 100}px`
        this.shadowRoot.querySelector('.hidden-overlay').setAttribute('part', 'overlay');
    }

    toggleShadow() {
        var sideNavActive = this.shadowRoot.host.dataset.sidenavActive.split('#')[1]
        var sidenav = document.querySelector(`.${sideNavActive}`);
        var sidenavIsActive = sidenav.classList.contains('active');

        if (sidenavIsActive) {
            sidenav.classList.remove('active');
            this.shadowRoot.host.remove()
            // document.body.style.overflow = 'auto';
            document.body.removeAttribute('style');
        }
        else return
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.hidden-overlay').addEventListener('click', () => {
            this.toggleShadow()
        })
    }
}

const arrayShadowEle = [
    { a: 'user-card', b: UserCard },
    { a: 'shadow-card', b: ShadowElement }
]

arrayShadowEle.map(item => {
    window.customElements.define(item.a, item.b)
})


function nestedListChildEl(item, iconDown) {
    if (!item) return

    var arrayNestedList = item.children;

    // console.log(arrayNestedList);
    Array.from(arrayNestedList).map(el => {
        var isHaveChild = Array.from(el.children).find(elChild => elChild.classList.contains(
            'custom-collapse-2'))

        if (isHaveChild) {
            var collapseBtn2 = item.children[0].children[0];
            var createIconSpan = document.createElement('span');
            createIconSpan.classList.add('custom-pr');

            createIconSpan.innerHTML = `${iconDown}`

            var collapseBtn = item.children[0];
            collapseBtn.appendChild(createIconSpan);
            collapseBtn2.appendChild(createIconSpan);
        }
    })
}

export function sidebar001({
    targetEl: targetNavEl,
    iconDown: iconDown,
    accordion: accordion,
    duration: duration,
    activeColor: activeColorEl,
}) {
    var sidebarArray = Array.from(document.querySelectorAll('.custom-nav-item'));

    /**
        * @description "if accordion not boolean by user, this will default false"
        */
    var accordion = accordion ? accordion : false;

    sidebarArray.map(item => {
        var createIconSpan = document.createElement('span');
        createIconSpan.classList.add('custom-pr');

        createIconSpan.innerHTML = `${iconDown}`

        var collapseBtn = item.children[0];
        collapseBtn.appendChild(createIconSpan);

        nestedListChildEl(item.children[1], iconDown)

        item.addEventListener('click', function (event) {

            event.preventDefault();

            var getNestedList = Array.from(event.target.parentElement.children);

            var isNested = getNestedList.find(nestedEl => nestedEl.classList.contains(
                'custom-collapse-1') || nestedEl.classList.contains(
                'custom-collapse-2'))

            var rotationIcon = getNestedList[0].children[1];


            // above just using for accordion
            var nestedListEl = event.target.classList.contains('btn-collapse-1');
            var nestedListIsActive = Boolean;
            if (isNested) nestedListIsActive = isNested.classList.contains('active')
            else return

            condition1: if (accordion) {
                console.log(1)
                var checkActiveList = Array.from(item.parentElement.children).find(
                    itemEl => {
                        var findActiveEl = itemEl.children;

                        condition3: if (!findActiveEl[1]) return
                        return findActiveEl[1].classList.contains('active');
                    })

                if (nestedListIsActive) {
                    console.log(2)

                    console.log(nestedListIsActive);
                    isNested.classList.remove('active');
                    getNestedList[0].classList.remove('bg-half-white')
                    rotationIcon.classList.toggle('rotation-icon');
                    return
                }

                condition4: if (checkActiveList !== undefined && !nestedListEl) {
                    console.log(3)

                    console.log(checkActiveList.children[0])
                    checkActiveList.children[0].classList.remove('bg-half-white')
                    checkActiveList.children[0].children[1].classList.remove(
                        'rotation-icon')
                    checkActiveList.children[1].classList.remove('active')
                };
            }

            function removeActive() {
                getNestedList[0].classList.remove('bg-half-white')

                rotationIcon.classList.remove('rotation-icon')
                isNested.classList.remove('active');
            }

            condition2: if (!!nestedListEl) {
                console.log(4)

                if (isNested) {
                    console.log(5)

                    getNestedList[0].classList.toggle('bg-half-white')
                    rotationIcon.classList.toggle('rotation-icon');
                    isNested.classList.toggle('active');
                    isNested.style.transition = `max-height ${duration}ms ease`;

                    getNestedList[0].style.setProperty('--side-active-click', activeColorEl)

                }
            } else {
                console.log(6)

                getNestedList[0].classList.toggle('bg-half-white')
                rotationIcon.classList.toggle('rotation-icon');
                isNested.classList.toggle('active');
                isNested.style.transition = `max-height ${duration}ms ease`;

                getNestedList[0].style.setProperty('--side-active-click', activeColorEl)
            }
        })
    })


    var sideNavActiveButton = document.querySelector('.btn-custom');

    sideNavActiveButton.addEventListener('click', function (evt) {
        evt.preventDefault();

        var activeSidebar = document.querySelector(targetNavEl);
        // var activeSidebar = document.querySelector('.side-nav');

        if (!activeSidebar.classList.contains('active')) {
            activeSidebar.classList.toggle('active');
            // document.body.style.overflow = 'hidden';
            // document.body.style.position = 'fixed';

            // below css is using for iOS scroll problem.
            document.body.setAttribute('style', 'position: relative; overflow: hidden; height: 100%; -webkit-overflow-scrolling: touch;');
            var createHiddenElement = document.createElement('shadow-card');
            createHiddenElement.classList.add('hidden-body-page')
            createHiddenElement.setAttribute('data-sidenav-active', `#${targetNavEl.split('.')[1]}`);

            document.body.appendChild(createHiddenElement);
        } else {
            document.body.style.overflow = 'auto';
            var bodyListElement = document.body.children
            var convertArray = Array.from(bodyListElement);

            // console.log(convertArray)

            var isHaveShadowDom = convertArray.find(item => item.localName === 'shadow-card')

            console.log(isHaveShadowDom)
            if (isHaveShadowDom) {
                activeSidebar.classList.remove('active')
                isHaveShadowDom.remove();
                document.body.style.overflow = 'auto';
            } else return
        }
    })
    return { targetNavEl }
}