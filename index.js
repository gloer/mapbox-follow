mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xvZXIiLCJhIjoiY2l2cm4ya3hxMDAyYTJ6bHU5MzZjcHNnbSJ9.PmFpGo0iUpws5YtIBnzVBQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 16,
    center: [-73.946630, 40.811441]
});


/* Turf polygon */

const poly = [
    [
        [
            10.738856792449951,
            59.9134232565407
        ],
        [
            10.738797783851622,
            59.91339770888514
        ],
        [
            10.738760232925413,
            59.91336409351895
        ],
        [
            10.73875218629837,
            59.913329133501975
        ],
        [
            10.738760232925413,
            59.9132941734482
        ],
        [
            10.738776326179504,
            59.913268625693306
        ],
        [
            10.738824605941772,
            59.9132471117792
        ],
        [
            10.738902390003204,
            59.91322694247206
        ],
        [
            10.738953351974487,
            59.913225597851145
        ],
        [
            10.739023089408875,
            59.91322694247206
        ],
        [
            10.739068686962128,
            59.91323635481692
        ],
        [
            10.73912501335144,
            59.913263247216086
        ],
        [
            10.739162564277649,
            59.913300896538324
        ],
        [
            10.739167928695677,
            59.91335199197878
        ],
        [
            10.739138424396515,
            59.91339233042886
        ],
        [
            10.739068686962128,
            59.91342191192775
        ],
        [
            10.7390096783638,
            59.91343670266731
        ],
        [
            10.738931894302368,
            59.91343939189199
        ],
        [
            10.738856792449951,
            59.9134232565407
        ]
    ]
];

const stortinget = turf.polygon(poly);


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
    const minpos = turf.point([lng, lat]);
    const paaStortinget = turf.booleanPointInPolygon(minpos, stortinget);

    document.querySelector("#info").innerText = paaStortinget;


}

map.on("load", () => {
    navigator.geolocation.watchPosition(followMe);

    marker = new mapboxgl.Marker();
    marker.setLngLat([-73.946630, 40.811441]);
    marker.addTo(map);

    /* Tegner polygon foran Stortinget */

    map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': poly
                }
            }
        },
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    });

    /*  Slutt på polygonet */

})