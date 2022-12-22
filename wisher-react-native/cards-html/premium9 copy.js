export const premium9bk = ({ img, name, msg, type }) => {
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
            --bg-color: #00243E;
            --text-color: #4d6448;
            --bottom-text-color: #767676;
            --white-color: #ffffff;
            --sectext-color: #554E30;
            --black-color: #010005;
        }

        /* card section css start here */
        .card {
            width: 100%;
            max-width: 36rem;
            height: 30rem;
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
            width: 65%;
            height: 65%;
        }

        /* design effact css start here */
        .card .effact {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        /* hapy text css start here */
        .card .happy_text {
            color: var(--text-color);
            font-size: 1.1rem;
            font-family: "Cinzel", serif;
            letter-spacing: 4px;
            margin-bottom: 2.5rem;
            z-index: 10;
            font-size: 2rem;
            font-family: "Brush Script MT", serif;
        }

        /* celebrant name css star here */
        .card .name {
            font-family: "Courgette", cursive;
            color: var(--text-color);
            font-size: 1.25rem;
            text-transform: uppercase;
            margin-top: 0.7rem;
            top: 75px;
            position: absolute;
        }

        /* bottom text css start here */
        .bottom_txt {
            font-family: "Rammetto One", cursive;
            color: var(--bottom-text-color);
            font-size: 0.6rem;
            position: absolute;
            bottom: 40px;
            text-align: center;
            padding: 0px 12px;
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
    <p class="happy_text">${type}</p>
        <!-- celebrant image html -->
        <img src="${img}" alt="" class="profile_image">
        <!-- effact image html -->
        <img src="https://wishwisher.com/cardeffects/premium-card9effact.png" alt="" class="effact">
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