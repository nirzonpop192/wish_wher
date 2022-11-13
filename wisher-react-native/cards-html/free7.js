export const free7 = ({ img, name, msg, type }) => {
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
  @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Courgette&display=swap");

  html,
  body {
    height: 100%;
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    align-items: center;
    align-self: center;
    alignment: center;
    align-self: center;
  }


  .body {
    box-sizing: border-box;
    align-items: center;
    align-self: center;
    alignment: center;
    align-self: center;
    /*box-shadow: rgba(0, 0, 0, 0.308) 10px 10px 50px;*/
    background-color: whitesmoke;
    height: 100%;
    width: 100%;
  }

  .container {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  :root {
    --bg-color: #00243E;
    --text-color: #ccddf1;
    --white-color: #ffffff;
    --sectext-color: #554E30;
    --black-color: #010005;
  }

  /* card section css start here */
  .card {
    margin: auto;
    width: 100%;
    height: 27rem;
    background-color: var(--bg-color);
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-self: center;
    align-content: center;
  }

  /* celebrant image css start here */
  .card .profile_image {
    width: 200px;
    height: 200px;
    top: 110px;
    position: absolute;
  }

  /* design effact css start here */
  .card .effact {
    width: 300px;
    width: 300px;
    position: absolute;
    top: 0;
  }

  /* hapy text css start here */
  .card .happy_text {
    color: var(--text-color);
    font-size: 1.1rem;
    font-family: "Cinzel", serif;
    letter-spacing: 4px;
    margin-bottom: 1rem;
    z-index: 10;
    position: absolute;
    top: 44px;
  }

  /* celebrant name css star here */
  .card .name {
    font-family: "Rammetto One", cursive;
    color: var(--text-color);
    text-transform: uppercase;
    margin-top: 0.7rem;
    font-size: 1.8rem;
    z-index: 10;
    bottom: 70px;
    position: absolute;
    font-weight: bold;
    text-align: center;
  }

  /* bottom text css start here */
  .bottom_txt {
    font-family: "Courgette", cursive;
    color: var(--text-color);
    font-size: 1.1rem;
    z-index: 10;
    bottom: 25px;
    position: absolute;
    text-align: center;
    line-height: 1.3rem;
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
  .white .hwhite,
  .white .nwhite,
  .white .bwhite {
    color: var(--sectext-color);
  }

  /* for only black color cards */
  .black .hblack,
  .black .nblack,
  .black .bblack {
    color: var(--text-color);
  }
</style>

<body>
  <!-- Card Box HTML start here -->
  <div class="container">
  <div class="card blue">
  <!-- Happy Birthday text HTM" -->
  <p class="happy_text">${type}</p>
  <!-- celebrant image html -->
  <img src="${img}" alt="" class="profile_image">
  <!-- effact image html -->
  <img src="https://wishwisher.com/cardeffects/card7effact.png" alt="" class="effact">
  <!-- celebrant name html -->
  <p class="name">${name}</p>
  <!-- bottom line html -->
  <p class="bottom_txt">${msg}</p>
</div>
  </div>
</body>

</html>

`}