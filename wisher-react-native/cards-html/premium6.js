export const premium6 = ({ img, name, msg, type }) => {
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
            --text-color: #ccddf1;
            --white-color: #ffffff;
            --sectext-color: #554E30;
            --black-color: #010005;
        }

        /* card section css start here */
        .card {
            width: 100%;
            max-width: 36rem;
            height: 40rem;
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
            width: 50%;
        }

        /* design effact css start here */
        .card .effact {
            width: 100%;
            height: 40rem;
            position: absolute;
            top: 0;
            left: 0;
        }

        /* hapy text css start here */
        .card .happy_text {
            color: var(--text-color);
            font-size: 2.4rem;
            font-family: "Brush Script MT", serif;
            letter-spacing: 4px;
            margin-bottom: 0.5rem;
            z-index: 1;
        }

        /* celebrant name css star here */
        .card .name {
            font-family: "Rammetto One", cursive;
            color: var(--text-color);
            font-size: 1.8rem;
            text-transform: uppercase;
            margin-top: 0.0rem;
            z-index: 1;
        }

        /* bottom text css start here */
        .bottom_txt {
            font-family: "Courgette", cursive;
            color: var(--text-color);
            font-size: 1.1rem;
            z-index: 1;
            text-align: center;
            line-height: 1.2rem;
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
    <div class="card white">
        <!-- Happy Birthday text HTM" -->
        <p class="happy_text hwhite">${type}</p>
        <!-- celebrant image html -->
        <img src="${img}" alt="" class="profile_image">
        <!-- effact image html -->
        <img src="https://wishwisher.com/cardeffects/premium-card6effact.png" alt="" class="effact">
        <!-- celebrant name html -->
        <p class="name nwhite">${name}</p>
        <!-- bottom line html -->
        <p class="bottom_txt black">${msg}</p>
    </div>
    </div>
</body>

</html>

`
}