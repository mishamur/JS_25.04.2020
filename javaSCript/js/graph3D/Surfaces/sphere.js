Surfaces.prototype.sphere = (count = 20, R = 16) => {
    const points = [];
    const edges = [];
    const polygons = [];

    //print points
        const da =  Math.PI / count;
        const dph =  2 * Math.PI / count
        for (let i = 0; i < 2 * Math.PI; i += da) {
            for( let j = 0; j < Math.PI; j += dph){
                const x = R * Math.sin(i) * Math.cos(j);
                const y = R * Math.sin(i) * Math.sin(j);
                const z = R * Math.cos(i);
                points.push(new Point(x, y, z));
            }
        }
    

  
    // print edges
    for(let i = 0; i < points.length - (count / 2); i ++) {
        if(i >= count / 2)
        edges.push(new Edge(i, i + count / 2));
        
        else {
            edges.push(new Edge(i, count / 2 + i)); 
            edges.push(new Edge(i, points.length - i - 1 ));
        }      
    }

    for(let i = 1; i < points.length; i ++){  
        if(((i % (count / 2))!==0))
        edges.push(new Edge(i - 1, i))
    }

    for(let i = 0; i < count; i++){    
        edges.push(new Edge((i * count / 2) + (count / 2)  , (points.length - 1)  - (i * count / 2))) 
        edges.push(new Edge(((points.length / 2 - 1) - i * count / 2) + (count / 2), (points.length / 2 ) + i * count / 2));   
    }
        
   
    // print polygons
   

    for( let i = 0; i < points.length - count ; i ++){
        if(((i % (count / 2))!==0) &&(((i + count) % (count / 2))!==0)){
        polygons.push(new Polygon([ i - 1, i,i + count, i + count - 1 ]))
        }
    }


    for(let i = 0; i < count - 1; i++){
        polygons.push(new Polygon([(i * count / 2) + (count / 2), ((i + 1) * count / 2) + (count / 2),
        (points.length - 1)  - ((i + 1) * count / 2), (points.length - 1)  - (i * count / 2) ]));

        polygons.push(new Polygon([((points.length / 2 - 1) - i * count / 2) + (count / 2),
            ((points.length / 2 - 1) - (i + 1) * count / 2) + (count / 2), (points.length / 2 ) + (i + 1) * count / 2, 
            (points.length / 2 ) + i * count / 2  ]));

        if(i == count / 2 - 1)
            polygons.push(new Polygon([i, count / 2 + i, points.length - i - 1, i + 1 ]));
        
        if(i < count / 2 - 1);
        polygons.push(new Polygon([ i, points.length - i - 1, points.length - (i+1) - 1, i + 1 ]));

        if(i == 0)
        polygons.push(new Polygon([i, count / 2 + i, points.length - i - 1, i + 1  ]));
       
    }
    

    


    return new Subject(points, edges, polygons);
}