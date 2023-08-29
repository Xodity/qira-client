module.exports = {
    clienrt : async function(userData) {
        if (!userData.connectSid && !userData.rememberMe) {
            console.log('Please login first to validating and saving your cookies auth');
            const client = await puppeteer.launch({
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                headless: false,
            });

            const pages = await client.pages();
            const page = pages[0];

            await page.goto('https://pony.town');
            console.log('U can login now. if done u can press Enter to Continue..');

            await new Promise((resolve) => {
                rl.once('line', () => {
                    resolve();
                });
            });
            await page.waitForTimeout(10000);
            const cookies = await page.cookies();
            userData.connectSid = cookies.find(cookie => cookie.name === 'connect.sid')?.value;
            userData.rememberMe = cookies.find(cookie => cookie.name === 'remember_me')?.value;

            const writeData = fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

            await page.close()
            writeData ? await HaveAuthToken() : null;

            console.log('Login successful! now us Data is recorded to JSON.');
        }
    }
}

