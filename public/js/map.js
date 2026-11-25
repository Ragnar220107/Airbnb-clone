const map = new mapboxgl.Map({
        accessToken: mapToken,
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    const marker1 = new mapboxgl.Marker({color: 'red'})
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h6>${listingdata.title}</h6><br><p>Exact location will be provided after booking</p>`)) // add popups
        .addTo(map);
