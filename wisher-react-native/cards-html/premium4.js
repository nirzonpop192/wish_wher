export const premium4 = ({ img, name, msg, type }) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS File link -->
    <link rel="stylesheet" href="style.css">
    <!-- Title -->
    <title>Birthday Card</title>
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Courgette&display=swap");
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    :root {
      --bg-color:#00243E;
      --text-color:#ff7200;
      --bottom-text-color:#ff7200;
      --white-color:#ffffff;
      --sectext-color:#554E30;
      --black-color: #010005;
    }
      /* card section css start here */
    .card {
      width: 26.5rem;
      height: 33.3rem;
      background-color: var(--bg-color);
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-shadow: rgba(0, 0, 0, 0.308) 0px 10px 50px;
    }
     /* celebrant image css start here */
    .card .profile_image {
      width: 55%;
      height: 50%;
      margin-bottom: -20px;
    }
    /* design effact css start here */
    .card .effact {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: -20px;
    }
       /* hapy text css start here */
    .card .happy_text {
      color: var(--text-color);
      font-size: 1.8rem;
      font-weight: bold;
      font-family: "Cinzel", serif;
      letter-spacing: 3px;
      text-align: center;
      width: 90%;
      left: 0;
      top: 20px;;
      z-index: 10;
      position: absolute;
    }
    /* celebrant name css star here */
    .card .name {
      font-family: "Courgette", cursive;
      color: var(--text-color);
      font-size: 1.3rem;
      text-transform: uppercase;
      width: 90%;
      text-align: center;
      top: 70px;
      left: 0;
      z-index: 10;
      position: absolute;
    }
     /* bottom text css start here */
    .bottom_txt {
      font-family: "Rammetto One", cursive;
      color: var(--bottom-text-color);
      font-size: 0.65rem;
      text-align: center;
      width: 90%;
      top: 465px;
      left: 0;
      z-index: 10;
      position: absolute;
    }
     /* for only white color card */
    .white {
      background-color: var(--white-color);
    }
     /* for only black color cards */
    .black {
      background-color: var(--black-color);
    }
     /* for only white color card */
    .white .hwhite, .white .nwhite, .white .bwhite {
      color: var(--sectext-color);
    }
     /* for only black color cards */
    .black .hblack, .black .nblack, .black .bblack {
      color: var(--text-color);
    }
    </style>
</head>

<body>
    <!-- Card Box HTML start here -->
    <div class="card blue">
        <!-- Happy Birthday text HTM" -->
        <p class="happy_text">${type}</p>
        <!-- celebrant image html -->
        <img src="${img}" alt="" class="profile_image">
        <!-- effact image html -->
        <img src="https://wishwisher.com/cardeffects/premium-card4effact.png?cache=false" alt="" class="effact">
        <!-- celebrant name html -->
        <p class="name">${name}</p>
        <!-- bottom line html -->
        <p class="bottom_txt">${msg}</p>
    </div>
</body>

</html>

`
}