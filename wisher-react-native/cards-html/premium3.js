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
        }

        :root {
            --bg-color: #fffff;
            --text-color: #ffffff;
            --white-color: #ffffff;
            --sectext-color: #554E30;
            --black-color: #010005;
        }

        .container {
            align-items: center;
            display: flex;
            justify-content: center;
            height: 100%;
            width: 100%;
        }

        .body {
            box-sizing: border-box;
            align-items: center;
            align-self: center;
            alignment: center;
            /*box-shadow: rgba(0, 0, 0, 0.308) 10px 10px 50px;*/
            background-color: whitesmoke;
        }

        /* card section css start here */
        .card {
            width: 100%;
            max-width: 36rem;
            height: 36rem;
            margin: auto;
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
            width: 70%;
            height: 23rem;
            top: 90px;
            position: absolute;
        }

        /* design effact css start here */
        .card .effact {
            width: 100%;
            height: 36rem;
            position: absolute;
            top: 0;
            left: 0;
        }

        /* hapy text css start here */
        .card .happy_text {
            color: var(--text-color);
            font-size: 2.2rem;
            font-family: "Courgette", cursive;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            position: absolute;
            z-index: 10;
            top: 10px;
        }

        /* celebrant name css star here */
        .card .name {
            font-family: "Rammetto One", cursive;
            color: var(--text-color);
            font-size: 1.9rem;
            text-transform: uppercase;
            margin-top: 0.7rem;
            z-index: 10;
            bottom: 64px;
            position: absolute;
        }

        /* bottom text css start here */
        .bottom_txt {
            font-family: "Courgette", cursive;
            color: var(--text-color);
            font-size: 1.2rem;
            text-align: center;
            bottom: 10px;
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
    <div class="card blue">
    <!-- Happy Birthday text HTM" -->
    <p class="happy_text">
        ${type}
    </p>
    <!-- celebrant image html -->
    <img src="${img}" alt="" class="profile_image">
    <!-- effact image html -->
    <img src="https://wishwisher.com/cardeffects/premium-card3effact.png" alt="" class="effact">
    <!-- celebrant name html -->
    <p class="name">
        ${name}
    </p>
    <!-- bottom line html -->
    <p class="bottom_txt">
        ${msg}
    </p>
</div>
    </div>
</body>

</html>

`
}