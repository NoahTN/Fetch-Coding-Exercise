import { test, expect } from '@playwright/test';


test("find fake gold", async ({page}) => {
    // Split into halves and compare combined weight, continue until one remains

    // Fill number input fields
    async function inputNumbers(leftBowl:number[], rightBowl:number[]) {
        await page.getByText("Reset").click();
        for(const [i, num] of leftBowl.entries()) {
            await page.locator("#left_" + i).fill("" + num);
        }
        for(const [i, num] of rightBowl.entries()) {
            await page.locator("#right_" + i).fill("" + num);
        }
    }

    // Submit answer
    async function identifyFake(num:number) {
        await page.locator("#coin_" + num).click();
    }

    // Handle answer alert
    page.on('dialog', async dialog => {
        if(dialog.message() === "Yay! You find it!") {
            foundFake = true;
        }
        console.log(dialog.message());
        await dialog.accept();
    });

    await page.goto("http://sdetchallenge.fetch.com/");
    let foundFake: boolean = false;

    await inputNumbers([0, 1, 2, 3], [4, 5, 6, 7]);
    await page.locator("#weigh").click();

    let i:number = 0;
    let currentResult = await page.locator(".game-info > ol > li").nth(i)!.textContent();
    let currentResultArr:string[] = currentResult!.split(" ");
    let pastWeighing:string[] = [currentResult!];

  
    // Edge case, both sides are equal so the remaining must be the fake
    if(currentResult![1] === "=") {
        identifyFake(8);
    }
    else {
        while(true) {
            ++i;
            let index:number = currentResultArr[1] === "<" ? 0 : 2;
            const half:number[] = currentResultArr[index].slice(1, -1).split(",").map((s: string) => parseInt(s));

            await inputNumbers(half.slice(0, Math.floor(half.length/2)), half.slice(Math.floor(half.length/2)));
            await page.locator("#weigh").click();

            currentResult = await page.locator(".game-info > ol > li").nth(i).textContent();
            currentResultArr = currentResult!.split(" ");
            pastWeighing.push(currentResult!);

            // Only two elements remain, select the fake one
            if(!currentResultArr[0].includes(",")) {
                if(currentResultArr[1] === "<") {
                    await identifyFake(parseInt(currentResultArr[0].slice(1, -1)));
                }
                else {
                    await identifyFake(parseInt(currentResultArr[2].slice(1, -1)));
                }
                console.log("Weighing Count: " + (i+1));
                console.log(pastWeighing.join("\n"));
                break;
            }
        }
    }
    
    expect(foundFake).toBe(true);

})