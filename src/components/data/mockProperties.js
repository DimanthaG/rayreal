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
      "https://i.imgur.com/x9WOOUi.jpeg"
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
    description: `
      20 perch land with a two-storied house (2900 sq.ft) for sale at Mirihana, Nugegoda. 
      - 04 bedrooms, 02 bathrooms, servant room & an extra bathroom
      - Parking for 03 vehicles, two mango trees & a coconut tree
      - 50 meters to Jubilee Post, near Naga Viharaya & St. Thomas’ Church.
    `,
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
      "https://i.imgur.com/xxCfcsY.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    // (Removed the first duplicate "15" — the "5.5 Acres Land in Paiyagala" — so that the final count is 35)
    id: "3",
    name: "5.5 Perches Land in Gonapola",
    price: "LKR. 34 Laks",
    description: `
      A compact and affordable property in Gonapola, Olaboduwa:
      - 5.5 perches of land with 8 ft road access
      - Includes 1 room, kitchen, living room, and bathroom
      - Ideal for small families or as a budget-friendly investment.
    `,
    address: "Gonapola, Olaboduwa",
    images: [
      "https://imgur.com/dMXFzup.jpeg",
      "https://imgur.com/nl9KDku.jpeg",
      "https://imgur.com/NhtbZo8.jpeg",
      "https://imgur.com/RAmhWEz.jpeg",
      "https://imgur.com/vCxaoaP.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "4",
    name: "Valuable Land in Borelesgamuwa",
    price: "LKR. 2.5 Million per Perch",
    description: `
      14 perches of valuable land in Borelesgamuwa with great connectivity:
      - Square land block with a parapet wall
      - 03-room old house with water and electricity
      - Located 150m from Colombo-Horana main road
      - Close to Borelesgamuwa junction and Dehiwala-Maharagama Road
      - Clear titles and single ownership.
    `,
    address: "Pirivena Road, Borelesgamuwa",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "5",
    name: "Land for Sale in Maligathenna",
    price: "LKR 450,000 per Perch (Negotiable)",
    description: `
      17 perches of land available for sale in Maligathenna:
      - Located in Gurudeniya East with approximate location shown.
      - Ideal for residential purposes or investment.
      - Price per perch is negotiable.
    `,
    address: "Gurudeniya East",
    images: [
      "https://i.imgur.com/BywsSeQ.jpeg",
      "https://i.imgur.com/1N4K7XP.jpeg",
      "https://i.imgur.com/jR4xxck.jpeg",
      "https://i.imgur.com/OtHuivd.jpeg",
      "https://i.imgur.com/iMCGvEC.jpeg",
      "https://i.imgur.com/wQcemO6.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "6",
    name: "Land for Sale in Battaramulla",
    price: "LKR 5.5 Million per Perch",
    description: `
      11.70 Perches, prime land available for sale in Battaramulla:
      - Suitable for residential purposes.
      - Located in a peaceful and convenient area.
      - Price per perch: LKR 5.9 Million.
    `,
    address: "Battaramulla",
    images: [
      "https://imgur.com/ry5Jktz.jpeg",
      "https://imgur.com/MLv37wV.jpeg",
      "https://imgur.com/pmmw8kS.jpeg",
      "https://imgur.com/7JvME29.jpeg",
      "https://imgur.com/agQVZbU.jpeg",
      "https://imgur.com/kRZfndr.jpeg",
      "https://imgur.com/zKRl5o1.jpeg",
      "https://i.imgur.com/rDdnOne.mp4"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "7",
    name: "Jaffna Land",
    price: "1.5 million p.p.",
    description: `
      Total extent: 284.142 perches
      - Prime land in Jaffna, ideal for investment or development
      - Spacious area with easy access to nearby amenities
    `,
    address: "Jaffna",
    images: [
      "https://i.imgur.com/l9XyoGE.jpeg",
      "https://i.imgur.com/P3kIQPQ.jpeg",
      "https://i.imgur.com/9hvyzKA.jpeg",
      "https://i.imgur.com/DPw64jb.jpeg",
      "https://i.imgur.com/bRVmqoR.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "8",
    name: "Luxury Villa in Thalawathugoda",
    price: "Rs. 150 Million",
    description: `
      A stunning luxury villa located in the serene surroundings of Thalawathugoda, Wikramasinghapura. This property includes:
      - 24 perches of land
      - Beautiful modern architecture with premium finishing
      - Spacious living and dining areas
      - Luxurious bedrooms with en-suite bathrooms
      - A private swimming pool
      - Landscaped garden areas
    `,
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
      "https://i.imgur.com/CWC1qNM.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "9",
    name: "House and Land for Sale near Homagama",
    price: "Contact for Price",
    description: `
      Located in a peaceful and well-developed area near Homagama, this 23-perch property with a fully completed house is available for immediate sale.
      
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
    address: "Pitipana Junction, Homagama",
    images: [
      "https://i.imgur.com/8IvGTmg.jpeg",
      "https://i.imgur.com/2zE900i.jpeg",
      "https://i.imgur.com/zuCst6K.jpeg",
      "https://i.imgur.com/edVB62U.jpeg",
      "https://i.imgur.com/fQ09Cfg.jpeg",
      "https://i.imgur.com/s8E7R6n.jpeg",
      "https://i.imgur.com/HcHFEe8.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "10",
    name: "Two-Story House and 10 Perches of Land for Sale in Panadura, Keselwatta",
    price: "Market Value: Rs. 25.5 Million | Special Price: Rs. 18 Million",
    description: `
      🔰 Prime Location Highlights:
      - Just 600m to the main bus route
      - Only 1km to Galle Road
  
      🏡 Property Details:
      - Bedrooms:
          • Ground Floor: 2
          • Upper Floor: 2
      - Living Rooms:
          • Ground Floor: 1
          • Upper Floor: 1
      - Verandas:
          • Ground Floor: 1
          • Upper Floor: 1
      - Bathrooms:
          • Ground Floor: 1
          • Upper Floor: 1
      - Dining Room & Kitchen
  
      🌳 Land Features:
      - House built on 6 perches, with 4 perches of landscaped garden space
      - Garden includes 5 coconut trees plus mango, jambo, guava, ambarella, and banana plants
  
      ✨ Additional Benefits:
      - Ground floor fully tiled and secure with a boundary wall
  
      💎 Invest Smart – A Rare Opportunity!
    `,
    address: "Panadura, Keselwatta",
    images: [
      "https://i.imgur.com/2yVEQmL.jpeg",
      "https://i.imgur.com/rz7zLDI.jpeg",
      "https://i.imgur.com/YUSQxNx.jpeg",
      "https://i.imgur.com/wHEtKnQ.jpeg",
      "https://imgur.com/gZhsvON.jpeg",
      "https://imgur.com/kCwwMKW.jpeg",
      "https://imgur.com/T7dldid.jpeg",
      "https://imgur.com/RpcZdcV.jpeg",
      "https://imgur.com/4X0bLsJ.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "11",
    name: "House with Land for Sale in Udugampala, Uggalboda Road",
    price: "Rs. 18.5 Million",
    description: `
      🏠 Property Features:
      - Land Size: 80 Perches
      - 3 Bedrooms (1 with an external room)
      - 2 Bathrooms (1 inside, 1 outside) and 1 external store room
      - Natural water supply via a well connected to the waterline
      
      🌳 Land Features:
      - Over 25 coconut trees available for harvest
      
      📍 Location Highlights:
      - 700 meters to Kehelbaddara Junction (244 bus route: Gampaha/Negombo)
      - 2 km to Udugampala Town and 6 km to Gampaha Town
      
      🌿 Ideal for a peaceful living environment.
    `,
    address: "Udugampala, Uggalboda Road",
    images: [
      "https://i.imgur.com/7EzlLKl.jpeg",
      "https://i.imgur.com/HqFcfo5.jpeg",
      "https://i.imgur.com/1wov1Ch.jpeg",
      "https://i.imgur.com/XJnLjsg.jpeg",
      "https://i.imgur.com/ELx7dgS.jpeg",
      "https://i.imgur.com/679RP16.jpeg",
      "https://i.imgur.com/Zd4ZnPB.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "12",
    name: "Two-Story House on 27 Perch Land in Gampola, Singha Pitiya",
    price: "LKR 24.5 Million",
    description: `
      🏠 House Features:
      - Ground Floor: 2 Bedrooms, 2 Bathrooms, Garage, Kitchen
      - Upper Floor: 4 Bedrooms, Living Room, Kitchen, 1 Bathroom
      
      🌳 Land Details:
      - Total Land Size: 27 Perches
      
      📍 Located in Gampola, Singha Pitiya.
    `,
    address: "Gampola, Singha Pitiya",
    images: [
      "https://i.imgur.com/eLJ6M38.jpeg",
      "https://i.imgur.com/t73KeJL.jpeg",
      "https://i.imgur.com/09KyxOm.jpeg",
      "https://i.imgur.com/zxkKb6H.jpeg",
      "https://i.imgur.com/0GTlSr2.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "13",
    name: "Extremely Valuable Property in Maharagama",
    price: "Rs. 1.4M per perch (Negotiable)",
    description: `
      🏡 Property Features:
      - Total Land Size: 108.8 Perches with 20ft carpeted road access
      - Water and Electricity available; single owner with clear titles
      
      🌍 Location Highlights:
      - 2.2 km to Maharagama Town and 1.7 km to RMV (Department of Motor Traffic)
      - Suitable for housing projects or apartments
      
      ⚠️ Note: Includes 3 houses (sale based on land value only)
    `,
    address: "Maharagama, Sri Lanka",
    images: [
      "https://i.imgur.com/2LR924Y.jpeg",
      "https://i.imgur.com/Onjm9KN.jpeg",
      "https://i.imgur.com/vBbEDXF.jpeg",
      "https://i.imgur.com/VOt7l2r.jpeg",
      "https://i.imgur.com/R6tWLN3.jpeg",
      "https://i.imgur.com/ziD1qZI.jpeg"
    ],
    contact: { phone: "Owner 0714727527", email: "" }
  },
  {
    id: "14",
    name: "Land for Sale near Kottawa Highway Entrance",
    price: "LKR 2.2 Million per perch (Negotiable)",
    description: `
      This land offers two purchasing options: 7.5 perches or 12.5 perches.
      - Benefits from a 30ft wide access road on Kulathunga Mawatha and a 15ft common road frontage.
      - Located 400 meters from High-Level Road, near the Makumbura Multimodal Center and highway entrance.
      - Clear deeds; municipal council approved for the 7.5-perch plot (bank-loan eligible).
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
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "15",
    name: "131-Perch Land with House for Sale in Embilipitiya",
    price: "LKR 15.5 Million (Negotiable)",
    description: `
      A 131-perch plot with a house is available 4 km from Embilipitiya town (on the Embilipitiya-Nonagama main road, in front of Chandrikawawa Sarovaya). Within municipal limits, schools and hospitals are accessible within 10 minutes.
      
      The house includes:
      - 5 rooms, a kitchen, a living room, and a fully tiled bathroom.
      - Valued at LKR 6,000,000.
      
      Price per perch: LKR 75,000  
      Total value: LKR 15,500,000.
    `,
    address: "Chandrikawawa Sarovaya, 4 km from Embilipitiya Town, Embilipitiya-Nonagama Main Road",
    images: [
      "https://i.imgur.com/P8Hab49.jpeg",
      "https://i.imgur.com/YyyV0Sv.jpeg",
      "https://i.imgur.com/3b2gVhA.jpeg"
    ],
    contact: { phone: "Contact for Details", email: "Contact for Details" }
  },
  {
    id: "16",
    name: "120 Perches of Business Property Land in Kalagedihena",
    price: "Rs. 300 Million (Negotiable)",
    description: `
      120 Perches of business property land in Kalagedihena, Thihariya, facing the Colombo-Kandy Main Road.
      Fully equipped with water, electricity, and clear deeds—ideal for commercial development.
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
    contact: { phone: "0714727527", email: "Contact for Details" }
  },
  {
    id: "17",
    name: "3-Acre Paddy Land on Kekirawa-Thalawa Road",
    price: "Rs. 90 Million",
    description: `
      3-Acre Paddy Land on Kekirawa-Thalawa Road.
      - Ideal for agriculture; currently under cultivation.
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
      "https://i.imgur.com/Kf7bGAl.jpeg"
    ],
    contact: { phone: "Contact for Details", email: "Contact for Details" }
  },
  {
    id: "18",
    name: "80-Perch Coconut Land on Thalawa Road, Kurunegala",
    price: "Rs. 16.5 Million (Negotiable)",
    description: `
      80-Perch Coconut Land on Thalawa Road, Kurunegala, facing the main road.
      - Includes a small two-room bungalow.
      - Offers income potential from coconut plantations and room for other crops.
    `,
    address: "Thalawa Road, Kurunegala",
    images: [
      "https://i.imgur.com/bb7D6Tq.jpeg",
      "https://i.imgur.com/CPINKg5.jpeg",
      "https://i.imgur.com/4Pjf2UB.jpeg",
      "https://i.imgur.com/AvuD5mQ.jpeg",
      "https://i.imgur.com/DAbHR6m.jpeg",
      "https://i.imgur.com/3NTrEES.jpeg"
    ],
    contact: { phone: "Contact for Details", email: "Contact for Details" }
  },
  {
    id: "19",
    name: "Two-Story Separate House for Sale in Boralesgamuwa",
    price: "Contact for Details",
    description: `
      🏠 House Features:
      - Ground Floor: 2 Rooms, Living Room, Kitchen, Bathroom, and Toilet (unfinished tiles)
      - Second Floor: 2 Rooms, Living Room, Kitchen, Bathroom, Toilet, and Balcony (fully tiled)
      - Parking for 2 vehicles; located on Liyanage Mawatha (12ft road access) with additional access via a 20ft Piriwena Road.
      
      🚌 Nearby:
      - 60–70 meters to the main road/bus stop
      - Several amenities within 2–8 minutes (e.g. petrol station, banks, supermarket, university, hospital)
    `,
    address: "Liyanage Mawatha, Boralesgamuwa",
    images: [
      "https://i.imgur.com/1vw3UQL.jpeg",
      "https://i.imgur.com/NL2vtOn.jpeg",
      "https://i.imgur.com/RQFSUA3.jpeg",
      "https://i.imgur.com/ZCHBU28.jpeg",
      "https://i.imgur.com/K8g3Ius.jpeg"
    ],
    contact: { phone: "Contact for Details", email: "Contact for Details" }
  },
  {
    id: "20",
    name: "Valuable Land in Polgasowita",
    price: "LKR 400,000 per perch (Negotiable)",
    description: `
      This 80-perch land in Polgasowita features 60-75 coconut trees and a small house.
      Ideal for investment, as the owner is migrating—an opportunity for residential or agricultural use.
    `,
    address: "Polgasowita, Sri Lanka",
    images: [
      "https://i.imgur.com/KzbwvLq.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "21",
    name: "Prime Land for Sale in Boralasgamuwa",
    price: "LKR 35,000,000",
    description: `
      A highly valuable 14-perch land in Boralasgamuwa, fully enclosed by a boundary wall.
      Includes an old 3-room house with electricity and water.
      Price per perch: LKR 2,500,000; Total Perches: 14.
      Proximity: 150m to Colombo-Horana Road, 200m to Dehiwala-Maharagama Road, 1km to Boralasgamuwa Junction, etc.
      Nearby: Walking path for leisure.
    `,
    address: "Facing Pirivena Road, Boralasgamuwa, Sri Lanka",
    images: [
      "https://i.imgur.com/dPYdSPz.jpeg",
      "https://i.imgur.com/qvRLdU8.jpeg",
      "https://i.imgur.com/whc4Vng.jpeg",
      "https://i.imgur.com/FJg5u3y.jpeg",
      "https://i.imgur.com/v68pNNn.jpeg",
      "https://i.imgur.com/adsUmH5.jpeg"
    ],
    contact: { phone: "0771282920", email: "propertyowner@example.com" }
  },
  {
    id: "22",
    name: "Prime Land for Sale in Mirissa Tourist Hub",
    price: "Rs. 250,000 per Perch",
    description: `
      Size: 80 Perches.
      Features: Scenic environment overlooking a beautiful paddy field, clear deed, 2 km to Mirissa Tourist Zone, 3 km to Galle Road, and 800 meters to Mirissa Railway Station.
      Ideal for tourism and hospitality ventures.
    `,
    address: "Mirissa",
    images: [
      "https://i.imgur.com/4Wre1Qe.jpeg",
      "https://i.imgur.com/mnEeowp.jpeg",
      "https://i.imgur.com/ilDtTbb.jpeg",
      "https://i.imgur.com/2SHyWiS.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "23",
    name: "Luxury 3-Story House for Sale in Battaramulla",
    price: "LKR 95 Million (Negotiable)",
    description: `
      Size: 3,400 sq. ft.
      Features: 6 bedrooms, 5 attached bathrooms, private 20ft road, and proximity (1.6km to Koswatta, 1.2km to Thalahena).
      Located in a highly desirable residential area.
    `,
    address: "Battaramulla",
    images: [
      "https://i.imgur.com/eXgAIeU.jpeg",
      "https://i.imgur.com/qzcne20.jpeg",
      "https://i.imgur.com/KxvabMI.jpeg",
      "https://i.imgur.com/pBYPgbO.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "24",
    name: "Exclusive Tourist Hotel for Sale in Embilipitiya",
    price: "Negotiable",
    description: `
      Size: 1 acre and 36 perches.
      Features: Three-story main building with 15 spacious rooms, plus 3 fully built cottages and a modern kitchen.
    `,
    address: "Embilipitiya",
    images: [
      "https://i.imgur.com/v1tHnk1.jpeg",
      "https://i.imgur.com/v3NADeH.jpeg",
      "https://i.imgur.com/6CtxWz4.jpeg",
      "https://i.imgur.com/oyyWztY.jpeg",
      "https://i.imgur.com/Z9VDWl5.jpeg",
      "https://i.imgur.com/7lfjhyJ.jpeg",
      "https://i.imgur.com/99Zf2Tn.jpeg",
      "https://i.imgur.com/O1Y4nBF.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "25",
    name: "Prime Property for Sale in Hikkaduwa",
    price: "LKR 1.6 Million per Perch",
    description: `
      Size: 11.6 Perches.
      Features: Facing the Galle-Colombo main road, directly across from Hikkaduwa Police Station, within a high-demand tourist area,
      and ideal for a hotel, restaurant, or cafe.
    `,
    address: "Hikkaduwa",
    images: [
      "https://i.imgur.com/pGuAA4p.jpeg",
      "https://i.imgur.com/IKWQgvp.jpeg",
      "https://i.imgur.com/LcPWHID.jpeg",
      "https://i.imgur.com/rWZBPG1.jpeg",
      "https://i.imgur.com/EfN0uAw.jpeg",
      "https://i.imgur.com/2Y0MEfb.jpeg",
      "https://i.imgur.com/fgh1pZr.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "26",
    name: "Colonial Type Bungalow for Sale Near Katunayake (Uggalgoda)",
    price: "LKR 23M (Negotiable)",
    description: `
      Size: 59 Perches.
      Features: Three-phase electricity, full security (CCTV), 7ft parapet wall, 4 bedrooms, 3 bathrooms, a large 2-vehicle garage,
      and coconut/fruit crops on site.
    `,
    address: "Katunayake",
    images: [
      "https://i.imgur.com/GJcTqNu.jpeg",
      "https://i.imgur.com/Ykg783J.jpeg",
      "https://i.imgur.com/7wWIt6n.jpeg",
      "https://i.imgur.com/Nl5bwLG.jpeg",
      "https://i.imgur.com/Nl5bwLG.jpeg",
      "https://i.imgur.com/7e0t7uG.jpeg",
      "https://i.imgur.com/nxJ9IBz.jpeg",
      "https://i.imgur.com/n9DTWFz.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "27",
    name: "Prime Property for Sale in Malabe Town Center",
    price: "LKR 120 Million (Negotiable)",
    description: `
      Size: 28 Perches.
      Features: 2-story building (3,000 sq. ft.), parking for 12–15 vehicles, 15ft wide concrete road (40m from Colombo Main Road),
      clear title with bank loan eligibility, and bank valuation of LKR 150 million.
    `,
    address: "Malabe",
    images: [
      "https://i.imgur.com/gwGPNB9.jpeg",
      "https://i.imgur.com/c3OpTDm.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "28",
    name: "120 Perches of Land in Kiridiwela, Colombo",
    price: "LKR 100,000 per Perch",
    description: `
      Size: 120 Perches.
      Features: Located near a main bus route (in front of Mandawala Maha Vidyalaya), adjacent to a palm plantation,
      with water facilities and close to shops, schools, and hospitals.
    `,
    address: "Kiridiwela, Colombo",
    images: [
      "https://i.imgur.com/aKEJWgZ.jpeg",
      "https://i.imgur.com/19qXoHJ.jpeg",
      "https://i.imgur.com/7xQFFAj.jpeg",
      "https://i.imgur.com/moqoDDH.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "29",
    name: "Tourist Attraction Property in Dambulla",
    price: "LKR 24 Million (Negotiable)",
    description: `
      Size: 3 Acres and 28 Perches.
      Features: Located in one of the most visited tourist areas; perfect for investment with high land value appreciation.
    `,
    address: "Dambulla",
    images: [
      "https://i.imgur.com/kUojn65.jpeg",
      "https://i.imgur.com/ctKANV4.mp4",
      "https://i.imgur.com/cmP2cVP.mp4",
      "https://i.imgur.com/VT0wPXu.jpeg"
    ],
    contact: { phone: "0714727527", email: "" }
  },
  {
    id: "30",
    name: "Homagama Kahathuduwa Land",
    price: "LKR 18.5 Million",
    description: `
      Size: 25.6 Perches.
      Features: Spacious plot in a developing area—ideal for residential or investment purposes.
    `,
    address: "Kahathuduwa, Homagama",
    images: [
      "https://i.imgur.com/cq0KM5x.jpeg",
      "https://i.imgur.com/RfDz4mz.jpeg",
      "https://i.imgur.com/2qRgkaM.jpeg",
      "https://i.imgur.com/fARbI2r.jpeg",
      "https://i.imgur.com/oDIGZXb.jpeg",
      "https://i.imgur.com/YVhqKil.jpeg",
      "https://i.imgur.com/E0dgZCQ.jpeg",
      "https://i.imgur.com/Bps1b9e.jpeg",
      "https://i.imgur.com/DM9Er2l.jpeg",
      "https://i.imgur.com/CLbmszy.jpeg"
    ],
    contact: { phone: "+94 71 472 7527", email: "" }
  },
  {
    id: "31",
    name: "Valuable Land for Sale in Malabe",
    price: "LKR 1.65 Million per perch (Negotiable)",
    description: `
      Size: 40 Perches.
      Features: 500 meters to Malabe Town and major bus routes; located in a highly residential area with rapid development.
    `,
    address: "Susilarama Road, Malabe",
    images: [
      "https://i.imgur.com/RtORWBO.jpeg",
      "https://i.imgur.com/uHQTS5X.jpeg",
      "https://i.imgur.com/y7tNmEL.jpeg",
      "https://i.imgur.com/GA2rgcL.jpeg",
      "https://i.imgur.com/ayNjqrD.jpeg"
    ],
    contact: { phone: "+94 71 472 7527", email: "" }
  },
  {
    id: "32",
    name: "Homagama Town Perch 9.3 Land",
    price: "LKR 6.5 Million",
    description: `
      Size: 9.3 Perches.
      Features: Flat land near paddy fields, with proximity to major roads, railway station, and key banks/shops.
    `,
    address: "Homagama",
    images: [
      "https://i.imgur.com/4lHGmIL.jpeg",
      "https://i.imgur.com/ukUZal6.jpeg",
      "https://i.imgur.com/9WZieic.jpeg",
      "https://i.imgur.com/xq21XTm.jpeg",
      "https://i.imgur.com/wItc0cY.jpeg"
    ],
    contact: { phone: "+94 71 472 7527", email: "" }
  },
  {
    id: "33",
    name: "Nittambuwa Ranpokunugama Two-Story House with Land",
    price: "LKR 33 Million",
    description: `
      Size: Spacious Residential Property.
      Features: 4 bedrooms, living/dining/kitchen areas, 2 bathrooms, store room, secure boundary wall, and proximity to main roads and town.
    `,
    address: "Nittambuwa, Ranpokunugama",
    images: [
      "https://i.imgur.com/LodD9tU.jpeg",
      "https://i.imgur.com/9FgK8Pr.jpeg",
      "https://i.imgur.com/qUFCvbf.jpeg",
      "https://i.imgur.com/s913ACO.jpeg",
      "https://i.imgur.com/2JbCK7L.jpeg",
      "https://i.imgur.com/fTbXDgN.jpeg"
    ],
    contact: { phone: "+94 71 472 7527", email: "" }
  },
  {
    id: "34",
    name: "Hokandara Horahena Residential Land",
    price: "LKR 13 Million per perch",
    description: `
      Size: 15.5 Perches.
      Features: Includes a partially built house (with foundation), approved plans provided free, ideal for new home construction,
      and excellent connectivity to Colombo and nearby towns.
    `,
    address: "Horahena, Hokandara",
    images: [
      "https://i.imgur.com/ceW2Wzd.jpeg",
      "https://i.imgur.com/0SZUsqy.jpeg",
      "https://i.imgur.com/coFZVIq.jpeg"
    ],
    contact: { phone: "+94 71 472 7527", email: "" }
  },
  {
    id: "35",
    name: "Prime 22-Perch Land for Sale in Kantale – Below Market Price!",
    price: "Market Price: LKR 220,000 per perch; Urgent Sale Price: LKR 130,000 per perch (Negotiable)",
    description: `
      Size: 22 Perches.
      Features: Near a railway station & bus stops; close to hospitals, schools, shopping complexes, restaurants, postal office, Leelarathna Stadium; clear deeds.
    `,
    address: "Kantale",
    images: [
      "https://i.imgur.com/mglzYx5.jpeg",
      "https://i.imgur.com/B3QtAJb.jpeg",
      "https://i.imgur.com/qgLVzWV.jpeg",
      "https://i.imgur.com/gaWt6V1.jpeg",
      "https://i.imgur.com/RJK28hc.jpeg"
    ],
    contact: { phone: "+94 71 472 7527", email: "" }
  },
  {
    id: "36",
    name: "Prime Land for Sale in Rilaulla, Kandana",
    price: "Rs. 950,000 per perch (Negotiable)",
    description: `
Location: No. 119/51, Rilaulla, Kandana
Land Type: Residential & Commercial
Size: 31 Perches

Key Features:
- Prime Location: Just 150m from Colombo-Negombo Road
- High Accessibility: 10 minutes to Colombo-Katunayake Expressway
- Convenience: Only 2 minutes to GLOMARK Shopping Complex and close to schools, banks, hospitals & other essential facilities
- Safe & Serene: Located in a peaceful, friendly neighborhood
- Wide Road Access: 12-ft road frontage
- Clear Deeds: Secure and hassle-free ownership
- Private Sale: Direct from the owner
- Flexible Pricing for serious buyers
    `,
    address: "No. 119/51, Rilaulla, Kandana",
    images: [
      "https://i.imgur.com/LCHpuhX.jpeg" 
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "37",
    name: "Prime Residential Land for Sale in Panadura",
    price: "Contact for Price",
    description: `
An excellent opportunity to own a 72.5-perch fully approved residential land in a highly convenient location.
The property can be purchased as a whole or split into two plots (20.5 perches and 52 perches).

Key Features:
- Fully approved residential land with all necessary permits
- Bordered by a picturesque paddy field at the rear
- Located just 4.5 km from Panadura town
- Only 1.6 km to Bandaragama Road
- 8 km to Gelanigama Highway Entrance (alternative routes available – approx. 6 km)
- 75m walking distance to a main bus route (Panadura – Nivdawa & Panadura – Kiriberiya)
- 100m walking distance to Panadura Pradeshiya Sabha sub-office
    `,
    address: "Panadura",
    images: [
      "https://i.imgur.com/JnJGHoq.jpeg", 
      "https://i.imgur.com/JZtby7G.jpeg", 
      "https://i.imgur.com/2vVTJM5.jpeg", 
      "https://i.imgur.com/jfWbsT1.jpeg", 
      "https://i.imgur.com/fEUEdan.jpeg",
      "https://i.imgur.com/Qrfmni3.jpeg", 
      "https://i.imgur.com/jfWbsT1.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "38",
    name: "Prime Property for Sale in Kandy District",
    price: "LKR 350,000 per perch",
    description: `
This one-acre plot (160 perches), located near Galaha Town, offers an excellent investment opportunity.
Strategically positioned facing the main road, it ensures easy access and visibility.

Key Features:
- Accessible main road, close to Galaha Town
- Fully equipped with water supply and electricity
- Panoramic views of the surrounding landscape for a tranquil setting
- Uncultivated land, perfect for agricultural or tourism development
- Documents available: Deed and land plan (including Pathiru)
- Ideal investment opportunity in the growing tourism or agriculture sector
    `,
    address: "Near Galaha Town, Kandy District",
    images: [
      "https://i.imgur.com/lhxwlQd.jpeg", 
      "https://i.imgur.com/poP2wwL.jpeg", 
      "https://i.imgur.com/h6ybPLz.jpeg",
      "https://i.imgur.com/GkGTxnu.jpeg", 
      "https://i.imgur.com/HDRsYKJ.jpeg",  
      "https://i.imgur.com/nJTxBVb.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "39",
    name: "Prime Residential Land for Sale in Mirigama Kandalama",
    price: "Contact for Price",
    description: `
An exceptional opportunity to own a 60-perch fully approved residential land in a highly sought-after location.
This property offers great potential for both residential and commercial development.

Key Features:
- Land Size: 60 Perches (1,512 square meters)
- Fully approved with all necessary permits for construction
- Dual road access: Surrounded by two roads, including a 30-meter-wide main road
- Only 2 km to the Central Expressway for quick connectivity to major cities
- Fully connected with electricity and water facilities
- Located in a scenic area with beautiful natural views
- Clear deeds ensuring a hassle-free transaction
    `,
    address: "Mirigama Kandalama",
    images: [
      "https://i.imgur.com/oWz13JR.jpeg", 
      "https://i.imgur.com/lNSGbIG.jpeg", 
      "https://i.imgur.com/vkdC8QY.jpeg", 
      "https://i.imgur.com/ZH0MauA.jpeg", 
      "https://i.imgur.com/rPhxk1l.jpeg", 
      "https://i.imgur.com/URpd29e.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "40",
    name: "24 Perch Land in Gonawela, Kelaniya",
    price: "28.5 million (Negotiable)",
    description: `
A 24-perch land located in Gonawela, Kelaniya in a highly residential area.

Key Features:
- Close to main roads and supermarkets
- Just 10 minutes to Kelaniya Rajamaha Viharaya and Kelaniya Campus
- Includes a spacious two-story house with potential to add a third story (slab already laid)
- House features 6 rooms, including a servant's toilet
- Ideal for families or investors
    `,
    address: "Gonawela, Kelaniya",
    images: [
      "https://i.imgur.com/hK7XoXB.jpeg", 
      "https://i.imgur.com/9oftQG0.jpeg", 
      "https://i.imgur.com/EwYnwxJ.jpeg", 
      "https://i.imgur.com/QHgcWza.jpeg",
      "https://i.imgur.com/1O2NzO2.jpeg",
      "https://i.imgur.com/TlIRo1j.jpeg",
      "https://i.imgur.com/0xfjTke.jpeg",
      "https://i.imgur.com/bD5kcdG.jpeg",
      "https://i.imgur.com/bIQU6pH.jpeg",
      "https://i.imgur.com/N3OiHJF.jpeg",
      "https://i.imgur.com/uJdMGih.jpeg",
      "https://i.imgur.com/zqBGNwU.jpeg"
    ],
    contact: { phone: "", email: "" }
  },
  {
    id: "41",
    name: "Property for Sale in Panadura Keselwatta",
    price: "LKR 9.8 million",
    description: `
This property in Panadura Keselwatta sits on a 9.30-perch land.

Key Features:
- House with slab construction and a tiled living room
- 3 Bedrooms, 1 Bathroom, and a dining room
- Water and electricity facilities in place
- Includes 2 coconut trees, 2 jackfruit trees, and 1 mango tree
- Approximately 5 km from Panadura town
For more details, visit: www.rayrealtysl.com
    `,
    address: "Panadura Keselwatta",
    images: [
      "https://i.imgur.com/vT0bk24.jpeg", 
      "https://i.imgur.com/zxsIS17.jpeg", 
      "https://i.imgur.com/iirR9In.jpeg", 
      "https://i.imgur.com/H6MVq5f.jpeg"
    ],
    contact: { phone: "+94 71 472 7527", email: "" }
  },
  {
    id: "42",
    name: "Raytronics Group Sri Lanka©",
    price: "LKR 2,500,000.00 per perch (Negotiable)",
    description: `
Location: maharagama (Yahampath Mawatha), Colombo

Key Details:
- Distance to nearest town: 750m
- Land extent: 10.10 perches
    `,
    address: "maharagama (Yahampath Mawatha), Colombo",
    images: [
      "https://i.imgur.com/hDeMGSQ.jpeg", 
      "https://i.imgur.com/jSS5Tez.jpeg", 
      "https://i.imgur.com/AvdOlFb.jpeg", 
      "https://i.imgur.com/6TZRTjS.jpeg"
    ],
    contact: { phone: "", email: "" }
  }
];

export default mockProperties;
