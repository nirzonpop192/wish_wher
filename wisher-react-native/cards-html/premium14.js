export const premium14 = ({ img, name, msg, type }) => {
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
@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bevan&display=swap');
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
  background-image: url(''https://wishwisher.com/cardeffects/premium-card14seceffact.png'');
  background-size: 100% 100%;
}
 /* celebrant image css start here */
.card .profile_image {
  width:72%;
  aspect-ratio: 1/1.05;
  z-index: 50;
  margin-left: 14%;
  position: absolute;
  top: 0;
  clip-path: polygon(7% 0, 100% 0, 93% 86%, 1% 79%);
}
/* shape_image */
.shape_image {
  width: 80%;
  aspect-ratio: 1/0.85;
  position: absolute;
  top: 0;
  margin-left: 10%;
}
/* secshape_image */
.secshape_image {
  width: 60%;
  position: absolute;
  top: 10%;
  margin-left: 11%;
  z-index: 5000;
}
   /* hapy text css start here */
.card .happy_text {
  color: #f6f1f1;
  font-size: 2rem;
  font-family: 'Bevan', cursive;
  line-height: 2.2rem;
  text-align: center;
  margin-bottom: 0.8rem;
}
.celebrantname {
  color: #bd5c57;
  font-size: 1.3rem;
  font-family: 'Bree Serif', serif;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  z-index: 10;
  text-align: center;
  margin-top: 17rem;
  margin-bottom: 0.6rem;
}
 /* bottom text css start here */
.bottom_txt {
  font-family: 'Bree Serif', serif;
  color: #f6f1f1;
  font-size: 13px;
  text-align: center;
  width: 70%;
  margin-bottom: 1rem;
}
.wisher {
  font-family: 'Bree Serif', serif;
  font-size: 17px;
  color: #bd5c57;
}
</style>
<body>
  <div class="container">
    <!-- Card Box HTML start here -->
    <div class="card white">
        <div style="width: 100%;height: fit-content;padding: 0 30px;z-index: 20;">
        <img src="images/img.png" alt="" class="profile_image">
        <!-- shape_image -->
        <img src="https://wishwisher.com/cardeffects/premium-card14effact.png?cache=false" class="shape_image">
        <!-- secshape_image -->
        <img src="https://wishwisher.com/cardeffects/premium-card14seceffact.png?cache=false" class="secshape_image">
        </div>  
              <!-- celebrant name html -->
              <p class="celebrantname">${name}</p>
        <!-- happy_text html -->
        <p class="happy_text">${type}</p>
        <!-- bottom line html -->
        <p class="bottom_txt">${msg}</p>
    </div>
  </div>
</body>
</html>
`
}