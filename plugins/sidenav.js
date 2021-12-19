class ShadowElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });

        const createTemplateElement = document.createElement('template');
        const createDivElement = document.createElement('div');

        createDivElement.classList.add('hidden-overlay');
        createDivElement.setAttribute('part', 'overlay');

        const combineShadowNightElement = createTemplateElement.appendChild(createDivElement);

        this.shadowRoot.appendChild(combineShadowNightElement);
        this.shadowRoot.querySelector('.hidden-overlay').style.height = `${document.body.offsetHeight + 100}px`
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
        } else return
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.hidden-overlay').addEventListener('click', () => {
            this.toggleShadow()
        })
    }
}

const arrayShadowEle = [{
    a: 'shadow-card',
    b: ShadowElement
}]

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

            // console.log(createIconSpan);

            var iconText = iconDown
            // console.log(iconText);

            function minify_html(input, output) {
                output = input.replace(/\s*?[^\s?\[][\s\S]*?--\>/g, '').replace(/\>\s*\</g, '><');
                return output;
            }

            var iconText = '';
            const minifyIcon = minify_html(iconDown, iconText);
            createIconSpan.innerHTML = `${minifyIcon}`

            var collapseBtn = item.children[0];
            collapseBtn.appendChild(createIconSpan);
            collapseBtn2.appendChild(createIconSpan);
        }
    })
}

export function sidebar001({
    targetEl: targetNavEl,
    iconDown: iconDown,
    duration: duration,
    type: ModeType,
    activeColor: activeColorEl,
}) {
    var sidebarArray = Array.from(document.querySelectorAll('.custom-nav-item'));

    /**
     * @description "if accordion not boolean by user, this will default false"
     */

    var modeType = ModeType ? ModeType : 'collapse';


    sidebarArray.map(item => {
        var createIconSpan = document.createElement('span');

        ['collapse', 'accordion'].includes(modeType) ? createIconSpan.classList.add('custom-pr') : createIconSpan.classList.add('custom-pr-ios')

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


            function runCollapse() {
                var rotationIcon = getNestedList[0].children[1];

                // above just using for accordion
                var nestedListEl = event.target.classList.contains('btn-collapse-1');
                var nestedListIsActive = Boolean;
                if (isNested) nestedListIsActive = isNested.classList.contains('active')
                else return

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
            }


            function runAccordion() {
                var rotationIcon = getNestedList[0].children[1];

                // above just using for accordion
                var nestedListEl = event.target.classList.contains('btn-collapse-1');
                var nestedListIsActive = Boolean;
                if (isNested) nestedListIsActive = isNested.classList.contains('active')
                else return

                condition1: if (modeType === 'accordion') {
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

            }

            function runSlideMode() {
                var rotationIcon = getNestedList[0].children[1];

                var nestedListEl = event.target.classList.contains('btn-collapse-1');
                if (isNested) isNested.classList.contains('active')
                else return

                condition2: if (!nestedListEl) {
                    console.log(4)

                    if (isNested) {
                        // console.log(isNested);
                        // console.dir(isNested);
                        // console.log(isNested.closest(targetNavEl));

                        isNested.closest(targetNavEl).style.overflow = 'hidden';
                        var createSlideElement = document.createElement('div');
                        var createUlEl = document.createElement('ul')
                        createUlEl.classList.add('nested-group')
                        createSlideElement.classList.add('nested-side');

                        setTimeout(function () {
                            createSlideElement.classList.add('active');
                        }, 50);


                        var cloneFatherElement = isNested.closest('.custom-nav-item').cloneNode(true);

                        isNested.closest(targetNavEl).appendChild(createSlideElement)
                        createUlEl.appendChild(cloneFatherElement)
                        createSlideElement.appendChild(createUlEl)

                        rotationIcon.classList.toggle('rotation-icon');


                        cloneFatherElement.addEventListener('click', function (nestedEvent) {
                            nestedEvent.preventDefault()

                            // console.log(nestedEvent)

                            var isTopOfTitle = nestedEvent.target.classList.contains('btn-collapse');

                            function CloseNestedSlide() {
                                createSlideElement.style.left = '50%';
                                createSlideElement.style.transform = 'translateX(50%)';

                                setTimeout(function () {
                                    createSlideElement.remove()
                                }, 500)
                            }

                            var secondNestedTitle = nestedEvent.target.nextElementSibling;

                            // if second nested list is null or undefined
                            // slide element will return
                            if (!secondNestedTitle) return;

                            function goNextSecondSlide(getSlideModeSecondItem) {
                                console.log(getSlideModeSecondItem);
                                console.dir(getSlideModeSecondItem.parentElement);

                                var cloneSecondNestedList = getSlideModeSecondItem.parentElement;
                                var isBtnCollapse001 = [...cloneSecondNestedList.children].find(cloneItem => cloneItem.classList.contains('custom-collapse-2'))
                                console.log(cloneSecondNestedList.closest('.custom-nav-item-1'))

                                function createNewSecondSlide() {
                                    isNested.closest(targetNavEl).style.overflow = 'hidden';
                                    var createSlideElement2 = document.createElement('div');
                                    var createUlEl2 = document.createElement('ul')
                                    createUlEl2.classList.add('nested-group-2')
                                    createSlideElement2.classList.add('nested-side-2');

                                    setTimeout(function () {
                                        createSlideElement2.classList.add('active');
                                    }, 50);

                                    var cloneFatherElement2 = getSlideModeSecondItem.parentElement.cloneNode(true);
                                    console.log(cloneFatherElement2);
                                    isNested.closest(targetNavEl).appendChild(createSlideElement2)
                                    createUlEl2.appendChild(cloneFatherElement2)
                                    createSlideElement2.appendChild(createUlEl2)

                                    rotationIcon.classList.toggle('rotation-icon');

                                    cloneFatherElement2.addEventListener('click', function (nestedEvent2) {
                                        var isTopOfTitle2 = nestedEvent.target.classList.contains('btn-collapse-1');

                                        var delSecondNestedSlide = nestedEvent2.target.closest('.nested-side-2')

                                        if (isTopOfTitle2) {
                                            delSecondNestedSlide.style.left = '50%';
                                            delSecondNestedSlide.style.transform = 'translateX(50%)';

                                            setTimeout(function () {
                                                delSecondNestedSlide.remove()
                                            }, 500)
                                        }
                                    })
                                }

                                if (isBtnCollapse001) createNewSecondSlide()
                                console.log(cloneSecondNestedList)
                            }

                            if (!secondNestedTitle) return
                            else goNextSecondSlide(secondNestedTitle)

                            if (isTopOfTitle) CloseNestedSlide();

                        })
                    }
                } else {
                    console.log(6)

                    rotationIcon.classList.toggle('rotation-icon');
                }
            }


            switch (modeType) {
                case 'collapse': {
                    runCollapse();
                    break;
                }

                case 'accordion': {
                    runAccordion();
                    break;
                }

                case 'slide': {
                    runSlideMode();
                    break;
                }

                default: {
                    runCollapse();
                    break
                }
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
    return {
        targetNavEl,
        iconDown,
        duration,
        ModeType,
        activeColorEl
    }
}