export const premium3 = ({ img, name, msg, type }) => {
  return `

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Title -->
        <title>Birthday Card</title>
    </head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Satisfy&display=swap');
    @font-face {
      font-family: myFirstFont;
      src: url(Skytree\ one.ttf);
    }
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
      /* card section css start here */
    .card {
      min-width: 90%;
      height: fit-content;
      background-color: #ffffff;
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-shadow: rgba(0, 0, 0, 0.308) 0px 10px 50px;
      padding: 10px 0 30px 0;
      box-sizing: border-box;
    }
     /* celebrant image css start here */
    .card .profile_image {
      width: 60%;
      z-index: 20;
      margin-left: 20%;
      margin-top: 3.2rem;
      border: 10px solid #fff;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
    }
    /* design effact css start here */
    .card .effact {
      width: 80%;
      position: absolute;
      top: -1.2rem;
      left: 0;
      z-index: 30;
    }
       /* hapy text css start here */
    .card .happy_text {
      color: #ccddf1;
      font-size: 1.1rem;
      font-family: "Cinzel", serif;
      letter-spacing: 4px;
      margin-bottom: 1rem;
      z-index: 10;
      text-align: center;
    }
    /* celebrant name css star here */
    .card .name {
      font-family: myFirstFont;
      color: #BE0000;
      font-size: 50px;
    
      margin-top: 3rem;
      text-align: center;
    }
     /* bottom text css start here */
    .bottom_txt {
      font-family: 'Satisfy', cursive;
      color: #888888;
      font-size: 20px;
      text-align: center;
      width: 80%;
      margin: 1rem 0;
    }
    .wisher {
      font-family: 'Bree Serif', serif;
      font-size: 18px;
      color: #BE0000;
    }
    </style>
    <body>
      <div class="container">
        <!-- Card Box HTML start here -->
        <div class="card white">
            <!-- effact image html -->
            <img src="https://wishwisher.com/cardeffects/premium-card3effact.png?cache=false" alt="" class="effact">
            <!-- celebrant image html -->
            <div style="width: 100%;height: fit-content;padding: 0 30px;z-index: 20;">
            <img src="${img}" alt="" class="profile_image">
          </div>
            <!-- celebrant name html -->
            <p class="name nwhite">${name}</p>
            <!-- bottom line html -->
            <p class="bottom_txt bwhite">${msg}</p>
        </div>
      </div>
    </body>
</html>

`
}