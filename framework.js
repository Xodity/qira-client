module.exports = {
    RunServer : async function (page) {
        console.log('Waiting for button server to be loaded...');
        await page.waitForSelector('.btn.btn-lg.btn-success.text-ellipsis.flex-grow-1');

        console.log('Client bot is ready with anti afk. Happy hacking!');
        await page.click('.btn.btn-lg.btn-success.text-ellipsis.flex-grow-1');
    },
    HookAuth : async function (userData, rl, dataFilePath, framework, puppeteer, fs, antiAfk) {

            console.log('Data cookies founded: ' , userData);
            const client = await puppeteer.launch({
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                headless: "new",
            });

            const pages = await client.pages();
            const page = pages[0];

            await page.goto('https://pony.town', { timeout: 60000 });
            await page.evaluate((connectSid, rememberMe) => {
                document.cookie = `connect.sid=${connectSid}; path=/`;
                document.cookie = `remember_me=${rememberMe}; path=/`;
            }, userData.connectSid, userData.rememberMe);

            await page.reload() ? console.log('connecting client to server success') : console.log('connecting client to server failed');

            const extractedData = await page.evaluate(() => {
                const connectSid = document.cookie.match(/connect\.sid=([^;]+)/)[1];
                const rememberMe = document.cookie.match(/remember_me=([^;]+)/)[1];
                return {connectSid, rememberMe};
            });
            console.log('Authentication Data:', extractedData);
            const characterName = await new Promise((resolve) => {
                rl.question('Input the nickname pony.town: ', (name) => {
                    resolve(name);
                });
            });
            await page.waitForSelector('.form-control.text-center.padded-right');
            await page.waitForTimeout(1000);
            await page.evaluate( () => {
                const inputElement = document.querySelector('.form-control.text-center.padded-right');
                inputElement.value = '';
            }, characterName);
            await page.type('.form-control.text-center.padded-right', characterName);
            setTimeout(() => {
                console.log('Timeout occurred for this section of the code.');
                framework.RunServer(page);
                antiAfk.antiAfk(page);
            }, 5000); // Timeout duration in milliseconds

            fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));
            console.log("waiting for cmd is terminating....");
        }
}