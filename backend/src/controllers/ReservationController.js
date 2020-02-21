const puppeteer = require('puppeteer');

module.exports = {
    async index(req, res) {
        const { checkin, checkout } = req.body;

        let url = `https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation&sid=95267a07-6c76-4d21-9982-369ed24dfb33#/&diff=false&CheckIn=${checkin}&CheckOut=${checkout}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`;

        try{

            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(url);

            const response = await page.evaluate(() => {
                let rooms = document.querySelectorAll('table.maintable tr.roomName');
                let results = [];

                rooms.forEach((room) => {
                    let data = {};
                    data.title = room.querySelector('.excerpt h5 a').innerText;
                    data.description = room.querySelector('.excerpt p a').innerText;
                    data.price = room.querySelector('h6.bestPriceTextColor').innerText;
                    data.url = url;

                    let images = room.querySelectorAll('.thumb div.roomSlider .slide');
                    
                    let slide = [];
                    images.forEach((image) => {
                        uri = image.querySelector('a img').getAttribute('src');

                        slide.push({
                            uri: uri
                        });
                    });
                    data.images = slide;

                    results.push(data);
                });

                return results;
            });

            return res.json({data: response});
            await browser.close();
        }catch(err){
            await browser.close();
            console.log(error(err));
        }
    },
};