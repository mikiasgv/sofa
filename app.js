const coloredBgContainer = document.querySelector('.color-container');
const swatches = document.querySelectorAll('.swatches .indicator');
const activeCircle = document.querySelector('.active-circle');

const colorPalette = { gray: "#989694", alloy: "#636063", peach: "#AA5943", black: "#44413F", blue: "#2D4359"};

let currentSwatch = 'gray';
let swatchTopIndex = 7;
let bgCircleTopIndex = 2;
let currentActiveElement = null;

if(swatches.length) {
    currentActiveElement = swatches[0].offsetTop;
}

swatches.forEach((swatch, index) => {

    swatch.addEventListener('click', (e) => {
        let swatchName = e.target.getAttribute("swatch");
        let activeCircleCurrentPosition = activeCircle.offsetTop;
        const swatchTopPosition = e.target.offsetTop;

        let movePositionTo = swatchTopPosition - activeCircleCurrentPosition;

        movePositionTo = swatchTopPosition > currentActiveElement ? 
                            ((swatchTopPosition - 7.3) - activeCircleCurrentPosition) :   
                            ((swatchTopPosition - 2) - activeCircleCurrentPosition);
        
        
        addActiveClassToSwatch(swatch);
        
        let sofa = document.querySelector("." + swatchName);
        let circle = document.querySelector("." + swatchName + "-circle");

        if(swatchName === currentSwatch) return;

        // coloredBgContainer.style.background  = colorPalette[swatchName];
        // activeCircle.style.background  = colorPalette[swatchName];

        gsap.set(sofa, {zIndex: swatchTopIndex});
        gsap.set(circle, {zIndex: bgCircleTopIndex});
        gsap.to(activeCircle, {duration: 0.6, y: movePositionTo, backgroundColor:  colorPalette[swatchName], transformOriginX: "right"});
        gsap.fromTo(circle, {opacity: 0}, {opacity: 1, backgroundColor:  colorPalette[swatchName], transformOriginX: "right", duration: 1});
        gsap.fromTo(sofa, {opacity: 0, transformOriginX: "right"}, {opacity: 1, duration: 1, delay: 0.5});
        gsap.to(coloredBgContainer, {duration: 1, backgroundColor:  colorPalette[swatchName], transformOriginX: "right", delay: 0.5});
        

        
        swatchTopIndex += 7;
        bgCircleTopIndex++;
        currentSwatch = swatchName;
        currentActiveElement = swatchTopPosition;
    });

});

function addActiveClassToSwatch(element) {
    swatches.forEach(swatch => {
        swatch.classList.remove('active');
    });

    element.classList.add('active');
}
 
 