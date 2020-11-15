const got = require("got");
const download = require("download");
const FormData = require("form-data");
const probe = require("probe-image-size");
const resizeImg = require("resize-img");
const moment = require("moment");
const fs = require("fs");

let rawdata = fs.readFileSync("listings_test1.json");
let listings = JSON.parse(rawdata);

const alice = {
    id: undefined,
    info: {
        email: "alice@example.com",
        password: "string",
        name: "Alice",
        phone_number: "0412345678",
        street: "55 Portman St",
        suburb: "Zetland",
        postcode: "2017",
        state: "NSW",
        country: "Australia",
    },
    avatar:
        "https://image.shutterstock.com/image-photo/pretty-smiling-joyfully-female-fair-260nw-776697943.jpg",
};
const bob = {
    id: undefined,
    info: {
        email: "bob@example.com",
        password: "string",
        name: "Bob",
        phone_number: "0412345678",
        street: "50 Crinan St",
        suburb: "Hurlstone Park",
        postcode: "2193",
        state: "NSW",
        country: "Australia",
    },
    avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
};

const createAlice = async () => {
    let response;
    try {
        response = await got.post("http://localhost:8000/signup", {
            json: alice.info,
            responseType: "json",
        });
        console.log("Alice signed up");
    } catch (error) {
        console.log("Alice already signed up");
        if (error.response?.statusCode != 409) throw error;
        response = await got.post("http://localhost:8000/login", {
            json: { email: alice.info.email, password: alice.info.password },
            responseType: "json",
        });
        console.log("Alice logged in");
    }
    const data = await download(alice.avatar);
    const cookie = response.headers["set-cookie"][0];
    let form = new FormData();
    form.append("file", data, { filename: "alice.jpg" });
    await got(`http://localhost:8000/users/avatar`, {
        headers: {
            Cookie: cookie,
        },
        method: "post",
        body: form,
    });
    return cookie;
};

const createBob = async () => {
    let response;
    try {
        response = await got.post("http://localhost:8000/signup", {
            json: bob.info,
            responseType: "json",
        });
        console.log("Bob signed up");
    } catch (error) {
        console.log("Bob already signed up");
        if (error.response.statusCode != 409) throw error;
        response = await got.post("http://localhost:8000/login", {
            json: { email: bob.info.email, password: bob.info.password },
            responseType: "json",
        });
        console.log("Bob logged in");
    }
    const data = await download(bob.avatar);
    const cookie = response.headers["set-cookie"][0];
    let form = new FormData();
    form.append("file", data, { filename: "bob.jpg" });
    await got(`http://localhost:8000/users/avatar`, {
        headers: {
            Cookie: cookie,
        },
        method: "post",
        body: form,
    });
    return cookie;
};

const fetchImage = async (url) => {
    const data = await download(url);
    const { width, height, type } = await probe(url);
    if (width > 1000) {
        const resizedImage = await resizeImg(data, {
            width: 1000,
            height: (1000 / width) * height,
        });
        return { image: resizedImage, type };
    }
    return { image: data, type };
};

const createListing = async (index, listing, cookie) => {
    const auction_start = moment().add(Math.floor(index / 5), "days");
    const auction_end = moment(auction_start).add(7, "days");
    const images = [...listing.images];
    delete listing.images;
    const listingToPost = {
        ...listing,
        auction_start: auction_start.toISOString(),
        auction_end: auction_end.toISOString(),
        account_name: "Jane Doe",
        bsb: "123456",
        account_number: "123456789",
    };
    try {
        console.log(`Creating ${listing.street}`);
        const response = await got.post("http://localhost:8000/listings/", {
            headers: {
                Cookie: cookie,
            },
            json: listingToPost,
            responseType: "json",
        });
        console.log(
            `Successfully uploaded ${listing.street}, now uploading images...`
        );
        const result = response.body;
        let form = new FormData();
        const imagesFetched = await Promise.all(
            images.map((image) => fetchImage(image))
        );
        console.log(`Fetched images for ${listing.street}`);
        imagesFetched.forEach((image, i) => {
            form.append("files", image.image, {
                filename: `${i}.${image.type}`,
            });
        });
        await got(`http://localhost:8000/listings/${result.id}/images`, {
            headers: {
                Cookie: cookie,
            },
            method: "post",
            body: form,
        });
    } catch (e) {
        console.log(
            `Error when uploading listing: ${listing.street}\nError: ${e}, Detail: ${e.response?.body?.detail}`
        );
    }
};

const chunk = (arr, len) => {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
        chunks.push(arr.slice(i, (i += len)));
    }
    return chunks;
};

const main = async () => {
    /**
     * Create two users: alice and bob
     */
    const [aliceCookie, bobCookie] = await Promise.all([
        createAlice(),
        createBob(),
    ]);
    /**
     * Upload Listing
     */
    i = 0;
    for (listingsBatch of chunk(listings, 1)) {
        await Promise.all(
            listingsBatch.map((listing) =>
                createListing(
                    i++,
                    listing,
                    i % 2 === 0 ? aliceCookie : bobCookie
                )
            )
        );
    }
};

main();
