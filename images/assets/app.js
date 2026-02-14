/* =========================
       REFS (заглушка)
    ========================= */
    const REF_URL = "https://lbgame777.xyz/2z87kj?sub1=seo&sub2=seo";
    const TG_URL  = "https://lbgame777.xyz/2z87kj?sub1=seo&sub2=seo";
    
    function buildRefUrl(src){
      const u = new URL(REF_URL);
      u.searchParams.set("sub3", src || "unknown");
      return u.toString();
    }

    function applyRefs(root=document){
      root.querySelectorAll(".ref-link").forEach(el => {
        const src = el.getAttribute("data-ref") || "unknown";
        if (src.includes("tg")) {
          el.href = TG_URL;
        } else {
          el.href = buildRefUrl(src);
        }
        el.setAttribute("rel", "nofollow sponsored noopener noreferrer");
        el.setAttribute("target", "_blank");
      });
    }

    applyRefs();


    /* =========================
       Sync percents
    ========================= */
    function syncBonusPercents(){
      document.querySelectorAll('[data-bonus-percent]').forEach(block=>{
        const val = block.getAttribute('data-bonus-percent') || '360';
        block.querySelectorAll('.js-percent').forEach(el=> el.textContent = val + '%');
      });
    }
    syncBonusPercents();

    /* =========================
       Mobile drawer
    ========================= */
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('drawerClose');
    const drawerLinks = Array.from(document.querySelectorAll('.drawer-link'));

    function openDrawer(){
      burger.setAttribute('aria-expanded','true');
      drawer.classList.add('open');
      drawerOverlay.classList.add('open');
      drawer.setAttribute('aria-hidden','false');
      drawerOverlay.setAttribute('aria-hidden','false');
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    }
    function closeDrawer(){
      burger.setAttribute('aria-expanded','false');
      drawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      drawer.setAttribute('aria-hidden','true');
      drawerOverlay.setAttribute('aria-hidden','true');
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }
    burger.addEventListener('click', ()=>{
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      expanded ? closeDrawer() : openDrawer();
    });
    closeBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    drawerLinks.forEach(a => a.addEventListener('click', closeDrawer));
    window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeDrawer(); });

    /* =========================
       Games (3 категории)
    ========================= */
    const ASSETS = "images";
    const games = {
      slots: [
        { title:"Mineslot", text:"Слот • mineslot играть онлайн.", ref:"slot_mineslot", demoRef:"slot_mineslot_demo", img:`${ASSETS}/game1.png` },
        { title:"Minedrop", text:"Слот • minedrop играть где удобно.", ref:"slot_minedrop", demoRef:"slot_minedrop_demo", img:`${ASSETS}/game2.png` },
        { title:"Aviamasters", text:"Слот/краш • aviamasters играть.", ref:"slot_aviamasters", demoRef:"slot_aviamasters_demo", img:`${ASSETS}/game3.png` },
        { title:"The Dog House", text:"Слот • один из хитов.", ref:"slot_doghouse", demoRef:"slot_doghouse_demo", img:`${ASSETS}/game5.png`, extra:true },
        { title:"SixSixSix", text:"Слот • бонусные механики.", ref:"slot_sixsixsix", demoRef:"slot_sixsixsix_demo", img:`${ASSETS}/game4.png`, extra:true },
        { title:"Le Bandit", text:"Слот • популярная подборка.", ref:"slot_le_bandit", demoRef:"slot_le_bandit_demo", img:`${ASSETS}/game10.png`, extra:true }
      ],
      fast: [
        { title:"Aviamasters", text:"Краш • ставка и выход по времени.", ref:"fast_aviamasters", img:`${ASSETS}/game3.png` },
        { title:"Minedrop", text:"Быстрая • серии и множители.", ref:"fast_minedrop", img:`${ASSETS}/game2.png` },
        { title:"Mineslot", text:"Быстрая • контроль риска.", ref:"fast_mineslot", img:`${ASSETS}/game1.png` },
        { title:"Tower Rush", text:"Быстрая • подъем по уровням.", ref:"fast_tower_rush", img:`${ASSETS}/game10.png` },
        { title:"Chicken Road", text:"Быстрая • выбирайте момент выхода.", ref:"fast_chicken_road", img:`${ASSETS}/game9.png` }
      ],
      popular: [
        { title:"The Dog House", text:"Хит • частый выбор игроков.", ref:"pop_doghouse", demoRef:"pop_doghouse_demo", img:`${ASSETS}/game5.png` },
        { title:"SixSixSix", text:"Хит • быстрые бонусы.", ref:"pop_sixsixsix", demoRef:"pop_sixsixsix_demo", img:`${ASSETS}/game4.png` },
        { title:"Le Bandit", text:"Хит • популярный слот.", ref:"pop_le_bandit", demoRef:"pop_le_bandit_demo", img:`${ASSETS}/game10.png` },
        { title:"Blood Suckers", text:"High RTP слот (98%).", ref:"pop_blood_suckers", demoRef:"pop_blood_suckers_demo", img:`${ASSETS}/game7.png` },
        { title:"Mega Joker", text:"High RTP слот (до 99%).", ref:"pop_mega_joker", demoRef:"pop_mega_joker_demo", img:`${ASSETS}/game8.png` },
        { title:"Jackpot 6000", text:"High RTP слот (до 98.9%).", ref:"pop_jackpot_6000", demoRef:"pop_jackpot_6000_demo", img:`${ASSETS}/game6.png` }
      ]
    };

    function cardHTML(g){
      const demoBtn = g.demoRef ? `<a class="btn btn-outline ref-link" href="#" data-ref="${g.demoRef}">Демо</a>` : '';
      return `
        <div class="game ${g.extra ? 'extra-slot' : ''}" style="${g.extra ? 'display:none' : ''}">
          <div class="gimg"><img src="${g.img}" alt="${g.title}"></div>
          <div class="gbody">
            <p class="gt">${g.title}</p>
            <p class="gd">${g.text}</p>
            <div class="gactions">
              <a class="btn ref-link" href="#" data-ref="${g.ref}">Играть</a>
              ${demoBtn}
            </div>
          </div>
        </div>
      `;
    }
    function renderCards(){
      document.getElementById("cards_slots").innerHTML = games.slots.map(cardHTML).join("");
      document.getElementById("cards_fast").innerHTML  = games.fast.map(cardHTML).join("");
      document.getElementById("cards_popular").innerHTML = games.popular.map(cardHTML).join("");
      applyRefs();
    }
    renderCards();

    document.querySelectorAll(".tab-btn").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const tab = btn.dataset.tab;
        document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active", b===btn));
        document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active", p.dataset.panel===tab));
      });
    });

    // Show more on /slots/
    const showMoreBtn = document.getElementById("showMoreSlots");
    if (showMoreBtn) {
      showMoreBtn.addEventListener("click", ()=>{
        // поддерживаем оба варианта: .is-hidden (новый каталог) и .extra-slot (старые табы)
        const hiddenItems = document.querySelectorAll(".is-hidden, .extra-slot");
        if (!hiddenItems.length) return;

        const anyHiddenByClass = Array.from(hiddenItems).some(x => x.classList.contains("is-hidden"));
        const anyHiddenByStyle = Array.from(hiddenItems).some(x => x.style && x.style.display === "none");
        const makeVisible = anyHiddenByClass || anyHiddenByStyle;

        hiddenItems.forEach(x => {
          if (x.classList.contains("is-hidden")) {
            x.classList.toggle("is-hidden", !makeVisible);
          }
          if (x.classList.contains("extra-slot")) {
            x.style.display = makeVisible ? "" : "none";
          }
        });

        showMoreBtn.textContent = makeVisible ? "Скрыть" : "Еще";
      });
    }

    /* =========================
       FAQ accordion
    ========================= */
    document.querySelectorAll(".faq-q").forEach(q=>{
      q.addEventListener("click", ()=> q.closest(".faq-item").classList.toggle("open"));
    });

    /* =========================
       Reviews slider
    ========================= */
    const reviews = [
      { name:"Михаил К.", text:"«Искал, где играть без лишних заморочек. Здесь понятный вход, быстрые игры и нормальные выплаты».", img:`${ASSETS}/bluecard.png` },
      { name:"Алина С.", text:"«Забрала приветственный бонус и фриспины, попробовала Mineslot и Aviamasters — всё работает стабильно».", img:`${ASSETS}/blackcard.png` },
      { name:"Денис Р.", text:"«Удобно, что можно играть через Telegram. Minedrop заходит отлично, а выплаты приходят быстро».", img:`${ASSETS}/bluecard.png` },
      { name:"Ирина В.", text:"«Понравился каталог и подборка популярных слотов. Для меня важно, что условия прозрачные».", img:`${ASSETS}/blackcard.png` }
    ];

    const revName = document.getElementById("revName");
    const revText = document.getElementById("revText");
    const revImg  = document.getElementById("revImg");
    const revPrev = document.getElementById("revPrev");
    const revNext = document.getElementById("revNext");
    const revDots = document.getElementById("revDots");
    let revIndex = 0;

    function renderDots(){
      revDots.innerHTML = reviews.map((_,i)=>`<span class="dot ${i===revIndex?'active':''}" data-i="${i}"></span>`).join("");
      revDots.querySelectorAll(".dot").forEach(d=>{
        d.addEventListener("click", ()=>{ revIndex = Number(d.dataset.i); paintReview(); });
      });
    }
    function paintReview(){
      const r = reviews[revIndex];
      revName.textContent = r.name;
      revText.textContent = r.text;
      revImg.src = r.img;
      renderDots();
    }
    revPrev.addEventListener("click", ()=>{ revIndex = (revIndex - 1 + reviews.length) % reviews.length; paintReview(); });
    revNext.addEventListener("click", ()=>{ revIndex = (revIndex + 1) % reviews.length; paintReview(); });
    paintReview();

    /* =========================
       Popup on scroll (один раз)
    ========================= */
    (function(){
      const pop = document.getElementById("popup");
      const close = document.getElementById("popupClose");
      const KEY = "lb_popup_shown_v3";
      if(!pop || !close) return;

      function open(){
        pop.classList.add("open");
        pop.setAttribute("aria-hidden","false");
        document.documentElement.classList.add("no-scroll");
        document.body.classList.add("no-scroll");
        localStorage.setItem(KEY,"1");
      }
      function shut(){
        pop.classList.remove("open");
        pop.setAttribute("aria-hidden","true");
        document.documentElement.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");
      }
      close.addEventListener("click", shut);
      pop.addEventListener("click", (e)=>{ if(e.target===pop) shut(); });
      window.addEventListener("keydown", (e)=>{ if(e.key==="Escape" && pop.classList.contains("open")) shut(); });

      function onScroll(){
        if(localStorage.getItem(KEY)==="1") return;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        if(max<=0) return;
        const p = (doc.scrollTop || document.body.scrollTop) / max;
        if(p >= 0.35){
          open();
          window.removeEventListener("scroll", onScroll);
        }
      }
      window.addEventListener("scroll", onScroll, {passive:true});
    })();
(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106745460', 'ym');

    ym(106745460, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
/* =========================
   POPUP (bonus modal)
========================= */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closePopup');
  if (!overlay) return;
  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
});
