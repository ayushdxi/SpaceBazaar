mapboxgl.accessToken = mapToken ;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: space.geometry.coordinates,
    zoom: 10
});

const marker1 = new mapboxgl.Marker()
.setLngLat(space.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${space.title}</h3><p>${space.location}</p>`
        )
)
.addTo(map)
