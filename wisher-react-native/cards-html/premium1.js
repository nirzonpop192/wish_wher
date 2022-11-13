export const premium1 = ({ img, name, msg, type }) => {
    return `

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Title -->
    <title>Birthday Card</title>

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

        :root {
            --bg-color: #00243E;
            --text-color: #ccddf1;
            --white-color: #ffffff;
            --sectext-color: #13130a;
            --black-color: #010005;
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
            width: 30rem;
        }

        /* card section css start here */
        .card {
            width: 30rem;
            height: 27rem;
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
            width: 43%;
            height: 63%;
            left: 5.5rem;
            position: absolute;
            margin-top: 10px;
        }

        /* design effact css start here */
        .card .effact {
            width: 30rem;
            height: 27rem;
            position: absolute;
            top: 0;
            left: 0;
        }

        /* hapy text css start here */
        .card .happy_text {
            color: var(--text-color);
            font-size: 3rem;
            font-family: "Brush Script MT", serif;
            letter-spacing: 2px;
            margin-bottom: 0.5rem;
            position: absolute;
            top: 1rem;
            z-index: 1;
            left: 1rem;
            overflow: hidden;
        }

        /* celebrant name css star here */
        .card .name {
            font-family: "Rammetto One", cursive;
            color: var(--text-color);
            font-size: 1.8rem;
            text-transform: uppercase;
            margin-top: 20.0rem;
            position: absolute;
            left: 7rem;
        }

        /* bottom text css start here */
        .bottom_txt {
            font-family: "Courgette", cursive;
            color: var(--text-color);
            font-size: 1.1rem;
            position: absolute;
            margin-top: 24.0rem;
            left: 4.5rem;
            text-align: center;
            line-height: 1.2rem;
            right: 4.5rem;
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
</head>

<body>
    <!-- Card Box HTML start here -->
    <div class="container">
    <div class="card white">
    <!-- Happy Birthday text HTM" -->
    <p class="happy_text hwhite">${type}</p>
    <!-- celebrant image html -->
    <img src="${img}" alt="" class="profile_image">
    <!-- effact image html -->
    <img src="https://wishwisher.com/cardeffects/premium-card1effact.png" alt="" class="effact">
    <!-- celebrant name html -->
    <p class="name nblack">${name}</p>
    <!-- bottom line html -->
    <p class="bottom_txt bwhite">${msg}</p>
</div>
    </div>
</body>

</html>

`
}