const drawContainer = (containerSize, childSize, numberOfChildren) => {
    const container = document.querySelector('#mainSquare');
    const maxNumberOfChildren = calculateMaxNumberOfChildren(containerSize, childSize, numberOfChildren);

    if (maxNumberOfChildren < numberOfChildren) {
        renderOverflowAlert(maxNumberOfChildren, numberOfChildren);
    }

    styleMainContainer(container, containerSize);
    populateChildSquares(container, childSize, maxNumberOfChildren);

    /**
     * Adds required styles to main container
     * @param {HTMLElement} element 
     * @param {Number} size 
     */
    function styleMainContainer(element, size) {
        setSquareSize(element, size);

        element.style.lineHeight = 0;
        element.style.overflow = 'hidden';
    }


    /**
     * Fills `targetContainer` with `numberOfChildren` amount of divs that are `childSize` wide and high
     * @param {HTMLElement} targetContainer 
     * @param {Number} childSize 
     * @param {Number} numberOfChildren 
     */
    function populateChildSquares(targetContainer, childSize, numberOfChildren) {
        for (let i = 0; i < numberOfChildren; i++) {
            const child = document.createElement('div');
            const maxSize = calculateMaxChildSize(targetContainer, childSize);
            setSquareSize(child, maxSize);

            child.style.backgroundColor = generateRandomColor();
            child.style.display = 'inline-block';

            child.addEventListener('mouseover', handleChildHover);

            targetContainer.appendChild(child);
        }
    };

    /**
     * Sets width and height (in pixels) on given element
     * @param {HTMLElement} element
     * @param {Number} size
     */
    function setSquareSize(element, size) {
        const sizeInPixels = getSizeInPixels(size);
        element.style.width = sizeInPixels;
        element.style.height = sizeInPixels;
    };

    /**
     * Calculates max number of children
     * @param {Number} containerSize 
     * @param {Number} childSize 
     * @param {Number} maxNumberOfChildren 
     * @returns {Number}
     */
    function calculateMaxNumberOfChildren(containerSize, childSize, maxNumberOfChildren) {
        const maxInRow = Math.floor(containerSize / childSize);
        const maxCalculatedSize = maxInRow * maxInRow;

        if (!maxCalculatedSize) {
            return 1;
        }

        return maxCalculatedSize < maxNumberOfChildren
            ? maxCalculatedSize
            : maxNumberOfChildren;
    };

    /**
     * Compares parent size and child size and returns the smaller one
     * @param {HTMLElement} container 
     * @param {Number} childSize 
     * @returns {Number}
     */
    function calculateMaxChildSize(container, childSize) {
        const parentSize = parseInt(container.style.width);

        return parentSize < childSize
            ? parentSize
            : childSize;
    }

    /**
     * Generates a random RGB color
     * @returns {String}
     */
    function generateRandomColor() {
        const red = getRandomArbitrary(0, 255);
        const green = getRandomArbitrary(0, 255);
        const blue = getRandomArbitrary(0, 255);

        return `rgb(${red}, ${green}, ${blue})`;
    };

    /**
     * Generates random arbitrary number in given range
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    /**
     * Adds 'px' suffix to given number
     * @param {Number} size 
     * @returns {String}
     */
    function getSizeInPixels(size) {
        return `${size}px`;
    }

    /**
     * Sets random tile color when hover and gets back to original one when mouse is out
     * Completely destroys element if hovered for longer than two seconds
     * @param {MouseEvent} event 
     */
    function handleChildHover(event) {
        const element = event.target;
        const previousColor = element.style.backgroundColor;
        const elementDestroyer = setTimeout(() => element.remove(), 2000);

        element.style.backgroundColor = generateRandomColor();
        element.addEventListener(
            'mouseout',
            () => {
                clearTimeout(elementDestroyer);
                element.style.backgroundColor = previousColor;
            },
            true
        );
    }

    /**
     * Renders a dismissable message about how much squares were rendered
     * @param {Number} actualNumber 
     * @param {Number} desiredNumber 
     */
    function renderOverflowAlert(actualNumber, desiredNumber) {
        const alert = document.createElement('div');
        alert.setAttribute('aria-role', 'alert');
        alert.innerText = `Could not fit all ${desiredNumber} of children in the container and therefore their number was reduced to ${actualNumber}.`;
        alert.className = 'main-square-overflown-alert';

        alert.addEventListener('click', () => alert.remove());
        container.parentNode.appendChild(alert);
    }
};

drawContainer(200, 50, 17);
// drawContainer(310, 200, 4);
// drawContainer(413, 42, 30);
// drawContainer(200, 300, 2);