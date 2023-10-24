class Instructions {
    constructor(container, size=400) {
        container.style = `
            width: ${size}px;
            display: flex;
            align-content: center;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: baseline;`

        this.drawList = ['cat', 'cellphone', 'tree', 'chair', 'bicycle', 'pencil']
        this.i = 0
        
        this.instructions = document.createElement('p');
        this.instructions.innerHTML = `Draw a ${this.drawList[this.i]}`
        this.instructions.width = size;
        this.instructions.style = `
            display: inline-block;
            text-align: center;
            font-size: 1.5rem;
            margin: 0;
            text-transform: uppercase;
            font-weight: 600;`
        container.appendChild(this.instructions)

        const button = document.createElement('button');
        button.innerHTML = 'NEXT';
        button.style = `
            font-size: 1.2rem;
            width: 50%;
            height: 100%;
            padding: 0.3rem 0;
            margin: 1rem 0;`
        container.appendChild(button)
    }
}