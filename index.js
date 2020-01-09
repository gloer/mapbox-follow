mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xvZXIiLCJhIjoiY2l2cm4ya3hxMDAyYTJ6bHU5MzZjcHNnbSJ9.PmFpGo0iUpws5YtIBnzVBQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 8,
    center: [8.309321, 61.641686]    
});

let marker;

function followMe(pos) {
    const lng = pos.coords.longitude;
    const lat = pos.coords.latitude;

    map.easeTo({
        center: [lng, lat],
        zoom: 18
    })
    marker.setLngLat([lng, lat]);
}

map.on("load", () => {
    marker = new mapboxgl.Marker();
    marker.setLngLat([8.309321, 61.641686]);
    marker.addTo(map);
    
    navigator.geolocation.watchPosition(followMe);

})



