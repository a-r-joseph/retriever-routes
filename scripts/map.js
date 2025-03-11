// database access point
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://abbyj1:<GjVudBkQq8nBtPRM>@rrcluster0.z76uh.mongodb.net/?retryWrites=true&w=majority&appName=RRCluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/*
example of how to access data
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

//connect the client to the server
await client.connect();

const database = client.db('RetrieverRoutes');
//const movies = database.collection('movies');
const buildings = database.collection('Buildings');
const Food = database.collection('Food');
const parkingLots = database.collection('ParkingLots');
const resources = database.collection('ResourcesOffices');


// initialize the map centered on UMBC
var map = L.map('map').setView([39.2557, -76.7110], 16.5); // Zoom level adjusted for campus view

// add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 22
}).addTo(map);

document.getElementById('search-place').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from reloading page

    //let searchQuery = document.getElementById('search-input').value.trim().toLowerCase();

    console.log(searchQuery);

    query = { BuildingName: searchQuery };
    location = await buildings.findOne(query);
    // find a way to reference just the coordinates from the found document

    if (location) {
        map.flyTo(location); // Zoom in and move to location
    } else {
        alert("Location not found!");
    }

/*
//function to handle search
document.getElementById('search-place').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from reloading page

    //let searchQuery = document.getElementById('search-input').value.trim().toLowerCase();

    console.log(searchQuery);

    // Simple example of location search (you can expand this with a geocoding API)
    let locations = {
        "walker": [39.260266139673, -76.71523060375925],
        "walker avenue apartments": [39.25952914250935, -76.71411958317229],
        //-------------------------------------------------------------------
        "army rotc": [39.258899662426515, -76.71712805449413],
        "naval rotc": [39.25848356232322, -76.71710968215092],
        "alumni house": [39.25824172522396, -76.71778945886948],
        //-------------------------------------------------------------------
        "cho": [39.25876481471272, -76.7131147416535],
        "choptank": [39.25876481471272, -76.7131147416535],
        //-------------------------------------------------------------------
        "tan": [39.258768371118535, -76.71270136389451],
        "West Hill Apartments": [39.258768371118535, -76.71270136389451],
        //-------------------------------------------------------------------
        "magothy": [39.25888217605801, -76.71237525480258],
        "mag": [39.25888217605801, -76.71237525480258],
        //-------------------------------------------------------------------
        "wye": [39.25871146857951, -76.71238903406],
        //-------------------------------------------------------------------
        "sev": [39.25849300185937, -76.71147205003585],
        "severn": [39.25849300185937, -76.71147205003585],
        //-------------------------------------------------------------------
        "chs": [39.25893907845846, -76.71171385044711],
        "chester": [39.25893907845846, -76.71171385044711],
        //-------------------------------------------------------------------
        "acc": [39.25805556068812, -76.71200484807368],
        "apartment": [39.25805556068812, -76.71200484807368],
        //-------------------------------------------------------------------
        "gun": [39.25793464150511, -76.71118268563033],
        "gunpowder": [39.25793464150511, -76.71118268563033],
        //-------------------------------------------------------------------
        "nan": [39.25803777846592, -76.71153176015127],
        "nanticoke": [39.25803777846592, -76.71153176015127],
        //-------------------------------------------------------------------
        "mon": [39.25806267357166, -76.71081064568037],
        "monocacy": [39.25806267357166, -76.71081064568037],
        //-------------------------------------------------------------------
        "tuc": [39.25766435081905, -76.71089332122482],
        "tuckahoe": [39.25766435081905, -76.71089332122482],
        //-------------------------------------------------------------------
        "chi": [39.25756476977727, -76.71045697807362],
        "chincoteague": [39.25756476977727, -76.71045697807362],
        //-------------------------------------------------------------------
        "ant": [39.257778157550725, -76.71017220675391],
        "antietam": [39.257778157550725, -76.71017220675391],
        //-------------------------------------------------------------------
        "sas": [39.25815514102985, -76.71023191686933],
        "sassafras": [39.25815514102985, -76.71023191686933],
        //-------------------------------------------------------------------
        "wic": [39.258048447798025, -76.70980475988976],
        "wicomico": [39.258048447798025, -76.70980475988976],
        //-------------------------------------------------------------------
        "ptx": [39.25821205073331, -76.70963345983523],
        "patuxent": [39.25821205073331, -76.70963345983523],
        //-------------------------------------------------------------------
        "elk": [39.25776769244494, -76.70949728478045],
        "Hillside Apartments": [39.25776769244494, -76.70949728478045],
        //-------------------------------------------------------------------
        "dpc": [39.25778465367624, -76.70886913571933],
        "deep creek": [39.25778465367624, -76.70886913571933],
        //-------------------------------------------------------------------
        "cas": [39.25811557030422, -76.70912762716266],
        "casselman": [39.25811557030422, -76.70912762716266],
        //-------------------------------------------------------------------
        "bre": [39.258088883537276, -76.70870025464302],
        "breton": [39.258088883537276, -76.70870025464302],
        //-------------------------------------------------------------------
        "sdl": [39.25840912407, -76.70868302188012],
        "sideling": [39.25840912407, -76.70868302188012],
        //-------------------------------------------------------------------
        "poc": [39.258435810715014, -76.70910350129462],
        "pocomoke": [39.258435810715014, -76.70910350129462],
        //-------------------------------------------------------------------
        "man": [39.2586172796318, -76.7091827720039],
        "manokin": [39.2586172796318, -76.7091827720039],
        //-------------------------------------------------------------------
        "erickson hall": [39.25711747829031, -76.70978247217754],
        "erickson": [39.25711747829031, -76.70978247217754],
        "erk": [39.25711747829031, -76.70978247217754],
        //-------------------------------------------------------------------
        "reslife office": [39.25679189440456, -76.70996169291159],
        "reslife facilities office": [39.25667980779895, -76.7092930617115],
        "ymca preschool center": [39.25797909672385, -76.70807972006365],
        "harbor hall": [39.257328352724244, -76.70848090815018],
        "chesapeake hall": [39.256806146378, -76.70860541481511],
        "satellite plant": [39.25699896147398, -76.707028330474],
        "the center for well-being": [39.25604836856641, -76.70903047865421],
        "susquehanna hall": [39.25604836856641, -76.70903047865421],
        "true grits": [39.25568951294304, -76.70784420685631],
        "potomac hall": [39.25596802790243, -76.70670981286698],
        "patapsco hall": [39.25510569913565, -76.70729084391283],
        "greenhouse": [39.258237387358584, -76.71352837917006],
        "central plant": [39.25759104359118, -76.7143893393311],
        //--------------------------------------------------------------------------
        "albin o. kuhn library & gallery": [39.25634274789053, -76.7116860013322],
        "library": [39.25634274789053, -76.7116860013322],
        //------------------------------------------------------------------------
        "retriever learning center": [39.25646127002805, -76.71130580586146],
        "rlc": [39.25646127002805, -76.71130580586146],
        //-------------------------------------------------------------------------------
        "financial aid and scholarship office": [39.256625671367885, -76.71234270259082],
        "scholarship office": [39.256625671367885, -76.71234270259082],
        //-------------------------------------------------------------------------------
        "public policy building": [39.25525076711157, -76.70928414053373],
        "public policy": [39.25525076711157, -76.70928414053373],
        //-----------------------------------------------------------------------------
        "physics building": [39.254500401386366, -76.70967184110336],
        "physics": [39.254500401386366, -76.70967184110336],
        //----------------------------------------------------------------------------
        "warehouse": [39.252663273271935, -76.70430793627368],
        //------------------------------------------------------------------------
        "facilities management building": [39.25197520862123, -76.70744658390562],
        "chesapeake arena": [39.25679875875331, -76.7085723424885],
        "interdisciplinary life sciences building": [39.25394973933029, -76.71102531418579],
        "ilsb": [39.25394973933029, -76.71102531418579],
        //-----------------------------------------------------------------------------------
        "the commons": [39.25498165688642, -76.71086794950686],
        "commons": [39.25498165688642, -76.71086794950686],
        //-----------------------------------------------------------------------------------
        "lecture hall 1": [39.25482860418606, -76.71182662514063],
        "biological sciences building": [39.254857442305, -76.71214637996125],
        "biology building": [39.254857442305, -76.71214637996125],
        //------------------------------------------------------------------------------------
        "retriever activities center": [39.25281114049344, -76.71252441928998],
        "rac": [39.25281114049344, -76.71252441928998],
        //------------------------------------------------------------------------------------
        "math & psychology building": [39.254082333515875, -76.71243021375282],
        "sondheim building": [39.25346182924767, -76.71278782840974],
        "meyerhoff chemistry building": [39.254976634159405, -76.71308215501345],
        "university center": [39.254376490237675, -76.7132251175669],
        "sherman hall": [39.25359133377247, -76.71322398959032],
        "administration building": [39.25306700577804, -76.71348322791367],
        "information technology/engineering building": [39.25383359280315, -76.71428726078719],
        "ite": [39.25383359280315, -76.71428726078719],
        "engineering building": [39.254558978076936, -76.71399716391333],
        "fine arts building": [39.25495953946026, -76.71370460017584],
        "performing arts & humanities building": [39.25510314572796, -76.71517938793554],
        //-----------------------------------------------------------------------------------
        "bwtech 5525": [39.24961455729257, -76.71142489375562],
        "bwtech 5523": [39.24976417578988, -76.71250013096193],
        "bwtech 5521": [39.24945843330289, -76.71487741322274],
        "bwtech 5522": [39.24792319555776, -76.71330655886665],
        "bwtech 5520": [39.24798824868646, -76.71460860392116],
        "umbc stadium complex": [39.250573889558346, -76.70749632656262],
        "umbc stadium ticket booth": [39.25050758004129, -76.70860137120687],
        "retriever soccer park ticket booth": [39.25184614891174, -76.70568534933862],
    };
      
    if (locations[searchQuery]) {
        map.flyTo(locations[searchQuery], 19); // Zoom in and move to location
    } else {
        alert("Location not found!");
    }
});
*/  

document.addEventListener("DOMContentLoaded", function() {
    // Select all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');

    // Add click event to each dropdown
    dropdowns.forEach(dropdown => {
        dropdown.querySelector('button').addEventListener('click', function() {
            // Toggle the active class to show/hide the dropdown content
            dropdown.classList.toggle('active');
        });
    });
});