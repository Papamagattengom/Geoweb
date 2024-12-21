//inserer un fond de carte OSM
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var satellite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '© Google'
});

var CartoDB = L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});

//Inserer etendue centre de la carte
var map = L.map('map', {
    center: [14.370834, -14.831543],
    zoom: 7,
    layers: [osm]
});

//Inserer les fonds de carte dans le controle de couche
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "Satellite": satellite,
    "CartoDB": CartoDB
};

// Ajout de la couche WMS
var Departement = L.tileLayer.wms("http://Localhost:8080/geoserver/websig/wms", {
    layers: 'Departement',
    format: 'image/png',
    transparent: true
}).addTo(map);

var Routes = L.tileLayer.wms("http://Localhost:8080/geoserver/websig/wms", {
    layers: 'Routes',
    format: 'image/png',
    transparent: true
}).addTo(map)

// Ajout des couches Geojson

var Arrondissement= L.geojson(Arrondissement).addTo(map);
var Piste= L.geojson(Piste).addTo(map);

//Inserer les fonds de carte dans le controle de couche
var OverLayerMaps = {
    "Departement": Departement,
    "Routes": Routes,
    "Route Secondaire": Piste,
    "Arrondissements": Arrondissement,

};

//Inserer le controle des couches
L.control.layers(baseMaps, OverLayerMaps).addTo(map);

// Ajouter l'impression des cartes
L.control.browserPrint({ position: 'topleft' }).addTo(map);

// Ajout d'un contrôle d'échelle à la carte 
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false
}).addTo(map);
