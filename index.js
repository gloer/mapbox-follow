mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xvZXIiLCJhIjoiY2l2cm4ya3hxMDAyYTJ6bHU5MzZjcHNnbSJ9.PmFpGo0iUpws5YtIBnzVBQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 16,
    center: [-73.946630, 40.811441]
});

let mineSteder = [];
steder.features.map( (sted) => {
    const ts = turf.polygon(sted.geometry.coordinates);
    ts.properties = {"name" : sted.properties.name}
    mineSteder.push(ts);
} )

console.log(mineSteder);



/* Turf polygon */

/* const stortinget = turf.polygon(polyStortinget); */


/* End Turf Polygon */

let marker;

const followMe = (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    map.jumpTo({
        center: [lng, lat],
        zoom: 16
    });

    marker.setLngLat([lng, lat]);

    /* Sjekker om vi er på stortinget */
    //const minpos = turf.point([lng, lat]);
    //const paaStortinget = turf.booleanPointInPolygon(minpos, stortinget);

    //document.querySelector("#info").innerText = paaStortinget;

    // Setter at du er på ukjent område først
    document.querySelector("#info").innerText = "Du er på ukjent grunn";     

    // Sjekker om vi er inne i et område
    const minpos = turf.point([lng, lat]);

    mineSteder.map(turfsted => {
        const inni = turf.booleanPointInPolygon(minpos, turfsted);
        if(inni) {
            document.querySelector("#info").innerText = "Du er på " + turfsted.properties.name; 
        }
    })

}

map.on("load", () => {
    navigator.geolocation.watchPosition(followMe);


    marker = new mapboxgl.Marker();
    marker.setLngLat([-73.946630, 40.811441]);
    marker.addTo(map);

    /* Tegner polygon foran Stortinget */

    steder.features.map(sted => {
        map.addLayer({
            'id': sted.properties.name,
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': sted.geometry.coordinates
                    }
                }
            },
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.8
            }
        })
    })

   
    /*  Slutt på polygonet */

})