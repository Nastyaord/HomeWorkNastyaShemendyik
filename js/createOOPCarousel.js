var img = [
    "img/first1.jpg",
    "img/second2.jpg",
    "img/third3.jpg"
];
let carusel, carouseselWithArrows, carouselWithHover;

let createCarouselBtn = document.getElementById("createCarousel");
createCarouselBtn.addEventListener("click", function () {
    carusel = new Carousel(img, blockWithCarouselFirst);
    carusel.startSlider();
    if (carouseselWithArrows instanceof CarouseselWithArrows) {
        carouseselWithArrows.deleteArrow();
    }
});

let createCarouselWithArrowsBtn = document.getElementById("createCarouselWithArrows");
createCarouselWithArrowsBtn.addEventListener("click", function () {
    carouseselWithArrows = new CarouseselWithArrows(img, blockWithCarouselFirst);
    if (carusel instanceof Carousel){
        carusel.stopSlider();
    }
    if (carouselWithHover instanceof CarouselWithHover) {
        carouselWithHover.stopSlider();
    }
});

createCarouselWithHover.addEventListener('click', function () {
    carouselWithHover = new CarouselWithHover(img, blockWithCarouselFirst);
    if (carusel instanceof Carousel){
        carusel.stopSlider();
    }
    if (carouseselWithArrows instanceof CarouseselWithArrows) {
        carouseselWithArrows.deleteArrow();
    }
});

class Carousel {
    constructor (img, block) {
        this.img = img;
        this.block = block;
        this.currentSlide = 0;
        this.intervalIdCarousel = false;
        this.showImage();
    }

    startSlider(){
        this.intervalIdCarousel = setInterval(this.intervalCallback.bind(this), 1000);
    }

    stopSlider(){
        clearInterval(this.intervalIdCarousel);
    }

    intervalCallback () {
        this.setCorrectSlide('+');
        this.showImage();
    }

    setCorrectSlide(action){

        if(action == '+') {
            if (this.currentSlide < this.img.length - 1) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0;
            }
        } else {
            if (this.currentSlide == 0) {
                this.currentSlide = this.img.length - 1;
            } else {
                this.currentSlide--;
            }
        }
    }

    showImage(){
        let image = new Image(900, 500);
        image.className = "img-thumbnail";
        image.src = this.img[this.currentSlide];
        this.block.innerHTML = "";
        this.block.appendChild(image);
    }
}

class CarouseselWithArrows extends Carousel{
    constructor (img, block){
        super(img, block);
        this.createArrow();
    }

    createArrow(){
        let arrowILeft = document.createElement("i");
        let arrowIRight = document.createElement("i");
        arrowILeft.classList.add("fas", "fa-angle-left");
        arrowIRight.classList.add("fas", "fa-angle-right");
        left.appendChild(arrowILeft);
        right.appendChild(arrowIRight);
        arrowILeft.addEventListener("click", this.leftClick.bind(this));
        arrowIRight.addEventListener("click", this.rightClick.bind(this));
    }

    deleteArrow(){
        left.innerHTML = "";
        right.innerHTML = "";
    }

    leftClick(){
        this.setCorrectSlide('-');
        this.showImage();
    }

    rightClick() {
        this.setCorrectSlide('+');
        this.showImage();
    }

}

class CarouselWithHover extends Carousel{
    constructor (img, block){
        super(img, block);
        this.startSlider();
        this.block.addEventListener('mouseover', this.stopSlider.bind(this));
        this.block.addEventListener('mouseout', this.startSlider.bind(this));
    }
}

