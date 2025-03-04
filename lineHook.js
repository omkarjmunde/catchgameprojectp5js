class LineHook extends FishingRod {
    constructor(x, y, hookDia, nodeNum, nodeDist, gravity) {
        super(x, y)
        this.hookDia = hookDia
        this.nodes = []
        this.nodeNum = nodeNum
        this.nodeDist = nodeDist
        this.gravity = gravity
        for (let i = 0; i < this.nodeNum; i++) {
            this.nodes.push({ x: this.x, y: this.y + this.nodeDist * i })
        }
        this.hookX = this.nodes[this.nodeNum-1].x
        this.hookY = this.nodes[this.nodeNum-1].y
    }

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
                    //node.x = lastNode.x + this.nodeDist * cos(angle)
                    //node.y = lastNode.y + this.nodeDist * sin(angle)
                    node.x = lastNode.x + Math.sign(node.x-lastNode.x) * (this.nodeDist * cos(angle));
                    node.y = lastNode.y + Math.sign(node.y-lastNode.y) * (this.nodeDist * sin(angle));
                }
            }
            node.y += this.gravity
            node.x += sin(frameCount / 20) / 10
            //print(node.x, node.y)
        }


    }
        
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
    
    update() {
        this.updatePos()
        this.draw()
    }
}