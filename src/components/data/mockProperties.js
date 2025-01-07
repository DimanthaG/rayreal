const mockProperties = [
  {
    id: "1",
    name: "20 Perch Land with Two-Storied House",
    price: "Rs. 120 Million (Negotiable)",
    description: `20 perch land with a two-storied house (2900 sq.ft) for sale at Mirihana, Nugegoda. 
      - 04 bedrooms, 02 bathrooms, servant room & a bathroom
      - Parking for 03 vehicles, two mango trees & a coconut tree
      - 50 meters to Jubilee Post, near Naga Viharaya & St. Thomas’ Church.`,
    address: "Mirihana, Nugegoda",
    images: [
      "https://i.imgur.com/DonHARn.jpeg",
      "https://imgur.com/RkZVeh0.jpeg",
      "https://imgur.com/MGaRzbM.jpeg",
      "https://imgur.com/WKXIZco.jpeg",
      "https://imgur.com/qDQvSlZ.jpeg",
      "https://imgur.com/KU9715f.jpeg",
    ],
  },
  {
    id: "2",
    name: "5.5 Acres Land in Paiyagala",
    price: "LKR. 80,000 per Perch",
    description: `Spacious 5.5 acres of land located in Paiyagala, Kalutara District:
      - 2.5 km from Daluawatte junction Galle road (land side)
      - 6-7 km from the Southern highway Dodangoda exit
      - Beautiful environment with trees and two natural spring water wells
      - 15-20 ft access roads and Weragala bus-route availability
      - Ideal for hotel projects, housing, or agriculture (rubber/tea cultivation).`,
    address: "Paiyagala, Kalutara District",
    images: [
      "https://imgur.com/RwiV3OF.jpeg",
      "https://imgur.com/frifblF.jpeg",
      "https://imgur.com/YOWEACM.jpeg",
      "https://imgur.com/KkzUknc.jpeg",
      "https://imgur.com/JM0TmN6.jpeg",
      "https://imgur.com/JM0TmN6.jpeg",
      "https://imgur.com/kPNkSgC.jpeg",
      "https://imgur.com/LGi1Pap.jpeg",

    ],
  },
  {
    id: "3",
    name: "5.5 Perches Land in Gonapola",
    price: "LKR. 34 Laks",
    description: `A compact and affordable property in Gonapola, Olaboduwa:
      - 5.5 perches of land with 8 ft road access
      - Includes 1 room, kitchen, living room, and bathroom
      - Ideal for small families or as a budget-friendly investment.`,
    address: "Gonapola, Olaboduwa",
    images: [
      "https://imgur.com/dMXFzup.jpeg",
      "https://imgur.com/nl9KDku.jpeg",
      "https://imgur.com/NhtbZo8.jpeg",
      "https://imgur.com/RAmhWEz.jpeg",
      "https://imgur.com/vCxaoaP.jpeg",
    ],
  },
  {
    id: "4",
    name: "Valuable Land in Borelesgamuwa",
    price: "LKR. 2.5 Million per Perch",
    description: `14 perches of valuable land in Borelesgamuwa with great connectivity:
      - Square land block with a parapet wall
      - 03-room old house with water and electricity
      - Located 150m from Colombo-Horana main road
      - Close to Borelesgamuwa junction and Dehiwala-Maharagama Road
      - Clear titles and single ownership.`,
    address: "Pirivena Road, Borelesgamuwa",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png",
    ],
  },
  {
    id: "5",
    name: "Land for Sale in Maligathenna",
    price: "LKR 450,000 per Perch (Negotiable)",
    description: `17 perches of land available for sale in Maligathenna:
    - Located in Gurudeniya East with approximate location shown.
    - Ideal for residential purposes or investment.
    - Price per perch is negotiable.`,
    address: "Gurudeniya East",
    images: [
      "https://i.imgur.com/BywsSeQ.jpeg",
      "https://i.imgur.com/1N4K7XP.jpeg",
      "https://i.imgur.com/jR4xxck.jpeg",
      "https://i.imgur.com/OtHuivd.jpeg",
      "https://i.imgur.com/iMCGvEC.jpeg",
      "https://i.imgur.com/wQcemO6.jpeg",
    ],
  },
  {
    id: "6",
    name: "Land for Sale in Battaramulla",
    price: "LKR 5.5 Million per Perch",
    description: `11.70 Perches, Prime land available for sale in Battaramulla:
    - Suitable for residential purposes.
    - Located in a peaceful and convenient area.
    - Price per perch: LKR 5.9 Million.`,
    address: "Battaramulla",
    images: [
      "https://imgur.com/ry5Jktz.jpeg",
      "https://imgur.com/MLv37wV.jpeg",
      "https://imgur.com/pmmw8kS.jpeg",
      "https://imgur.com/7JvME29.jpeg",
      "https://imgur.com/agQVZbU.jpeg",
      "https://imgur.com/kRZfndr.jpeg",
      "https://imgur.com/zKRl5o1.jpeg",
      "https://i.imgur.com/rDdnOne.mp4",


    ],
  },
  {
    id: "7",
    name: "Jaffna Land",
    price: "1.5 million p.p.",
    description: `Total extend: 284.142 perches
  - Prime land in Jaffna, ideal for investment or development
  - Spacious area with easy access to nearby amenities`,
    address: "Jaffna",
    images: [
      "https://i.imgur.com/l9XyoGE.jpeg", 
      "https://i.imgur.com/P3kIQPQ.jpeg",
      "https://i.imgur.com/9hvyzKA.jpeg",
      "https://i.imgur.com/DPw64jb.jpeg",
      "https://i.imgur.com/bRVmqoR.jpeg",
    ],
  },
  {
    id: "8",
    name: "Luxury Villa in Thalawathugoda",
    price: "Rs. 150 Million",
    description: `A stunning luxury villa located in the serene surroundings of Thalawathugoda, Wikramasinghapura. This property includes:
    - 24 perches of land
    - Beautiful modern architecture with premium finishing
    - Spacious living and dining areas
    - Luxurious bedrooms with en-suite bathrooms
    - A private swimming pool
    - Landscaped garden areas`,
    address: "Thalawathugoda, Wikramasinghapura, Lake Road",
    images: [
      "https://i.imgur.com/gyFbePy.jpeg",
      "https://i.imgur.com/cXNU7Ji.jpeg",
      "https://i.imgur.com/SmedZEM.jpeg",
      "https://i.imgur.com/5f4iYZJ.jpeg",
      "https://i.imgur.com/Kfy6eGP.jpeg",
      "https://i.imgur.com/bI9dGsm.jpeg",
      "https://i.imgur.com/TpxB6ru.jpeg",
      "https://i.imgur.com/isGotuu.jpeg",
      "https://i.imgur.com/jj3lFWV.jpeg",
      "https://i.imgur.com/uX5WZe9.jpeg",
      "https://i.imgur.com/CWC1qNM.jpeg",
    ],
  },
  {
    "id": "9",
    "name": "House and Land for Sale near Homagama",
    "price": "Contact for Price",
    "description": `
      Located in a peaceful and well-developed area near Homagama, this 23-perch property with a fully completed house is now available for immediate sale.
      
      Key Features:
      - 4 spacious bedrooms and 2 bathrooms
      - Large veranda for relaxation
      - High-quality finishing with Kohomba wood for the roof, doors, and windows
      - Separate servant quarters with a bathroom
      - CCTV security system
      - Clear freehold deed (Sinnakkara)
      
      Location Highlights:
      - 200m to Pitipana Junction, Homagama
      - 100m to 129 Moragahahena Road
      - 10 minutes to NSBM Green University, Mahinda Rajapaksha College, Nano Tec, and affiliated universities
      
      Additional Potential:
      - Space available to build another house
      - Ideal for a student hostel due to high demand from university students
    `,
    "address": "Pitipana Junction, Homagama",
    "images": [
      "https://i.imgur.com/8IvGTmg.jpeg",
      "https://i.imgur.com/2zE900i.jpeg",
      "https://i.imgur.com/zuCst6K.jpeg",
      "https://i.imgur.com/edVB62U.jpeg",
      "https://i.imgur.com/fQ09Cfg.jpeg",
      "https://i.imgur.com/s8E7R6n.jpeg",
      "https://i.imgur.com/HcHFEe8.jpeg",
    ],
  },
  {
    "id": "10",
    "name": "Two-Story House and 10 Perches of Land for Sale in Panadura, Keselwatta",
    "price": "Market Value: Rs. 25.5 Million | Special Price: Rs. 18 Million",
    "description": `
      🔰 Prime Location Highlights:
      - Just 600m to the main bus route
      - Only 1km to Galle Road
  
      🏡 Property Details:
      - Bedrooms:
        - Ground Floor: 2
        - Upper Floor: 2
      - Living Rooms:
        - Ground Floor: 1
        - Upper Floor: 1
      - Verandas:
        - Ground Floor: 1
        - Upper Floor: 1
      - Bathrooms:
        - Ground Floor: 1
        - Upper Floor: 1
      - Dining Room
      - Kitchen
  
      🌳 Land Features:
      - House built on 6 perches, with 4 perches of landscaped garden space
      - Garden includes:
        - 5 coconut trees
        - Mango, jambo, guava, ambarella, and banana plants
  
      ✨ Additional Benefits:
      - Ground floor fully tiled
      - Secure property with a boundary wall
  
      💎 Invest Smart – A Rare Opportunity:
      - Market value estimated at Rs. 25.5 Million
      - Now available for a special price of Rs. 18 Million
    `,
    "address": "Panadura, Keselwatta",
    "images": [
      "https://i.imgur.com/2yVEQmL.jpeg",
      "https://i.imgur.com/rz7zLDI.jpeg",
      "https://i.imgur.com/YUSQxNx.jpeg",
      "https://i.imgur.com/wHEtKnQ.jpeg",
      "https://imgur.com/gZhsvON.jpeg",
      "https://imgur.com/kCwwMKW.jpeg",
      "https://imgur.com/T7dldid.jpeg",
      "https://imgur.com/RpcZdcV.jpeg",
      "https://imgur.com/4X0bLsJ.jpeg",


    ],
  },
  {
    "id": "11",
    "name": "House with Land for Sale in Udugampala, Uggalboda Road",
    "price": "Rs. 18.5 Million",
    "description": `
      🏠 Property Features:
      - Land Size: 80 Perches
      - Bedrooms: 3 (with 1 external room)
      - Bathrooms: 1 inside, 1 outside
      - Store Room: 1 external
      - Water Supply: Natural well connected to waterline
  
      🌳 Land Features:
      - More than 25 coconut trees with harvest
  
      📍 Location Highlights:
      - 700 meters to Kehelbaddara Junction (244 bus route: Gampaha/Negombo)
      - 2 km to Udugampala Town
      - 6 km to Gampaha Town
  
      🌿 Additional Benefits:
      - Peaceful and calm area, ideal for living
    `,
    "address": "Udugampala, Uggalboda Road",
    "images": [
      "https://i.imgur.com/7EzlLKl.jpeg",
      "https://i.imgur.com/HqFcfo5.jpeg",
      "https://i.imgur.com/1wov1Ch.jpeg",
      "https://i.imgur.com/XJnLjsg.jpeg",
      "https://i.imgur.com/ELx7dgS.jpeg",
      "https://i.imgur.com/679RP16.jpeg",
      "https://i.imgur.com/Zd4ZnPB.jpeg",
    ],
  },
  
  
  
];

export default mockProperties;
