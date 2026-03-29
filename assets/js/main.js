/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show')
    })
  }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link')
    } else {
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/* ===== contact ==== */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  if (!name || !email || !message) {
    document.getElementById("response").innerText = "Fill all fields!";
    document.getElementById("response").style.color = "red";
    return;
  }

  // 👇 DISCORD WEBHOOK SEND
  fetch("https://discord.com/api/webhooks/1487405157019942972/DcuUpNerwqkh2ID3PBEORS3W3YoXPFqCPJSRScacHXvSUKw74yTYSvQUypzimaaeGBZP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      embeds: [{
        title: "📩 __New Contact Mail From__ :",
        color: 0xff6666,
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/1483841113101041794/1487402837087359113/ea248b29ed1cfd9e18d76efd4a95c1d5_-_Copy.jpg?ex=69c90356&is=69c7b1d6&hm=19ede52b3e8f60ad989c015b34b8c5b2de3c2038691be4e5c41a620969919db2&" // 👈 yaha apna image link
        },
        fields: [
          { name: "**Name :**", value: `\`${name}\``, inline: true },
          { name: "**Email :**", value: `\`${email}\``, inline: true },
          { name: "**Message :**", value: `\`\`\`${message}\`\`\`` }
        ],

        footer: { text: "Powered by synyx" },
        timestamp: new Date()
      }]
    })
  });

  document.getElementById("response").innerText = "Message Sent!";
  document.getElementById("response").style.color = "green";

  document.getElementById("contactForm").reset();
});

/* ===== COUNTER (SCROLL + SMOOTH) ===== */
const counters = document.querySelectorAll('.counter');
const speed = 300; // 🔥 bada value = slow smooth

let started = false;

window.addEventListener('scroll', () => {
  const section = document.querySelector('.counters');
  const sectionTop = section.offsetTop - window.innerHeight;

  if (!started && window.scrollY > sectionTop) {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');

        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment).toLocaleString();
          requestAnimationFrame(updateCount); // 🔥 smoother than setTimeout
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      updateCount();
    });

    started = true; // 🔥 only once
  }
});
/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input, .team-section, .tagline, .counters, .line', { interval: 200 }); 
