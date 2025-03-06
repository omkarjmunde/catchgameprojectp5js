class LineHook extends FishingRod {
    /*
    the construtor initialises the lineHook object, inheriting from the FishingHook superclass
    */
    constructor(x, y, hookDia, nodeNum, nodeDist, gravity) {
        super(x, y)
        this.hookDia = hookDia
        this.nodes = []
        this.nodeNum = nodeNum
        this.nodeDist = nodeDist
        this.gravity = gravity
        //pushing the nodes to the nodeArray
        for (let i = 0; i < this.nodeNum; i++) {
            this.nodes.push({ x: this.x, y: this.y + this.nodeDist * i })
        }
        this.hookX = this.nodes[this.nodeNum-1].x
        this.hookY = this.nodes[this.nodeNum-1].y
    }

    /*
    the getter and setter methods which are responsible for manipulating the data in the 
    attributes
    */

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getHookDia() {
        return this.hookDia
    }

    getNodeNum() {
        this.nodeNum
    }

    getNodeDist() {
        return this.nodeDist
    }

    getGravity() {
        return this.gravity
    }

    getHookX() {
        return this.nodes[this.nodeNum-1].x
    }

    getHookY() {
        return this.nodes[this.nodeNum-1].y
    }

    /*
    the updatePos method contains code which calculates the position of each node in the
    string using trigonometry
    */

    updatePos() {
        for(let i = 1; i < this.nodes.length; i++) {
            this.nodes[0].x = fishingRod.getX()
            this.nodes[0].y = fishingRod.getY()
            const node = this.nodes[i]
            const lastNode = this.nodes[i - 1]
            if(lastNode) {
                const distance = dist(node.x, node.y, lastNode.x, lastNode.y)
                if (distance > this.nodeDist) {
                    const angle = abs(atan((node.y - lastNode.y) / (node.x - lastNode.x)))
                    node.x = lastNode.x + Math.sign(node.x-lastNode.x) * (this.nodeDist * cos(angle))
                    node.y = lastNode.y + Math.sign(node.y-lastNode.y) * (this.nodeDist * sin(angle))
                }
            }
            node.y += this.gravity
            node.x += sin(frameCount / 20) / 10
            //console.log(node.x, node.y)
        }


    }
        
    /*
    the draw method contains code which calls the updatePos method,
    uses the built-in beginShape function to draw a line between each node,
    draws the hook at the x and y coordinates of the last node in the array
    */
    
    draw() {
        this.updatePos()
        noFill()
        stroke("black")
        strokeWeight(2)
        
        
        beginShape()
        for (const node of this.nodes) {
            vertex(node.x, node.y)
        }
        endShape()
        //print("here")
        fill("red")
        circle(this.nodes[this.nodeNum-1].x, this.nodes[this.nodeNum-1].y, this.hookDia)
    }
    
    /*
    the update method contains both of the above methods
    */
    update() {
        this.updatePos()
        this.draw()
    }
}