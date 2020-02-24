# painikepeli
Tavoitteena on toteuttaa yksinkertainen moninpeli, jota pelataan painamalla painiketta. Painikkeen painaminen maksaa yhden pisteen, joita pelaajalla on lähtötilanteessa 20. Painiketta voi painaa vain, jos pelaajan pistesaldo on positiivinen. Pelaajan painettua painiketta hänelle ilmoitetaan mahdollisesta voitosta. 
 
Pelaaja voittaa ● 5 pistettä joka 10. painallus ● 40 pistettä joka 100. painallus ● 250 pistettä joka 500. painallus. 
 
Pelaaja voi voittaa enimmillään yhden palkinnon yhdellä painalluksella. Mikäli samalla painalluksella voittaisi yllä olevan listan mukaan monta palkintoa, voittaa pelaaja näistä suurimman. Painiketta painaessa pelaaja ei tiedä, mikä laskurin nykyinen arvo on, sillä kaikki pelaajat kasvattavat saman laskurin arvoa. 
 
Kun pelaaja painaa painiketta, tapahtuu seuraavat asiat: 1. Pelaajalta vähennetään yksi piste. 2. Laskurin arvo kasvaa yhdellä. 3. Mikäli laskurin arvolle osuu palkinto (esim. laskurin arvolla 500 voittaa 250 pistettä), ilmoitetaan tästä pelaajalle ja lisätään voitto pelaajan pistesaldoon. 4. Pelaajalle näytetään vaadittujen painallusten määrä seuraavaan voittavaan arvoon. 
 
Pelin käyttöliittymässä tulee näkyä pelaajan pistesaldo. Pelitilanteen tulee säilyä, vaikka selaimen (mikäli selainsovellus) tai sovelluksen (mikäli mobiilisovellus) käynnistää uudelleen. Mikäli pelaajan pistesaldo on 0, tarjotaan pelaajalle mahdollisuus aloittaa alusta, jolloin hänen pistesaldonsa palautetaan jälleen arvoon 20. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
