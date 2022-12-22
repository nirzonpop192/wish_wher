export const premium7 = ({ img, name, msg, type }) => {
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
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Outfit:wght@100;200;300;400;500;600&display=swap');
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
      min-height: 35rem;
      background-color: #ffffff;
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-shadow: rgba(0, 0, 0, 0.308) 0px 10px 50px;
      padding: 10px 0 30px 0;
      box-sizing: border-box;
      background-image: url('https://wishwisher.com/cardeffects/premium-card7effact.png?cache=false');
      background-size: 100% 100%;
    }
     /* celebrant image css start here */
    .card .profile_image {
      width: 54%;
      aspect-ratio: 1/1;
      z-index: 50;
      margin-left: 23.1%;
      position: absolute;
      top: 21.5%;
      clip-path: polygon(14% 13%, 65% 2%, 100% 40%, 85% 90%, 36% 100%, 0 61%);
      transform: rotate(-1deg);
    }
    /* design effact css start here */
    .card .effact {
      width: 60%;
      margin-left: 20%;
      position: absolute;
      top: 20%;
      left: 0;
      z-index: 10;
    }
    /* seceffact */
    .seceffact {
      width: 30%;
      position: absolute;
      top: 38%;
      left: 52%;
      z-index: 500;
    
    }
       /* hapy text css start here */
    .card .happy_text {
      color: #76593A;
      font-size: 1.5rem;
      font-family: 'Nanum Myeongjo', serif;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 1rem;
      z-index: 10;
      text-align: center;
      position: absolute;
      bottom: 30%;
    }
    .celebrantname {
      color: #76593A;
      font-size: 1.1rem;
      font-family: 'Nanum Myeongjo', serif;
      font-weight: 700;
      text-transform: capitalize;
      letter-spacing: 0.5px;
      margin-bottom: 1rem;
      z-index: 10;
      text-align: center;
      position: absolute;
      bottom: 25%;
    }
     /* bottom text css start here */
    .bottom_txt {
      font-family: 'Outfit', sans-serif;
      color: #9e774e;
      font-size: 13px;
      text-align: center;
      width: 60%;
      margin: 1rem 0;
      position: absolute;
      bottom: 10%;
    }
    .wisher {
      font-family: 'Outfit', sans-serif;
      font-size: 15px;
      color: #76593A;
      position: absolute;
      bottom: 5%;
      font-weight: 500;
    }
    .wlast {
      bottom: 1.2%;
    }
    </style>
    <body>
      <div class="container">
        <!-- Card Box HTML start here -->
        <div class="card white">
            <!-- effact image html -->
            <img src="https://wishwisher.com/cardeffects/premium-card7thirdeffact.png?cache=false" alt="" class="effact">
            <!-- seceffact image html -->
             <img src="https://wishwisher.com/cardeffects/premium-card7seceffact.png?cache=false" alt="" class="seceffact">
            <!-- celebrant image html -->
            <div style="width: 100%;height: fit-content;padding: 0 30px;z-index: 20;">
                <img src="${img}" alt="" class="profile_image">
            </div>  
            <!-- happy_text html -->
            <p class="happy_text">${type}</p>
            <!-- celebrant name html -->
            <p class="celebrantname">${name}</p>
            <!-- bottom line html -->
            <p class="bottom_txt">${msg}</p>
        </div>
      </div>
    </body>
    </html>

`
}