/* 
Den här filen innehåller JavaScript som gör
webbplatsen mer interaktiv.

Här finns bland annat navigationen och den
interaktiva kartan.

Jag använder Leaflet för kartan och JavaScript
för att uppdatera information när användaren
klickar på olika platser.
 */
"use strict";

/* Navigation vid scrollning */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 80){
        header.classList.add("scrolled");
    } 
    else {
        header.classList.remove("scrolled");
    }
});

/* Interactive Map */
const map = L.map("map", {
    scrollWheelZoom: false
}).setView([63.2458, 17.3728], 10);

/* Map Tiles */
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; OpenStreetMap contributors'
}).addTo(map);



/* Camp */
L.marker([63.2458, 17.3728])
    .addTo(map)
    .bindPopup(`
        <b>63° NORTH SWE CAMP</b>
        <br>Nyland 217<br>Your basecamp for exploring Västernorrland.
`);

/* Attraktioner */
const attractions = [
{
    name: "Paraberget",
    coords: [63.2555, 17.3960],
    image: "images/paraberget.jpg",
    description: "One of the area's most spectacular viewpoints with panoramic views over forests and valleys.",
    distance: "24 km",
    drive: "28 minutes",
    difficulty: "Moderate hike",
    season: "May – October",
    maps: "https://maps.google.com/?q=Paraberget,Sollefteå"
},

{
    name: "Multråberget",
    coords: [63.1749, 17.3805],
    image: "images/multraberget.jpg",
    description: "A peaceful hiking destination offering beautiful forest scenery.",
    distance: "31 km",
    drive: "35 minutes",
    difficulty: "Easy",
    season: "May – October",
    maps: "https://maps.google.com/?q=Multråberget"
},

{
    name: "Remsleberget",
    coords: [63.181101, 17.284067],
    image: "images/remsleberget.jpg",
    description: "A favourite local viewpoint overlooking Sollefteå.",
    distance: "26 km",
    drive: "30 minutes",
    difficulty: "Easy",
    season: "All year",
    maps: "https://maps.google.com/?q=Remsleberget"
},

{
    name: "Västra Skogen",
    coords: [63.176875, 17.259487],
    image: "images/vastra-skogen.jpg",
    description: "Peaceful woodland trails close to camp.",
    distance: "8 km",
    drive: "10 minutes",
    difficulty: "Easy",
    season: "All year",
    maps: "https://maps.google.com/?q=Västra+Skogen+Sollefteå"
},

{
    name: "Kaffe Smak",
    coords: [63.1666, 17.2670],
    image: "images/kaffe-smak.jpg",
    description: "One of Sollefteå's best cafés for coffee and homemade cakes.",
    distance: "29 km",
    drive: "32 minutes",
    difficulty: "Accessible",
    season: "All year",
    maps: "https://maps.google.com/?q=Kaffe+Smak+Sollefteå"
},

{
    name: "Resele Strand",
    coords: [63.2939, 17.0380],
    image: "images/resele-strand.jpg",
    description: "Popular riverside restaurant overlooking the Ångermanälven.",
    distance: "32 km",
    drive: "35 minutes",
    difficulty: "Accessible",
    season: "Summer",
    maps: "https://maps.google.com/?q=Resele+Strand"
},

{
    name: "Urkult Festival",
    coords: [63.4424, 16.9294],
    image: "images/urkult.jpg",
    description: "Sweden's famous folk and world music festival held every summer.",
    distance: "42 km",
    drive: "45 minutes",
    difficulty: "Accessible",
    season: "August",
    maps: "https://maps.google.com/?q=Urkult+Näsåker"
},

{
    name: "Nämforsen",
    coords: [63.4438, 16.9245],
    image: "images/namforsen.jpg",
    description: "One of Northern Europe's largest collections of prehistoric rock carvings.",
    distance: "46 km",
    drive: "50 minutes",
    difficulty: "Accessible",
    season: "May–September",
    maps: "https://maps.google.com/?q=Nämforsen"
},

{
    name: "Döda Fallet",
    coords: [63.2417, 16.3723],
    image: "images/doda-fallet.jpg",
    description: "The spectacular 'Dead Falls' nature reserve and one of Sweden's most remarkable geological sites.",
    distance: "70 km",
    drive: "1 hour",
    difficulty: "Easy",
    season: "May–October",
    maps: "https://maps.google.com/?q=Döda+Fallet"
}
];

/* 
Visar vald destination:
Den här funktionen uppdaterar informationsrutan.

När användaren klickar på en markör ändras
bild, text och länken till Google Maps så
att rätt plats visas.
*/
function showDestination(place) {
    const panel = document.querySelector(".destination-panel");
    panel.classList.add("fade");
    setTimeout(() => {
        document.getElementById("destination-image").src =
            place.image;
        document.getElementById("destination-image").alt =
            place.name;
        document.getElementById("destination-title").textContent =
            place.name;
        document.getElementById("destination-description").textContent =
            place.description;
        document.getElementById("destination-distance").textContent =
            "📍 " + place.distance;
        document.getElementById("destination-time").textContent =
            "🚗 " + place.drive;
        document.getElementById("destination-difficulty").textContent =
            "🥾 " + place.difficulty;
        document.getElementById("destination-season").textContent =
            "🌞 " + place.season;
        document.getElementById("destination-link").href =
            place.maps;
        panel.classList.remove("fade");
    }, 300);        
}

/* 
Skapa markörer:
Här skapas alla markörer på kartan.

Varje markör får en egen klickfunktion som
visar information om den valda platsen.
 */
attractions.forEach(place => {
    const marker = L.marker(place.coords)
        .addTo(map);
    marker.on("click", () => {
        map.flyTo(
            place.coords, 11, {
                duration: 1.2
            }
        );
        showDestination(place);
    });
});

showDestination(attractions[0]);