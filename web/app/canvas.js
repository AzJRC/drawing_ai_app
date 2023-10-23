class SketchCanvas {
    constructor(container, size=400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: white;
            border: 1px solid black;
            box-shadow: 0px 0px 10px 2px black;
            `
        container.appendChild(this.canvas); /* Add element to the DOM */

        this.ctx = this.canvas.getContext('2d'); /* Allows enable the canvas api to draw in it */
        this.isDrawing = false;
        
        this.#addEventListeners(); /* # means private method -> private methods can't be called outside of the class */
    }

    #addEventListeners() {
        this.canvas.onmousedown = (event) => {
            const mousePos = this.#getMouseLoc(event)
            this.path = [mousePos]
            this.isDrawing = true
        }

        this.canvas.onmousemove = (event) => {
            if (this.isDrawing) {
                const mousePos = this.#getMouseLoc(event)
                this.path.push(mousePos)
                
            }
        }

        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }
    }

    #getMouseLoc = (event) => {
        const rect = this.canvas.getBoundingClientRect() /* The getBoundingClientRect() method is a property of HTML DOM Element that returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, and height */
        return [Math.round(event.clientX - rect.left), Math.round(event.clientY - rect.top)] /* Coordinates X, Y relative to the left and top sides of the canvas, respectively */
    }
}