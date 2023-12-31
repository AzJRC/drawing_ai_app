class Instructions {
    constructor(container, size=400) {
        container.style.width = size
        container.style = `
            display: flex;
            align-content: center;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            margin: 0;`

        this.drawList = ['cat', 'cellphone', 'tree', 'chair', 'bicycle', 'pencil']
        this.i = 0;
        this.instructions = document.createElement('p');
        this.instructions.width = size;
        this.instructions.style = `
            display: inline-block;
            text-align: center;
            font-size: 1.5rem;
            margin: 0.1rem 0;
            text-transform: uppercase;
            font-weight: 600;`
        container.appendChild(this.instructions)
        this.#updateLabels()

        this.input = document.createElement('input');
        this.input.width = size;
        this.input.placeholder = 'Type your username here!'
        this.input.type = 'text'
        this.input.style = `
            display: none;
            text-align: center;
            font-size: 1rem;
            margin: 0.1rem 0;
            padding: 0.3rem 0;
            border: 2px solid #3498db;
            border-radius: 5px;
            outline: none;`;
        container.appendChild(this.input)

        this.buttonNext = document.createElement('button');
        this.buttonNext.innerHTML = 'NEXT';
        this.buttonNext.style = `
            font-size: 1.2rem;
            width: 50%;
            height: 100%;
            padding: 0.1rem 0;
            margin: 1rem 0;`
        
        container.appendChild(this.buttonNext)
        
        this.#buttonNextEvents()
    }
    
    #inputUpdate = () => {
        this.input.onchange = () => {
            defaultUsername = this.input.value;
            data['username'] = defaultUsername;
        }
    }

    #buttonNextEvents = () => {
        this.buttonNext.onclick = () => {
            if (this.buttonNext.innerHTML != 'SAVE') {
                if (canvas.paths == 0) {
                    alert('You need to draw something!')
                } else {
                    const currentLabel = this.drawList[instructions.i];
                    data.drawings[currentLabel] = canvas.paths;
                    this.i++;
                    
                    if (this.i < this.drawList.length) {
                        this.#updateLabels();
                    } else {
                        this.#updateInstructions();
                    }
                    
                    canvas.reset();
                }
            } else {
                /* Download and send data */
                this.#sendFile(data)
                alert('Your drawings have been saved successfully!')
            }
        }
    }

    #updateLabels = () => {
        this.instructions.innerHTML = `Draw a ${this.drawList[this.i]}`
    }

    #updateInstructions = () => {
        canvas.canvas.style.display = 'None';
        canvas.undoButton.style.display = 'None';
        canvas.clearButton.style.display = 'None';

        this.instructions.innerHTML = 'Great! Save your drawings.'
        this.buttonNext.innerHTML = 'SAVE'
        this.input.style.display = 'block'

        this.#inputUpdate()
    }

    #sendFile = (data) => {
        console.log(data)
        console.log('saving')
        fetch('/save-drawing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.text())
        .then(data => {
            if (data == 'Drawing data saved successfully!') {
                alert(data)
            }
        })
    }
}