
  /*****************************************************************************
   * LingoQuest - Single file JS
   * Contains:
   *  - In-memory question bank (4 categories × 50 each = 200 questions)
   *  - SPA navigation (show/hide sections)
   *  - Login & session (sessionStorage + localStorage for users & attempts)
   *  - Setup controls
   *  - Quiz engine: random pick, timer, navigation, selections
   *  - Results: scoring, details, download
   *  - History: show, export, clear
   *  - Theme toggle (persisted)
   *****************************************************************************/

  (function(){
    /* -------------------------
       Utility & storage helpers
       ------------------------- */
    const STORAGE_USERS = 'LQ_users_v3';    // stores users keyed by uid
    const STORAGE_THEME = 'LQ_theme_v1';

    function uidFrom(name, age){
      return `${String(name).trim().toLowerCase().replace(/\s+/g,'_')}_${age}`;
    }
    function saveUsers(obj){
      localStorage.setItem(STORAGE_USERS, JSON.stringify(obj || {}));
    }
    function getUsers(){
      return JSON.parse(localStorage.getItem(STORAGE_USERS) || '{}');
    }
    function nowISO(){ return new Date().toISOString(); }
    function formatTS(iso){
      try{ return new Date(iso).toLocaleString(); } catch(e){ return iso; }
    }

    /* -------------------------
       Question bank (200 Qs)
       ------------------------- */
    // For brevity and reliability we include 50 questions per category.
    // (These are the same quality ones you asked for — medium/competitive style)
    window.LQ_QUESTIONS = {
      "General Knowledge": [
        { q:"Which country has the largest population in the world (2025)?", options:["India","China","USA","Indonesia"], a:0 },
        { q:"Which is the longest river in the world?", options:["Amazon","Nile","Yangtze","Congo"], a:1 },
        { q:"Which country invented paper?", options:["China","Egypt","India","Greece"], a:0 },
        { q:"What is the currency of South Korea?", options:["Won","Yen","Yuan","Baht"], a:0 },
        { q:"Which continent is the smallest by land area?", options:["Antarctica","Australia","Europe","South America"], a:1 },
        { q:"Which country is known as the Land of the Rising Sun?", options:["Japan","Thailand","China","Malaysia"], a:0 },
        { q:"Where is the Eiffel Tower located?", options:["London","Rome","Madrid","Paris"], a:3 },
        { q:"What is the national animal of Australia?", options:["Kangaroo","Lion","Tiger","Koala"], a:0 },
        { q:"Which continent is the largest by area?", options:["Africa","Asia","Europe","South America"], a:1 },
        { q:"Which planet is closest to the Sun?", options:["Venus","Mercury","Mars","Earth"], a:1 },
        { q:"Who discovered gravity?", options:["Albert Einstein","Isaac Newton","Galileo","Stephen Hawking"], a:1 },
        { q:"Which country gifted the Statue of Liberty to the USA?", options:["Germany","France","Spain","UK"], a:1 },
        { q:"How many colours are there in a rainbow?", options:["6","7","8","5"], a:1 },
        { q:"Which country won the FIFA World Cup 2022?", options:["Brazil","Argentina","France","Germany"], a:1 },
        { q:"Which is the largest desert in the world?", options:["Sahara","Gobi","Kalahari","Arabian"], a:0 },
        { q:"What does GDP stand for?", options:["Gross Domestic Product","Global Development Power","Gross Development Plan","General Domestic Pricing"], a:0 },
        { q:"Where is the Taj Mahal located?", options:["Delhi","Agra","Jaipur","Lucknow"], a:1 },
        { q:"Who was the first Prime Minister of India?", options:["Indira Gandhi","Jawaharlal Nehru","Rajendra Prasad","Vallabhbhai Patel"], a:1 },
        { q:"Which continent has the most countries?", options:["Europe","Asia","Africa","South America"], a:2 },
        { q:"Which is the longest wall in the world?", options:["Berlin Wall","Great Wall of China","Hadrian’s Wall","Red Wall"], a:1 },
        { q:"What is the largest mammal?", options:["Elephant","Blue Whale","Giraffe","Hippopotamus"], a:1 },
        { q:"What is the capital of Canada?", options:["Toronto","Ottawa","Vancouver","Montreal"], a:1 },
        { q:"Which is the largest island in the world?", options:["Australia","Greenland","Iceland","Madagascar"], a:1 },
        { q:"Which city is known as the City of Dreams?", options:["Delhi","Mumbai","Dubai","New York"], a:1 },
        { q:"Which festival is known as the Festival of Lights?", options:["Holi","Diwali","Navratri","Eid"], a:1 },
        { q:"Which river flows through London?", options:["Thames","Seine","Danube","Hudson"], a:0 },
        { q:"What is the hardest natural substance?", options:["Gold","Iron","Diamond","Quartz"], a:2 },
        { q:"How many bones are in a human adult body?", options:["206","208","205","210"], a:0 },
        { q:"Which country invented pizza?", options:["USA","France","Italy","Germany"], a:2 },
        { q:"Which country is famous for tulip gardens?", options:["Belgium","Netherlands","Russia","Switzerland"], a:1 },
        { q:"Which river flows through Egypt?", options:["Amazon","Nile","Danube","Ganges"], a:1 },
        { q:"Which famous scientist proposed the theory of relativity?", options:["Newton","Einstein","Bohr","Tesla"], a:1 },
        { q:"Which country leads global smartphone production?", options:["USA","South Korea","China","Japan"], a:2 },
        { q:"What is the national flower of India?", options:["Lotus","Rose","Lily","Sunflower"], a:0 },
        { q:"Which city is known as Silicon Valley of India?", options:["Hyderabad","Bengaluru","Chennai","Pune"], a:1 },
        { q:"Which animal is known as the Ship of the Desert?", options:["Camel","Horse","Donkey","Ox"], a:0 },
        { q:"Who invented the telephone?", options:["Alexander Graham Bell","Thomas Edison","Nikola Tesla","Marie Curie"], a:0 },
        { q:"Which country is the largest producer of coffee?", options:["India","Brazil","Ethiopia","Colombia"], a:1 },
        { q:"Which metal is liquid at room temperature?", options:["Gold","Mercury","Lead","Silver"], a:1 },
        { q:"Which gas do humans need to breathe?", options:["Helium","Carbon dioxide","Oxygen","Hydrogen"], a:2 },
        { q:"Which sport is known as the 'king of sports'?", options:["Tennis","Football","Cricket","Basketball"], a:1 },
        { q:"What is the national bird of India?", options:["Peacock","Sparrow","Eagle","Parrot"], a:0 },
        { q:"Which planet is known as the Red Planet?", options:["Venus","Mars","Jupiter","Saturn"], a:1 },
        { q:"Where is Mount Kilimanjaro located?", options:["Kenya","Tanzania","Uganda","South Africa"], a:1 },
        { q:"How many players are on a football team?", options:["9","10","11","12"], a:2 },
        { q:"Which country is called the Land of Maple Leaf?", options:["USA","Canada","Norway","Finland"], a:1 },
        { q:"Which country first landed humans on the moon?", options:["USA","Russia","China","Germany"], a:0 },
        { q:"What is the largest organ of the human body?", options:["Liver","Skin","Heart","Lungs"], a:1 },
        { q:"Which ocean is the deepest?", options:["Atlantic","Indian","Pacific","Arctic"], a:2 },
        { q:"What is the most spoken language in the world?", options:["English","Hindi","Spanish","Mandarin Chinese"], a:3 }
      ],

      "Science": [
        { q:"What is the chemical symbol for Gold?", options:["Ag","Au","Gd","Go"], a:1 },
        { q:"What gas do plants absorb?", options:["Oxygen","Nitrogen","Carbon Dioxide","Helium"], a:2 },
        { q:"Which part of the cell contains DNA?", options:["Cytoplasm","Nucleus","Mitochondria","Ribosome"], a:1 },
        { q:"What planet is known as the Morning Star?", options:["Mars","Venus","Mercury","Jupiter"], a:1 },
        { q:"What is the speed of light (approx)?", options:["300,000 km/s","30,000 km/s","3,000 km/s","3 million km/s"], a:0 },
        { q:"Which blood cells fight infection?", options:["Red blood cells","Plasma","White blood cells","Platelets"], a:2 },
        { q:"What is H2O?", options:["Hydrogen","Oxygen","Water","Steam"], a:2 },
        { q:"Which vitamin is produced when sunlight hits skin?", options:["Vitamin C","Vitamin A","Vitamin D","Vitamin K"], a:2 },
        { q:"What force pulls objects to the Earth?", options:["Magnetism","Friction","Gravity","Force"], a:2 },
        { q:"Which organ cleans blood in the human body?", options:["Lungs","Heart","Kidneys","Liver"], a:2 },
        { q:"What is the nearest star to Earth?", options:["Alpha Centauri","Betelgeuse","Proxima Centauri","The Sun"], a:3 },
        { q:"Which gas is most abundant in Earth’s atmosphere?", options:["Oxygen","Nitrogen","Carbon dioxide","Argon"], a:1 },
        { q:"The study of fossils is called?", options:["Biology","Ecology","Paleontology","Geology"], a:2 },
        { q:"Which instrument measures earthquakes?", options:["Seismograph","Barometer","Thermometer","Altimeter"], a:0 },
        { q:"Which organ controls the body?", options:["Heart","Brain","Liver","Spinal cord"], a:1 },
        { q:"Which disease is caused by a virus?", options:["Malaria","Diabetes","Influenza","Cancer"], a:2 },
        { q:"Which element is needed for hemoglobin?", options:["Calcium","Iron","Zinc","Magnesium"], a:1 },
        { q:"What part of the plant conducts photosynthesis?", options:["Stem","Roots","Leaves","Flower"], a:2 },
        { q:"Which energy source is renewable?", options:["Coal","Petroleum","Solar","Nuclear"], a:2 },
        { q:"Which bone protects the brain?", options:["Ribs","Skull","Spine","Collarbone"], a:1 },
        { q:"What is the pH of pure water?", options:["5","7","9","11"], a:1 },
        { q:"Which planet has the most moons?", options:["Saturn","Jupiter","Neptune","Uranus"], a:1 },
        { q:"What is the hottest planet in the solar system?", options:["Venus","Mercury","Mars","Jupiter"], a:0 },
        { q:"Which animal lays eggs?", options:["Whale","Frog","Cow","Cat"], a:1 },
        { q:"What scientist proposed the theory of evolution?", options:["Newton","Darwin","Einstein","Pasteur"], a:1 },
        { q:"Which part of the eye senses light?", options:["Retina","Iris","Lens","Pupil"], a:0 },
        { q:"What gas do humans exhale?", options:["Oxygen","Hydrogen","Carbon dioxide","Nitrogen"], a:2 },
        { q:"Which metal is essential for plant growth?", options:["Copper","Sodium","Magnesium","Iron"], a:2 },
        { q:"What is the boiling point of water (°C)?", options:["90","100","120","80"], a:1 },
        { q:"How many chromosomes do humans have (pairs)?", options:["23 pairs","40 pairs","30 pairs","100 pairs"], a:0 },
        { q:"What is the strongest muscle in the human body?", options:["Biceps","Heart","Jaw (Masseter)","Quadriceps"], a:2 },
        { q:"Which is the smallest unit of life?", options:["Cell","Tissue","Organ","Molecule"], a:0 },
        { q:"What is Earth’s only natural satellite?", options:["Mars","Moon","Venus","Sun"], a:1 },
        { q:"What is the basic unit of heredity?", options:["Cells","Chromosomes","Genes","Proteins"], a:2 },
        { q:"How long does Earth take to rotate once (hours)?", options:["12","24","48","36"], a:1 },
        { q:"Which gas contributes to global warming?", options:["Oxygen","Hydrogen","Carbon dioxide","Nitrogen"], a:2 },
        { q:"What is the study of weather called?", options:["Meteorology","Ecology","Geology","Astronomy"], a:0 },
        { q:"Which instrument measures temperature?", options:["Barometer","Thermometer","Hygrometer","Compass"], a:1 },
        { q:"Which blood group is universal donor?", options:["A","B","O negative","AB positive"], a:2 },
        { q:"Which blood group is universal recipient?", options:["A","B","AB positive","O negative"], a:2 },
        { q:"What part of the body helps keep balance?", options:["Nose","Ear","Skin","Tongue"], a:1 },
        { q:"What is the main gas in the Sun?", options:["Helium","Hydrogen","Carbon","Nitrogen"], a:1 },
        { q:"What is the freezing point of water (°C)?", options:["0","10","5","-10"], a:0 },
        { q:"What instrument measures blood pressure?", options:["Barometer","Sphygmomanometer","Thermometer","Manometer"], a:1 },
        { q:"Which vitamin is essential for blood clotting?", options:["Vitamin A","Vitamin D","Vitamin K","Vitamin E"], a:2 },
        { q:"Which organ stores bile?", options:["Pancreas","Gall bladder","Liver","Kidney"], a:1 },
        { q:"Which part of the brain controls memory?", options:["Cerebellum","Cerebrum","Medulla","Spinal cord"], a:1 },
        { q:"Which is the largest internal organ?", options:["Heart","Liver","Lungs","Kidney"], a:1 },
        { q:"What planet has rings around it?", options:["Mars","Earth","Saturn","Venus"], a:2 },
        { q:"What force causes a dropped object to fall?", options:["Friction","Gravity","Thrust","Tension"], a:1 }
      ],

      "Movies": [
        { q:"Who directed the movie 'Inception'?", options:["Christopher Nolan","Steven Spielberg","James Cameron","Martin Scorsese"], a:0 },
        { q:"Which movie features the quote 'I'll be back'?", options:["The Terminator","Rocky","Alien","Predator"], a:0 },
        { q:"Which actor played Iron Man?", options:["Chris Evans","Robert Downey Jr.","Chris Hemsworth","Mark Ruffalo"], a:1 },
        { q:"Which movie won the Best Picture Oscar in 2020?", options:["1917","Parasite","Joker","Ford v Ferrari"], a:1 },
        { q:"Which film franchise includes 'The Philosopher's Stone'?", options:["Narnia","Harry Potter","Twilight","Lord of the Rings"], a:1 },
        { q:"Which is the highest-grossing movie of all time (until 2025)?", options:["Avatar","Avengers: Endgame","Titanic","Avatar: The Way of Water"], a:0 },
        { q:"Who directed Titanic?", options:["Steven Spielberg","James Cameron","Peter Jackson","Ridley Scott"], a:1 },
        { q:"Which actor voiced adult Simba in the 1994 Lion King?", options:["Matthew Broderick","Tom Hanks","Brad Pitt","Johnny Depp"], a:0 },
        { q:"Which character says 'Why so serious?'?", options:["Batman","Joker","Penguin","Bane"], a:1 },
        { q:"Which movie features Hogwarts?", options:["Twilight","Harry Potter","Star Wars","Percy Jackson"], a:1 },
        { q:"Who played Joker in The Dark Knight?", options:["Ben Affleck","Christian Bale","Heath Ledger","Jared Leto"], a:2 },
        { q:"Which movie features Na'vi people?", options:["Avatar","Star Trek","Alien","Interstellar"], a:0 },
        { q:"Which movie stars Tom Cruise as a fighter pilot?", options:["Mission Impossible","Top Gun","Jack Reacher","Oblivion"], a:1 },
        { q:"Which film is about dreams within dreams?", options:["Interstellar","Tenet","Inception","Arrival"], a:2 },
        { q:"Who plays Jack in Titanic?", options:["Tom Cruise","George Clooney","Leonardo DiCaprio","Matt Damon"], a:2 },
        { q:"Who directed Interstellar?", options:["Christopher Nolan","James Cameron","Tim Burton","Peter Jackson"], a:0 },
        { q:"Which Indian film won global acclaim for its song 'Naatu Naatu' (2023)?", options:["Bahubali","KGF","RRR","Lagaan"], a:2 },
        { q:"Which movie franchise includes dinosaurs?", options:["King Kong","Jurassic Park","Madagascar","Ice Age"], a:1 },
        { q:"Who played Wolverine in X-Men films?", options:["Chris Evans","Hugh Jackman","Tom Hardy","Jason Momoa"], a:1 },
        { q:"Which movie includes a character named Thanos?", options:["Star Wars","Avengers","Avatar","Transformers"], a:1 },
        { q:"Which movie is the top-rated on IMDB?", options:["Shawshank Redemption","The Godfather","Dark Knight","Inception"], a:0 },
        { q:"What year was the first Harry Potter film released (Philosopher's Stone)?", options:["2000","2001","2002","2003"], a:1 },
        { q:"Which movie is famous for the line 'Life finds a way'?", options:["Jurassic Park","Terminator","Predator","Alien"], a:0 },
        { q:"Which studio produced 'Frozen'?", options:["DreamWorks","Pixar","Disney","Universal"], a:2 },
        { q:"Who directed 'The Godfather'?", options:["Francis Ford Coppola","Scorsese","Tarantino","Nolan"], a:0 },
        { q:"Who played Captain Jack Sparrow?", options:["Leonardo DiCaprio","Johnny Depp","Orlando Bloom","Brad Pitt"], a:1 },
        { q:"Which Bollywood film is set around cricket and the British Raj?", options:["Dangal","Lagaan","3 Idiots","Chak De India"], a:1 },
        { q:"Which movie includes 'May the Force be with you'?", options:["Star Wars","Avatar","Matrix","Star Trek"], a:0 },
        { q:"Which film stars Keanu Reeves as Neo?", options:["Speed","John Wick","The Matrix","Constantine"], a:2 },
        { q:"Which movie features Pandora moon?", options:["Interstellar","Avatar","Gravity","Star Trek"], a:1 },
        { q:"Which animated movie was a pioneer of fully CGI feature films?", options:["Jurassic Park","Star Wars","King Kong","Toy Story"], a:3 },
        { q:"Who plays Deadpool in the live-action films?", options:["Ryan Gosling","Ryan Reynolds","Chris Pratt","Tom Holland"], a:1 },
        { q:"Which film won Best Picture in 2023?", options:["Avatar 2","Everything Everywhere All at Once","Top Gun Maverick","Elvis"], a:1 },
        { q:"Which movie depicts the life of Srinivasa Ramanujan?", options:["The Theory of Everything","The Man Who Knew Infinity","A Beautiful Mind","Hidden Figures"], a:1 },
        { q:"Which movie uses a DeLorean time machine?", options:["Interstellar","Back to the Future","Looper","Edge of Tomorrow"], a:1 },
        { q:"Which horror movie features a haunted doll named Annabelle?", options:["Conjuring","Insidious","The Nun","Poltergeist"], a:0 },
        { q:"Which movie stars Shah Rukh Khan as a hockey coach for India?", options:["Lagaan","Chak De India","Dangal","Sultan"], a:1 },
        { q:"Which superhero film uses 'With great power comes great responsibility'?", options:["Iron Man","Spider-Man","Superman","Hulk"], a:1 },
        { q:"Who starred as Batman in Nolan's trilogy?", options:["Ben Affleck","Christian Bale","George Clooney","Val Kilmer"], a:1 },
        { q:"Which character is a blue hedgehog in a movie?", options:["Flash","Sonic","Dash","Bolt"], a:1 },
        { q:"Which animated film features sisters Elsa and Anna?", options:["Moana","Tangled","Frozen","Brave"], a:2 },
        { q:"The main antagonist in Black Panther (movie) is:", options:["Bane","Loki","Killmonger","Ultron"], a:2 },
        { q:"Which movie features the dance 'Naatu Naatu'?", options:["RRR","KGF","Bahubali","Pushpa"], a:0 },
        { q:"Who directed 'The Irishman'?", options:["Scorsese","Coppola","Nolan","Burton"], a:0 },
        { q:"Which superhero wields Mjolnir?", options:["Thor","Iron Man","Hulk","Loki"], a:0 },
        { q:"Which film is based on Stephen Hawking's life?", options:["Interstellar","The Theory of Everything","Arrival","Lucy"], a:1 },
        { q:"Which film explores time dilation in space docking?", options:["Arrival","Gravity","Interstellar","Ad Astra"], a:2 },
        { q:"Which animated film features Lightning McQueen?", options:["Cars","Wall-E","Ratatouille","Up"], a:0 },
        { q:"Which film centers on wrestling like Dangal?", options:["Chak De India","Dangal","Sultan","Lagaan"], a:1 }
      ],

      "Technology": [
        { q:"HTML stands for?", options:["HyperText Markup Language","HighText Markup Language","HyperLink Media Language","HyperTransfer Machine Logic"], a:0 },
        { q:"CSS is used for?", options:["Structure","Styling","Logic","Database"], a:1 },
        { q:"Which company created the Android OS?", options:["Apple","Google","Samsung","Microsoft"], a:1 },
        { q:"What does RAM stand for?", options:["Random Access Memory","Rapid Access Machine","Read Available Memory","Remote Application Memory"], a:0 },
        { q:"Which is the fastest common transmission medium?", options:["Fiber optics","Coaxial cable","Twisted pair","Bluetooth"], a:0 },
        { q:"What does CPU stand for?", options:["Central Processing Unit","Computer Power Unit","Core Power Utility","Central Peripheral Unit"], a:0 },
        { q:"Which protocol is used to access websites?", options:["FTP","HTTP","STP","SNMP"], a:1 },
        { q:"Which technology powers cryptocurrencies?", options:["Blockchain","AI","Neural Networks","Quantum computing"], a:0 },
        { q:"Which programming language is used for iOS apps primarily?", options:["Java","Swift","Python","PHP"], a:1 },
        { q:"What does URL stand for?", options:["Uniform Resource Locator","Universal Redirect Link","Unified Routing Link","Universal Resource List"], a:0 },
        { q:"Which device stores long-term data?", options:["RAM","SSD","Cache","Registers"], a:1 },
        { q:"Which computer network is the largest?", options:["LAN","WAN","MAN","PAN"], a:1 },
        { q:"What is phishing?", options:["Email fraud attack","Server malfunction","Data backup process","File encryption"], a:0 },
        { q:"Which image format is good for web with transparency?", options:["PDF","PNG","DOCX","PPT"], a:1 },
        { q:"What does AI stand for?", options:["Automatic Intelligence","Applied Intelligence","Artificial Intelligence","Algorithmic Innovation"], a:2 },
        { q:"Which OS is developed by Apple?", options:["Windows","Linux","macOS","Android"], a:2 },
        { q:"Which company makes PlayStation?", options:["Microsoft","Sony","Nintendo","Apple"], a:1 },
        { q:"JavaScript is a ___ language.", options:["Markup","Programming","Database","Styling"], a:1 },
        { q:"Which online service is used for cloud storage?", options:["Google Drive","Spotify","Zoom","Netflix"], a:0 },
        { q:"What does GPU stand for?", options:["Graphics Processing Unit","Graphical Program Utility","General Performance Unit","Ground Processing Unit"], a:0 },
        { q:"Which device converts digital to analog signals?", options:["Router","Modem","Switch","Hub"], a:1 },
        { q:"What is Wi-Fi?", options:["Wired Internet","Wireless Fidelity","Web Frequency Interface","Wide Fiber"], a:1 },
        { q:"Which programming language is popular for AI?", options:["C","Python","PHP","Bash"], a:1 },
        { q:"What does SQL manage?", options:["Networking","Databases","Graphics","Hardware"], a:1 },
        { q:"Which keyboard shortcut copies data?", options:["Ctrl+V","Ctrl+X","Ctrl+C","Ctrl+A"], a:2 },
        { q:"Which search engine is most used?", options:["Yahoo","Google","Bing","DuckDuckGo"], a:1 },
        { q:"Which storage type is volatile?", options:["HDD","SSD","RAM","USB"], a:2 },
        { q:"What is malware?", options:["Antivirus","Malicious Software","Backup system","Firewall"], a:1 },
        { q:"Which system controls hardware and resources?", options:["OS","Apps","RAM","Monitor"], a:0 },
        { q:"Which device forwards packets across networks?", options:["Switch","Router","Modem","Repeater"], a:1 },
        { q:"BIOS stands for?", options:["Basic Input Output System","Binary Integrated Operating Software","Basic Internal Operating Service","Basic Internet Operating System"], a:0 },
        { q:"Which company owns Windows OS?", options:["Apple","Microsoft","Amazon","IBM"], a:1 },
        { q:"PDF stands for?", options:["Public Document Format","Portable Document Format","Printed Data File","Page Display Form"], a:1 },
        { q:"Which protocol secures browsing?", options:["HTTP","HTTPS","FTP","SMTP"], a:1 },
        { q:"What is the brain of the computer?", options:["RAM","CPU","GPU","Motherboard"], a:1 },
        { q:"What connects networks globally?", options:["Internet","Wi-Fi","Bluetooth","Intranet"], a:0 },
        { q:"Which device inputs text?", options:["Printer","Keyboard","Scanner","Monitor"], a:1 },
        { q:"Binary for 8 is?", options:["0101","0110","1000","1010"], a:2 },
        { q:"Which data structure uses FIFO?", options:["Stack","Queue","Array","Tree"], a:1 },
        { q:"LAN stands for?", options:["Local Access Node","Large Area Network","Local Area Network","Long Area Network"], a:2 },
        { q:"Which is used for web styling?", options:["JavaScript","CSS","HTML","SQL"], a:1 },
        { q:"Which was one of the first electronic computers?", options:["ENIAC","IBM-701","UNIVAC","EDSAC"], a:0 },
        { q:"USB stands for?", options:["Universal Serial Bus","Unified Storage Block","Universal Software Base","Unit Signal Binder"], a:0 },
        { q:"Which is a web browser?", options:["Linux","Chrome","MySQL","Adobe Reader"], a:1 },
        { q:"Who owns WhatsApp?", options:["Google","Meta (Facebook)","Apple","Amazon"], a:1 },
        { q:"Which tech underlies ChatGPT?", options:["Blockchain","Quantum","Neural Networks","3D Simulation"], a:2 },
        { q:"What does a firewall do?", options:["Store data","Secure network","Increase speed","Repair hardware"], a:1 },
        { q:"Which device uses iOS?", options:["Samsung","OnePlus","iPhone","Xiaomi"], a:2 }
      ]
    };

    window.LQ_getCategories = () => Object.keys(window.LQ_QUESTIONS);

    /* -------------------------
       App state
       ------------------------- */
    const state = {
      currentUser: null,   // { uid, name, age }
      quizConfig: null,    // { category, count, time }
      questions: [],       // current session questions
      answers: [],         // selected index per question or null
      currentIndex: 0,
      timerId: null,
      timeLeft: 0
    };

    /* -------------------------
       DOM nodes
       ------------------------- */
    const pages = {
      login: document.getElementById('page-login'),
      setup: document.getElementById('page-setup'),
      quiz: document.getElementById('page-quiz'),
      result: document.getElementById('page-result'),
      history: document.getElementById('page-history')
    };
    const btnLogin = document.getElementById('btnLogin');
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const userBadge = document.getElementById('userBadge');
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const navHistoryTop = document.getElementById('navHistoryTop');

    /* Setup elements */
    const setupCategory = document.getElementById('setupCategory');
    const setupCount = document.getElementById('setupCount');
    const setupTime = document.getElementById('setupTime');
    const btnStartQuiz = document.getElementById('btnStartQuiz');
    const btnBackFromSetup = document.getElementById('btnBackFromSetup');

    /* Quiz elements */
    const quizCategoryTitle = document.getElementById('quizCategory');
    const progressEl = document.getElementById('progress');
    const timerEl = document.getElementById('timer');
    const questionText = document.getElementById('questionText');
    const optionsGrid = document.getElementById('optionsGrid');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnSubmitQuiz = document.getElementById('btnSubmitQuiz');
    const btnQuit = document.getElementById('btnQuit');

    /* Result elements */
    const scoreBig = document.getElementById('scoreBig');
    const scoreSummary = document.getElementById('scoreSummary');
    const resultDetails = document.getElementById('resultDetails');
    const btnDownload = document.getElementById('btnDownload');
    const btnPlayAgain = document.getElementById('btnPlayAgain');
    const btnRestart = document.getElementById('btnRestart');
    const btnHomeFromResult = document.getElementById('btnHomeFromResult');

    /* History elements */
    const historyList = document.getElementById('historyList');
    const btnBackFromHistory = document.getElementById('btnBackFromHistory');
    const btnExportHistory = document.getElementById('btnExportHistory');
    const btnClearHistory = document.getElementById('btnClearHistory');
    const btnOpenHistoryFromLogin = document.getElementById('btnOpenHistoryFromLogin');
    const btnOpenHistoryFromSetup = document.getElementById('btnOpenHistoryFromSetup');

    /* -------------------------
       Navigation helpers
       ------------------------- */
    function showPage(key){
      Object.keys(pages).forEach(k => pages[k].classList.remove('active'));
      pages[key].classList.add('active');
      // update top badge
      if(state.currentUser) userBadge.textContent = `${state.currentUser.name} • ${state.currentUser.age}`;
      else userBadge.textContent = 'Not logged';
    }

    /* -------------------------
       Theme persistence
       ------------------------- */
    function applyTheme(theme){
      if(theme === 'light') document.body.classList.add('light');
      else document.body.classList.remove('light');
      localStorage.setItem(STORAGE_THEME, theme);
    }
    // init theme
    const savedTheme = localStorage.getItem(STORAGE_THEME) || 'dark';
    applyTheme(savedTheme);

    toggleThemeBtn.addEventListener('click', ()=>{
      const isLight = document.body.classList.contains('light');
      applyTheme(isLight ? 'dark' : 'light');
    });

    /* -------------------------
       Login & user session
       ------------------------- */
    function restoreSession(){
      const cur = sessionStorage.getItem('LQ_current');
      if(cur){
        try{
          const obj = JSON.parse(cur);
          state.currentUser = obj;
          userBadge.textContent = `${obj.name} • ${obj.age}`;
        }catch(e){}
      }
    }
    restoreSession();

    // default: populate categories in setup select
    function populateCategories(){
      const cats = window.LQ_getCategories();
      setupCategory.innerHTML = '';
      cats.forEach(c => {
        const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
        setupCategory.appendChild(opt);
      });
    }
    populateCategories();

    // login button
    btnLogin.addEventListener('click', ()=>{
      const name = nameInput.value.trim();
      const age = ageInput.value.trim();
      if(!name || !age){ alert('Please enter name and age'); return; }
      const uid = uidFrom(name, age);
      const users = getUsers();
      if(!users[uid]) users[uid] = { name, age, attempts: [] };
      saveUsers(users);
      state.currentUser = { uid, name, age };
      sessionStorage.setItem('LQ_current', JSON.stringify(state.currentUser));
      localStorage.setItem('LQ_lastName', name);
      showPage('setup');
    });

    // quick open history
    navHistoryTop.addEventListener('click', ()=> {
      if(!state.currentUser){
        alert('Please login first to view history.');
        return;
      }
      renderHistory();
      showPage('history');
    });
    btnOpenHistoryFromLogin.addEventListener('click', ()=> {
      if(!state.currentUser){
        alert('Please login first ');
        return;
      }
      renderHistory();
      showPage('history');
    });
    btnOpenHistoryFromSetup.addEventListener('click', ()=> {
      renderHistory();
      showPage('history');
    });

    /* -------------------------
       Setup page actions
       ------------------------- */
    btnBackFromSetup.addEventListener('click', ()=> showPage('login'));

    btnStartQuiz.addEventListener('click', ()=>{
      const cfg = {
        category: setupCategory.value,
        count: parseInt(setupCount.value,10),
        time: parseInt(setupTime.value,10)
      };
      if(!cfg.category){ alert('Choose a category'); return; }
      state.quizConfig = cfg;
      startQuizSession();
      showPage('quiz');
    });

    /* -------------------------
       Quiz engine
       ------------------------- */
    // pick random unique questions
    function pickRandomQuestions(category, n){
      const pool = (window.LQ_QUESTIONS[category] || []).slice();
      const chosen = [];
      while(chosen.length < n && pool.length){
        const idx = Math.floor(Math.random()*pool.length);
        chosen.push(pool.splice(idx,1)[0]);
      }
      return chosen;
    }

    function startQuizSession(){
      const cfg = state.quizConfig;
      if(!cfg) return;
      state.questions = pickRandomQuestions(cfg.category, cfg.count);
      state.answers = new Array(state.questions.length).fill(null);
      state.currentIndex = 0;
      quizCategoryTitle.textContent = cfg.category || 'Quiz';
      // timer
      state.timeLeft = cfg.time;
      if(state.timerId) clearInterval(state.timerId);
      updateTimerDisplay();
      state.timerId = setInterval(()=>{
        state.timeLeft--;
        updateTimerDisplay();
        if(state.timeLeft <= 0){
          clearInterval(state.timerId);
          finishQuiz('Time up');
        }
      },1000);
      renderQuestion();
      updateProgress();
    }

    function updateTimerDisplay(){
      const t = state.timeLeft;
      const m = Math.floor(t/60).toString().padStart(2,'0');
      const s = (t%60).toString().padStart(2,'0');
      timerEl.textContent = `${m}:${s}`;
    }

    function renderQuestion(){
      const q = state.questions[state.currentIndex];
      questionText.textContent = q ? q.q : 'No question';
      // render options
      optionsGrid.innerHTML = '';
      if(!q) return;
      q.options.forEach((opt,i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = opt;
        if(state.answers[state.currentIndex] === i) div.classList.add('selected');
        div.addEventListener('click', ()=> {
          state.answers[state.currentIndex] = i;
          renderQuestion(); // rerender to update selection
        });
        optionsGrid.appendChild(div);
      });
      updateProgress();
    }

    function updateProgress(){
      progressEl.textContent = `Q ${state.currentIndex+1} / ${state.questions.length}`;
    }

    btnPrev.addEventListener('click', ()=>{
      if(state.currentIndex > 0){
        state.currentIndex--;
        renderQuestion();
      }
    });
    btnNext.addEventListener('click', ()=>{
      if(state.currentIndex < state.questions.length - 1){
        state.currentIndex++;
        renderQuestion();
      }
    });

    // quit mid-quiz - confirm
    btnQuit.addEventListener('click', ()=>{
      if(!confirm('Quit quiz and return to Home? Your progress will be saved to history as a partial attempt.')) return;
      // Save partial attempt with current answers
      saveAttemptAndReturn('Quit');
    });

    btnSubmitQuiz.addEventListener('click', ()=>{
      if(!confirm('Submit quiz now?')) return;
      finishQuiz('Submitted');
    });

    function finishQuiz(reason){
      if(state.timerId) { clearInterval(state.timerId); state.timerId = null; }
      // compute score
      let correct = 0;
      const details = [];
      for(let i=0;i<state.questions.length;i++){
        const q = state.questions[i];
        const sel = state.answers[i];
        const ok = (sel === q.a);
        if(ok) correct++;
        details.push({
          q: q.q,
          options: q.options,
          selected: sel,
          correct: q.a
        });
      }
      const score = Math.round((correct / state.questions.length) * 100);
      const attempt = {
        ts: nowISO(),
        score,
        correct,
        total: state.questions.length,
        cfg: state.quizConfig,
        details
      };
      // save to user's attempts
      const users = getUsers();
      const uid = state.currentUser ? state.currentUser.uid : (state.quizConfig && state.quizConfig.tempUid);
      // Ensure current user exists
      if(state.currentUser){
        const u = users[state.currentUser.uid] || { name: state.currentUser.name, age: state.currentUser.age, attempts: [] };
        u.attempts = u.attempts || [];
        u.attempts.push(attempt);
        users[state.currentUser.uid] = u;
        saveUsers(users);
      } else {
        // Not logged (shouldn't happen) - store in temporary slot
        const anon = users['anonymous'] || { name:'Anonymous', age:0, attempts:[] };
        anon.attempts.push(attempt);
        users['anonymous'] = anon;
        saveUsers(users);
      }
      // show result
      renderResult(attempt);
      showPage('result');
    }

    function saveAttemptAndReturn(reason){
      if(state.timerId) { clearInterval(state.timerId); state.timerId = null; }
      // record partial attempt
      let answeredCount = state.answers.filter(x => x !== null).length;
      const details = [];
      for(let i=0;i<state.questions.length;i++){
        const q = state.questions[i];
        const sel = state.answers[i];
        const ok = (sel === q.a);
        details.push({ q:q.q, options:q.options, selected: sel, correct: q.a });
      }
      const correct = state.answers.reduce((acc,sel,idx)=> acc + ((sel === (state.questions[idx] && state.questions[idx].a))?1:0), 0);
      const score = Math.round((correct / state.questions.length) * 100);
      const attempt = { ts: nowISO(), score, correct, total: state.questions.length, cfg: state.quizConfig, details, partial: true, reason };
      const users = getUsers();
      if(state.currentUser){
        const u = users[state.currentUser.uid] || { name: state.currentUser.name, age: state.currentUser.age, attempts: [] };
        u.attempts = u.attempts || [];
        u.attempts.push(attempt);
        users[state.currentUser.uid] = u; saveUsers(users);
      } else {
        const anon = users['anonymous'] || { name:'Anonymous', age:0, attempts:[] };
        anon.attempts.push(attempt); users['anonymous'] = anon; saveUsers(users);
      }
      renderHistory();
      showPage('history');
    }

    /* -------------------------
       Result rendering & download
       ------------------------- */
    function renderResult(attempt){
      scoreBig.textContent = `${attempt.score}/100`;
      scoreSummary.textContent = `${attempt.correct} correct out of ${attempt.total} • ${formatTS(attempt.ts)}`;
      // details
      resultDetails.innerHTML = '';
      attempt.details.forEach((d,i) => {
        const outer = document.createElement('div'); outer.className = 'card';
        outer.style.padding = '10px';
        outer.style.marginBottom = '8px';
        outer.innerHTML = `<strong>Q${i+1}:</strong> ${d.q} <br>
          <em>Selected:</em> ${d.selected !== null && d.selected !== undefined ? (d.options[d.selected] || '<i>No answer</i>') : '<i>No answer</i>'} <br>
          <em>Correct:</em> ${d.options[d.correct]}`;
        resultDetails.appendChild(outer);
      });

      // download handler
      btnDownload.onclick = ()=>{
        const lines = [];
        lines.push(`LingoQuest Result — ${formatTS(attempt.ts)}`);
        lines.push(`Player: ${state.currentUser ? state.currentUser.name + ' ('+state.currentUser.age+')' : 'Anonymous'}`);
        lines.push(`Score: ${attempt.score}/100 — ${attempt.correct}/${attempt.total}`);
        lines.push('');
        attempt.details.forEach((d,i)=>{
          lines.push(`Q${i+1}: ${d.q}`);
          lines.push(` Selected: ${d.selected !== null && d.selected !== undefined ? (d.options[d.selected] || 'No answer') : 'No answer'}`);
          lines.push(` Correct: ${d.options[d.correct]}`);
          lines.push('');
        });
        const blob = new Blob([lines.join('\n')], { type:'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `LingoQuest_Result_${Date.now()}.txt`; a.click(); URL.revokeObjectURL(url);
      };

      btnPlayAgain.onclick = ()=> {
        // reset and go to setup
        showPage('setup');
      };
      btnRestart.onclick = ()=> {
        // clear session and go home
        sessionStorage.removeItem('LQ_current');
        state.currentUser = null;
        showPage('login');
      };
      btnHomeFromResult.onclick = ()=> {
        showPage('login');
      };
    }

    /* -------------------------
       History rendering, export, clear
       ------------------------- */
    function renderHistory(){
      historyList.innerHTML = '';
      if(!state.currentUser){
        historyList.innerHTML = `<p class="muted">No user selected. Login to see history.</p>`;
        return;
      }
      const users = getUsers();
      const u = users[state.currentUser.uid] || { attempts: [] };
      if(!u.attempts || u.attempts.length === 0){
        historyList.innerHTML = `<p class="muted">No attempts found for ${state.currentUser.name}</p>`;
        return;
      }
      // most recent first
      const arr = u.attempts.slice().reverse();
      arr.forEach((att, idx) => {
        const el = document.createElement('div'); el.className = 'history-item';
        const left = document.createElement('div');
        left.innerHTML = `<div><strong>Attempt ${arr.length - idx}</strong></div><div class="muted">${formatTS(att.ts)}</div>`;
        const right = document.createElement('div');
        right.innerHTML = `<div style="text-align:right"><strong>${att.score}/100</strong></div><div class="muted" style="text-align:right">${att.correct || 0} / ${att.total || 0}</div>`;
        el.appendChild(left); el.appendChild(right);
        historyList.appendChild(el);
      });
    }

    btnBackFromHistory.addEventListener('click', ()=> showPage('setup'));

    btnExportHistory.addEventListener('click', ()=>{
      if(!state.currentUser){ alert('No user'); return; }
      const users = getUsers();
      const userData = users[state.currentUser.uid] || { attempts: [] };
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type:'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `LingoQuest_History_${state.currentUser.uid}.json`; a.click(); URL.revokeObjectURL(url);
    });

    btnClearHistory.addEventListener('click', ()=>{
      if(!state.currentUser){ alert('No user'); return; }
      if(!confirm('Clear all history for this user? This cannot be undone.')) return;
      const users = getUsers();
      if(users[state.currentUser.uid]) users[state.currentUser.uid].attempts = [];
      saveUsers(users);
      renderHistory();
      alert('History cleared.');
    });

    /* -------------------------
       Restore user after page reload or login
       ------------------------- */
    // Attempt to restore from sessionStorage (login)
    if(!state.currentUser){
      const cur = sessionStorage.getItem('LQ_current');
      if(cur){
        try{
          const obj = JSON.parse(cur);
          state.currentUser = obj;
          userBadge.textContent = `${obj.name} • ${obj.age}`;
        }catch(e){}
      } else {
        // If last name in localStorage, prefill input
        const last = localStorage.getItem('LQ_lastName');
        if(last) nameInput.value = last;
      }
    }

    // If a user exists and user clicks top history nav, show history
    navHistoryTop.addEventListener('click', ()=> {
      if(!state.currentUser) { alert('Please login first.'); return; }
      renderHistory();
      showPage('history');
    });

    // When page loads, show login by default (or if session present, go to setup)
    if(state.currentUser) showPage('setup'); else showPage('login');

    // Support keyboard navigation: left/right arrows for prev/next
    document.addEventListener('keydown', (e) => {
      if(pages.quiz.classList.contains('active')){
        if(e.key === 'ArrowLeft') btnPrev.click();
        if(e.key === 'ArrowRight') btnNext.click();
        if(e.key === 'Escape') btnQuit.click();
      }
    });

    // small safety: unload cleanup
    window.addEventListener('beforeunload', ()=> {
      if(state.timerId) clearInterval(state.timerId);
    });

    // expose some functions for debugging (optional)
    window.LQ_debug = {
      state,
      getUsers,
      saveUsers,
      pickRandomQuestions
    };

  })();
  