class SketchCanvas {
    constructor(container, size=400) {
        container.style = `
            display: flex;
            flex-direction: column`

        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: white;
            border: 1px solid black;
            box-shadow: 0px 0px 10px 2px black;
            `
        container.appendChild(this.canvas); /* Add element to the DOM */
        
        container.appendChild(document.createElement('br'))

        this.undoButton = this.#createButton(container, 'UNDO', this.buttonSize=size/5);
        this.undoButton.disabled = true;

        this.clearButton = this.#createButton(container, 'CLEAR', this.buttonSize);
        this.clearButton.disabled = true;

        this.ctx = this.canvas.getContext('2d'); /* Allows enable the canvas api to draw in it */
        this.paths = []
        this.tmpPaths = []
        this.isDrawing = false;
        this.#addEventListeners(); /* # means private method -> private methods can't be called outside of the class */
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }

    #addEventListeners() {

        /* Canvas event listeners */
        this.canvas.onmousedown = (event) => {
            const mousePos = this.#getMouseLoc(event);
            this.paths.push([mousePos]);
            this.isDrawing = true;
        }

        this.canvas.onmousemove = (event) => {
            if (this.isDrawing) {
                const mousePos = this.#getMouseLoc(event);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mousePos); /* Add point to the last path */
                this.#redraw();
                
                this.undoButton.disabled = false;
                this.clearButton.disabled = false;
            }
        }

        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }

        this.canvas.ontouchstart = (event) => {
            const touch = event.touches[0]; /* Consider only first screen touch */
            this.canvas.onmousedown(touch);
        }

        this.canvas.ontouchmove = (event) => {
            const touch = event.touches[0];
            this.canvas.onmousemove(touch);
        }

        this.canvas.ontouchend = () => {
            this.canvas.onmouseup();
        }


        /* buttons event listeners */
        this.undoButton.onclick = () => {
            if (this.tmpPaths.length > 0) {
                this.paths = [...this.tmpPaths]
                this.tmpPaths = [];
                this.#redraw();
                this.clearButton.disabled = false
            } else {
                this.paths.pop()
                this.#redraw()
                if (this.paths.length == 0) {
                    this.undoButton.disabled = true;
                    this.clearButton.disabled = true;
            }
            }
        }
        
        this.clearButton.onclick = () => {
            this.tmpPaths = [...this.paths];
            this.paths = [];
            this.#redraw();
            this.clearButton.disabled = true;
        }
    }
    
    #createButton(container, label, width) {
        const button = document.createElement('button');
        button.innerHTML = label;
        button.style = `
            display: inline-block;
            text-align: center;
            font-size: 1.5rem;
            margin-top: 10px;`
        container.appendChild(button);
        return button;
    }

    #redraw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); /* Clean the canvas */
        draw.paths(this.ctx, this.paths); /* Function to draw in the canvas, defined in app/draw.js */
    }

    #getMouseLoc = (event) => {
        const rect = this.canvas.getBoundingClientRect(); /* The getBoundingClientRect() method is a property of HTML DOM Element that returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, and height */
        return [Math.round(event.clientX - rect.left), Math.round(event.clientY - rect.top)]; /* Coordinates X, Y relative to the left and top sides of the canvas, respectively */
    }
    
}