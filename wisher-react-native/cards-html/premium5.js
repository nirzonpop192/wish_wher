export const premium5 = ({ img, name, msg, type }) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            --bg-color: #e9ede6;
            --text-color: #c971a2;
            --white-color: #ffffff;
            --sectext-color: #554E30;
            --black-color: #010005;
        }

        /* card section css start here */
        .card {
            width: 100%;
            max-width: 36rem;
            height: 38rem;
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
            height: 26rem;
            position: absolute;
            top: 68px;
            left: 20%;
        }

        /* design effact css start here */
        .card .effact {
            width: 100%;
            height: 36rem;
            position: absolute;
            top: 20px;
            left: 0;
        }

        /* hapy text css start here */
        .card .happy_text {
            color: var(--text-color);
            font-size: 1.3rem;
            font-family: "Cinzel", serif;
            letter-spacing: 4px;
            margin-bottom: 1rem;
            z-index: 10;
            position: absolute;
            top: 6px;
        }

        /* celebrant name css star here */
        .card .name {
            font-family: "Courgette", cursive;
            color: #835799;
            font-size: 1.9rem;
            text-transform: uppercase;
            margin-top: 0.7rem;
            z-index: 10;
            bottom: 24px;
            position: absolute;
        }

        /* bottom text css start here */
        .bottom_txt {
            font-family: "Rammetto One", cursive;
            color: var(--text-color);
            font-size: 1rem;
            z-index: 1;
            bottom: 3px;
            position: absolute;
            text-align: center;
            line-height: 1rem;
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

        html,
        body {
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
    </style>
</head>

<body>
    <!-- Card Box HTML start here -->
    <div class="container">
    <div class="card blue">
        <!-- Happy Birthday text HTM" -->
        <p class="happy_text">${type}</p>
        <!-- celebrant image html -->
        <img src="${img}" alt="" class="profile_image">
        <!-- effact image html -->
        <img src="https://wishwisher.com/cardeffects/premium-card5effact.png" alt="" class="effact">
        <!-- celebrant name html -->
        <p class="name">${name}</p>
        <!-- bottom line html -->
        <p class="bottom_txt">${msg}</p>
    </div>
    </div>
</body>

</html>


`
}