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
shadowTemplate.innerHTML = `
    <style>
        .hidden-overlay {
            display: block;
            width: 100%;
            height: 100%;
            background-color: #1616167a;
            position: absolute;
            top: 0;
            overflow: hidden;
            z-index: 100;
            pointer-events: auto;
            cursor: pointer;
        }

        #toggle-overlay {
            position: absolute;
            right: 0;
            top: 50%;
        }

    </style>

    <div class="hidden-overlay"></div>
`

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
    }

    toggleShadow() {
        var sidenav = document.querySelector('.side-nav');
        var sidenavIsActive = sidenav.classList.contains('active');
        if (sidenavIsActive) {
            sidenav.classList.remove('active');
            this.shadowRoot.host.remove()
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
