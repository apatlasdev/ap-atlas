const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const fs = require('fs');
(async () => {
  const body = fs.readFileSync('/home/claude/ap-app-new.html', 'utf8');
  fs.writeFileSync('/home/claude/preview.html', '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0">' + body + '</body></html>');
  const browser = await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const ctx = await browser.newContext({ viewport: { width: 1360, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message + '\n' + (e.stack||'')));
  page.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL|fonts/.test(m.text())) errs.push('CONSOLE: ' + m.text()); });
  await page.goto('file:///home/claude/preview.html');
  await page.waitForTimeout(800);
  await page.evaluate(()=>{ try{ localStorage.clear(); }catch(e){} });
  await page.reload(); await page.waitForTimeout(800);
  const txt = async () => (await page.locator('#main').innerText()).slice(0, 220).replace(/\n+/g, ' | ');
  console.log('HOME:', await txt());
  // lesson 1-1: read -> see -> explore
  await page.locator('#main button').filter({ hasText: /Start lesson/ }).first().click(); await page.waitForTimeout(300);
  await page.locator('#lNext').click(); await page.waitForTimeout(300); // see
  console.log('SEE next btn:', await page.locator('#lNext').innerText());
  await page.locator('#lNext').click(); await page.waitForTimeout(300); // explore
  console.log('EXPLORE:', await txt());
  await page.waitForSelector('.a3d-stage canvas', {timeout: 60000});
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '/home/claude/shot3-explore.png' });
  // click on body
  const st = await page.locator('.a3d-stage').boundingBox();
  await page.mouse.click(st.x+st.width/2, st.y+st.height*0.45); await page.waitForTimeout(400);
  console.log('INFO:', (await page.locator('.a3d-info').innerText()).slice(0,300).replace(/\n+/g,' | '));
  await page.screenshot({ path: '/home/claude/shot3-explore2.png' });
  // go on to check
  await page.locator('#lNext').click(); await page.waitForTimeout(300);
  console.log('CHECK:', await txt());
  // atlas view
  await page.locator('.navbtn[data-view="atlas"]').click(); await page.waitForTimeout(1200);
  await page.screenshot({ path: '/home/claude/shot3-atlas.png' });
  await page.locator('[data-p3="7-2"]').click(); await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/claude/shot3-atlas-heart.png' });
  await page.locator('[data-p3="2-2"]').click(); await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/claude/shot3-atlas-cell.png' });
  // unlock all and open lesson 2-2 explore
  await page.evaluate(()=>{ const s=JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>/ap|atlas|study/i.test(k))||'')||'{}'); });
  await page.locator('.navbtn[data-view="progress"]').click(); await page.waitForTimeout(300);
  const ua = page.locator('#unlockAll'); if (await ua.count()) { await ua.check(); await page.waitForTimeout(200); }
  await page.locator('.navbtn[data-view="course"]').click(); await page.waitForTimeout(300);
  await page.locator('.lesrow[data-les="2-2"]').click(); await page.waitForTimeout(300);
  await page.locator('#lNext').click(); await page.waitForTimeout(300); // see
  console.log('2-2 step2 btn:', await page.locator('#lNext').innerText());
  await page.locator('#lNext').click(); await page.waitForTimeout(1200); // explore (cell)
  console.log('2-2 EXPLORE:', await txt());
  await page.screenshot({ path: '/home/claude/shot3-cell-lesson.png' });
  // 5-4 brain
  await page.locator('.navbtn[data-view="course"]').click(); await page.waitForTimeout(300);
  await page.locator('.lesrow[data-les="5-4"]').click(); await page.waitForTimeout(300);
  await page.locator('#lNext').click(); await page.waitForTimeout(300);
  await page.locator('#lNext').click(); await page.waitForTimeout(1200);
  await page.screenshot({ path: '/home/claude/shot3-brain-lesson.png' });
  // mobile
  await page.setViewportSize({ width: 400, height: 800 }); await page.waitForTimeout(600);
  await page.screenshot({ path: '/home/claude/shot3-mobile.png' });
  console.log('ERRORS:', errs.length); errs.slice(0, 8).forEach(e => console.log(e));
  await browser.close();
})();
