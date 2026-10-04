const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
async function writeExcelTest(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const workSheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(workSheet, searchText);
    const cell = workSheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
};


async function readExcel(workSheet, searchText) {
    let output = { row: -1, column: -1 };
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;

};
//writeExcelTest("Republic1", 350,{rowChange:0, colChange:2}, "/Users/aisab/Downloads/excelTestDownload.xlsx");

test('Upload download excel validation', async ({ page }) => {

    const textSearch= 'Mango';
    const updateValue = '450';
    const filePath='/Users/aisab/Downloads/download.xlsx';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const download = await downloadPromise;
    await download.saveAs(filePath);
    await writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
const textLocator=await page.getByText(textSearch);
const desiredRow= await page.getByRole('row').filter({has:textLocator});
await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

});