class Instructions {
    constructor(container, size=200) {
        this.instruction = document.createElement('p');
        this.instruction.innerHTML = 'Draw a ' + this.#drawing[this.#i];
        this.instruction.width = size
        this.instruction.height = size
        container.appendChild(this.instruction)
    }

    #i = 0
    #drawing = ['cat', 'tree', 'car', 'phone', 'chair', 'laptop']
}