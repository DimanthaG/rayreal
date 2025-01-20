const mockProperties = [
  {
    id: "1",
    name: "Kickstart 2025 with Prime Real Estate Opportunities",
    price: "Contact for Details",
    description: `
      🌟 Welcome to 2025! 🌟
      Start the year fresh with exciting new opportunities in the real estate market. 🏡✨
  
      📢 Now Available for Sale:
      Discover our latest inventory of stunning properties perfect for your next move or investment. Whether you're seeking a cozy home, a luxurious retreat, or a prime investment opportunity, we have something tailored for you.
  
      📍 Why Choose Us?
      ✅ Expert market insights
      ✅ Personalized service
      ✅ Unmatched dedication to finding your perfect fit
  
      Don’t wait—contact us today to schedule a viewing or discuss your real estate goals for 2025!
    `,
    address: "Contact for Details",
    images: [
      "https://i.imgur.com/Wb3PzHx.jpeg",
      "https://i.imgur.com/Y8wlE9w.jpeg",
      "https://i.imgur.com/wN73OvU.jpeg",
      "https://i.imgur.com/EoOK8hd.jpeg",
      "https://i.imgur.com/UYYxaB4.jpeg",
      "https://i.imgur.com/x9WOOUi.jpeg",

    ],
    contact: {
      phone: "416-895-1010",
      email: "homes4jeeva@gmail.com"
    }
  },
  
  {
    id: "2",
    name: "20 Perch Land with Two-Storied House",
    price: "Rs. 120 Million (Negotiable)",
    description: `20 perch land with a two-storied house (2900 sq.ft) for sale at Mirihana, Nugegoda. 
      - 04 bedrooms, 02 bathrooms, servant room & a bathroom
      - Parking for 03 vehicles, two mango trees & a coconut tree
      - 50 meters to Jubilee Post, near Naga Viharaya & St. Thomas’ Church.`,
    address: "Mirihana, Nugegoda",
    images: [
      "https://i.imgur.com/YRLsNJq.jpeg",
      "https://i.imgur.com/hL3Yli9.jpeg",
      "https://i.imgur.com/FakKQEx.jpeg",
      "https://i.imgur.com/YqbVYQh.jpeg",
      "https://i.imgur.com/Nhc31Md.jpeg",
      "https://i.imgur.com/ppCqy4O.jpeg",
      "https://i.imgur.com/aJF6dUJ.jpeg",
      "https://i.imgur.com/qsonuca.jpeg",
      "https://i.imgur.com/I22nD5W.jpeg",
      "https://i.imgur.com/uJDwHlK.jpeg",
      "https://i.imgur.com/y02Vqps.jpeg",
      "https://i.imgur.com/c9yn7PE.jpeg",
      "https://i.imgur.com/TPm8ip3.jpeg",
      "https://i.imgur.com/xxCfcsY.jpeg",

    ],
  },
  {
    id: "15",
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
  {
    "id": "12",
    "name": "Two-Story House on 27 Perch Land in Gampola, Singha Pitiya",
    "price": "LKR 24.5 Million",
    "description": `
      🏠 House Features:
      Ground Floor:
      - 2 Bedrooms
      - 2 Bathrooms
      - Garage
      - Kitchen
  
      Upper Floor:
      - 4 Bedrooms
      - Living Room
      - Kitchen
      - 1 Bathroom
  
      🌳 Land Details:
      - Total Land Size: 27 Perches
  
      📍 Location Highlights:
      - Located in Gampola, Singha Pitiya
    `,
    "address": "Gampola, Singha Pitiya",
    "images": [
      "https://i.imgur.com/eLJ6M38.jpeg",
      "https://i.imgur.com/t73KeJL.jpeg",
      "https://i.imgur.com/09KyxOm.jpeg",
      "https://i.imgur.com/zxkKb6H.jpeg",
      "https://i.imgur.com/0GTlSr2.jpeg"
    ],
    "contact": "0714727527"
  },
  {
    "id": "13",
    "name": "Extremely Valuable Property in Maharagama",
    "price": "Rs. 1.4M per perch (Negotiable)",
    "description": `
      🏡 Property Features:
      - Total Land Size: 108.8 Perches
      - 20ft Carpeted Road Access
      - Water and Electricity Available
      - Single Owner with Clear Titles
  
      🌍 Location Highlights:
      - 2.2 Km to Maharagama Town
      - 1.7 Km to RMV (Department of Motor Traffic)
      - Suitable for Housing Projects or Apartments
  
      ⚠️ Additional Notes:
      - Includes 3 houses, but sale is based on land value only
    `,
    "address": "Maharagama, Sri Lanka",
    "images": [
      "https://i.imgur.com/2LR924Y.jpeg",
      "https://i.imgur.com/Onjm9KN.jpeg",
      "https://i.imgur.com/vBbEDXF.jpeg",
      "https://i.imgur.com/VOt7l2r.jpeg",
      "https://i.imgur.com/R6tWLN3.jpeg",
      "https://i.imgur.com/ziD1qZI.jpeg"

    ],
    "contact": "Owner 0714727527"
  },
  {
    id: "14",
    name: "Land for Sale near Kottawa Highway Entrance",
    price: "LKR 2.2 Million per perch (Negotiable)",
    description: `
      This land offers two purchasing options: 7.5 perches or 12.5 perches.
      - The property benefits from a 30-feet wide access road on Kulathunga Mawatha and a 15 feet frontage on the common road.
      - Situated just 400 meters from High-Level Road, the Makumbura Multimodal Center, and the highway entrance, providing convenient access to bus routes 138, 125, 122, and highway buses to Kadawatha, Kaduwela, Kandy, Galle, and more.
      - Clear deeds, municipal council approved for the 7.5-perch plot, making it bank-loan eligible.
    `,
    address: "Kulathunga Mawatha, near Kottawa Highway Entrance",
    images: [
      "https://i.imgur.com/z76ynYr.jpeg",
      "https://i.imgur.com/mbCJwcb.jpeg",
      "https://i.imgur.com/hrld0Xo.jpeg",
      "https://i.imgur.com/114RiFT.jpeg",
      "https://i.imgur.com/FvoqvKi.jpeg",
      "https://i.imgur.com/wEOV1Wf.jpeg",
      "https://i.imgur.com/qJU7ijL.jpeg"

    ],
    contact: "0714727527"
  },
  {
    id: "13",
    name: "131-Perch Land with House for Sale in Embilipitiya",
    price: "LKR 15.5 Million (Negotiable)",
    description: `
      A 131-perch plot of land with a house is for sale, located 4 km from the Embilipitiya town on the Embilipitiya-Nonagama main road, in front of Chandrikawawa Sarovaya. This property is situated within the Embilipitiya municipal limits, and the Embilipitiya main schools and hospitals can be reached within 10 minutes.
  
      The house includes:
      - 5 rooms
      - A kitchen
      - A living room
      - A bathroom with full tiling and all other facilities.
  
      Value of the house:
      - LKR 6,000,000
  
      Price per perch:
      - LKR 75,000
  
      Total value for the house and entire land:
      - LKR 15,500,000
    `,
    address: "Chandrikawawa Sarovaya, 4 km from Embilipitiya Town, Embilipitiya-Nonagama Main Road",
    images: [
      "https://i.imgur.com/P8Hab49.jpeg",
      "https://i.imgur.com/YyyV0Sv.jpeg",
      "https://i.imgur.com/3b2gVhA.jpeg"
    ],
    contact: {
      phone: "Contact for Details",
      email: "Contact for Details"
    }
  },
  {
    id: "14",
    name: "120 Perches of Business Property Land in Kalagedihena",
    price: "Rs. 300 Million (Negotiable)",
    description: `
      120 Perches of Valuable business property land located in Kalagedihena, Thihariya, facing the Colombo-Kandy Main Road. 
      Fully equipped with all facilities, this property is highly suitable for business purposes.
  
      Key Features:
      - Clear deeds
      - Water and electricity facilities
      - 120 perches of land
    `,
    address: "Kalagedihena, Thihariya, Facing Colombo-Kandy Main Road",
    images: [
      "https://i.imgur.com/78lSkJV.jpeg",
      "https://i.imgur.com/koX6MZn.jpeg",
      "https://i.imgur.com/ma6CTz1.jpeg",
      "https://i.imgur.com/x1NPJeI.jpeg",
      "https://i.imgur.com/Ty9BUuZ.jpeg",
      "https://i.imgur.com/6NrwiSz.jpeg",
      "https://i.imgur.com/Nuv86Kw.jpeg",
      "https://i.imgur.com/jcPxbXy.jpeg",
      "https://i.imgur.com/62d039j.jpeg"
    ],
    contact: {
      phone: "0714727527",
      email: "Contact for Details"
    }
  },
  {
    id: "15",
    name: "3-Acre Paddy Land on Kekirawa-Thalawa Road",
    price: "Rs. 90 Million",
    description: `
      3-Acre Paddy Land located on Kekirawa-Thalawa Road.
      - Ideal for agricultural purposes
      - Currently a harvesting land with ongoing cultivation
    `,
    address: "Kekirawa-Thalawa Road",
    images: [
      "https://i.imgur.com/JyuZjqx.jpeg",
      "https://i.imgur.com/Z6772zp.jpeg",
      "https://i.imgur.com/pseILJu.jpeg",
      "https://i.imgur.com/eLDBcUe.jpeg",
      "https://i.imgur.com/asDAT38.jpeg",
      "https://i.imgur.com/OWYH6H4.jpeg",
      "https://i.imgur.com/tdC3CWL.jpeg",
      "https://i.imgur.com/Kf7bGAl.jpeg",

    ],
    contact: {
      phone: "Contact for Details",
      email: "Contact for Details"
    }
  },
  {
    id: "16",
    name: "80-Perch Coconut Land on Thalawa Road, Kurunegala",
    price: "Rs. 16.5 Million (Negotiable)",
    description: `
      80-Perch Coconut Land located on Thalawa Road, Kurunegala, facing the main road.
      
      Key Features:
      - Includes a two-room small bungalow
      - Provides a good income from coconut plantations
      - Potential for other types of plantations
    `,
    address: "Thalawa Road, Kurunegala",
    images: [
      "https://i.imgur.com/bb7D6Tq.jpeg",
      "https://i.imgur.com/CPINKg5.jpeg",
      "https://i.imgur.com/4Pjf2UB.jpeg",
      "https://i.imgur.com/AvuD5mQ.jpeg",
      "https://i.imgur.com/DAbHR6m.jpeg",
      "https://i.imgur.com/3NTrEES.jpeg",

    ],
    contact: {
      phone: "Contact for Details",
      email: "Contact for Details"
    }
  },
  {
    id: "17",
    name: "Two-Story Separate House for Sale in Boralesgamuwa",
    price: "Contact for Details",
    description: `
      🏠 House Features:
      - **Ground Floor**: 
        - 2 Rooms, Living Room, Kitchen, Bathroom, and Toilet (No tiles)
      - **Second Floor**:
        - 2 Rooms, Living Room, Kitchen, Bathroom, Toilet, and Balcony (Fully tiled)
      - Parking for 2 vehicles
      - Located on Liyanage Mawatha with 12-feet road access (New Haven Residence Luxury Houses)
      - Access via Piriwena Road (20-feet road)
  
      🚌 Location Highlights:
      - 1 Minute (60 meters) to the main road
      - 1 Minute (70 meters) to the nearest bus stop
  
      🏬 Nearby Facilities:
      1. Cargrills Express: 3 Minutes (90 meters)
      2. Petrol Station: 2 Minutes (180 meters)
      3. Sri Jayawardanapura University: 6 Minutes (2.1 km)
      4. Cancer Hospital: 6 Minutes (2.3 km)
      5. Kothalawala Defence Hospital: 8 Minutes (3.0 km)
      6. Police Station: 7 Minutes (550 meters)
      7. People's Bank: 5 Minutes (350 meters)
      8. Hatton National Bank: 4 Minutes (320 meters)
      9. Bank of Ceylon (BOC): 3 Minutes (300 meters)
      10. Commercial Bank: 8 Minutes (650 meters)
      11. Arpico Super Market: 4 Minutes (310 meters)
      12. Laughs Super Market and Gas Station: 6 Minutes (520 meters)
      13. Boralesgamuwa Play Ground: 4 Minutes (1.4 km)
      14. Boralesgamuwa School: 4 Minutes (1.2 km)
  
      🏙️ Proximity to Towns:
      - Dehiwala: 15 Minutes (4.1 km)
      - Wellawatta: 16 Minutes (7.9 km)
      - Nugegoda: 9 Minutes (3.5 km)
      - Kohuwala: 10 Minutes (4.6 km)
      - Maharagama: 6 Minutes (2.4 km)
      - Bambalapitiya: 20 Minutes (9.5 km)
    `,
    address: "Liyanage Mawatha, Boralesgamuwa",
    images: [
      "https://i.imgur.com/1vw3UQL.jpeg",
      "https://i.imgur.com/NL2vtOn.jpeg",
      "https://i.imgur.com/RQFSUA3.jpeg",
      "https://i.imgur.com/ZCHBU28.jpeg",
      "https://i.imgur.com/K8g3Ius.jpeg",
      
    ],
    contact: {
      phone: "Contact for Details",
      email: "Contact for Details"
    }
  }
  
  
  
];

export default mockProperties;
