// ========== HAMBURGER MENU TOGGLE ========== 
// ใช้สำหรับเปิด/ปิดเมนูบนมือถือ

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// ฟังก์ชันสลับ (toggle) เมนู
function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// เพิ่ม event listener เมื่อคลิกไฮเบอร์เกอร์
hamburger.addEventListener('click', toggleMenu);

// ========== CLOSE MENU WHEN LINK CLICKED ========== 
// ปิดเมนูเมื่อกด link

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== SMOOTH SCROLL ANIMATION ========== 
// เอฟเฟกต์ scroll เรียบเหมือนชั้นฟ้า

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== SCROLL ANIMATION FOR ELEMENTS ========== 
// ทำให้องค์ประกอบปรากฏตัวขณะ scroll

function observeElements() {
    // สร้าง IntersectionObserver สำหรับเอฟเฟกต์ fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // เริ่มทำงานเมื่อมองเห็น 10% ขององค์ประกอบ
    });

    // เลือกองค์ประกอบทั้งหมดที่ต้องการ fade-in
    const elements = document.querySelectorAll('.skill-card, .project-card, .contact-card');
    
    elements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// เรียกใช้ฟังก์ชัน observeElements เมื่อ DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', observeElements);

// ========== NAVBAR BACKGROUND ON SCROLL ========== 
// เปลี่ยนสี navbar เมื่อ scroll ลง

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    // เพิ่มเงา navbar เมื่อ scroll ลงมากกว่า 50px
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.transition = '0.3s ease';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ========== PROGRESS BAR ANIMATION ========== 
// ทำให้ progress bar เติมขึ้นเมื่อ scroll มาถึง

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                progressFills.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    // ใช้ setTimeout เพื่อสร้างเอฟเฟกต์ animation
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease';
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    // สังเกตการณ์ skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

document.addEventListener('DOMContentLoaded', animateProgressBars);

// ========== ACTIVE NAV LINK ========== 
// ไฮไลท์ nav link ที่ active ตามหน้า

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '700';
        } else {
            link.style.color = '';
            link.style.fontWeight = '500';
        }
    });
});

// ========== CONTACT FORM (ตัวเลือก) ========== 
// สามารถเพิ่มฟังก์ชันจัดการแบบฟอร์มที่นี่

// ตัวอย่าง: เพิ่ม console log เมื่อคลิก contact card
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('click', function(e) {
        console.log('กดติดต่อ:', this.querySelector('h3').textContent);
    });
});

// ========== EASTER EGG (เซอร์ไพรส์นิดหน่อย!) ========== 
// ลองกด Ctrl + Shift + P บนหน้าเว็บ

let easterEggTriggered = false;

document.addEventListener('keydown', (e) => {
    // ตรวจสอบว่ากด Ctrl + Shift + P
    if (e.ctrlKey && e.shiftKey && e.key === 'P' && !easterEggTriggered) {
        easterEggTriggered = true;
        
        // สร้าง confetti effect (ใช้ emoji)
        const confetti = ['🎉', '⭐', '🚀', '💻', '⚽'];
        
        for (let i = 0; i < 20; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = confetti[Math.floor(Math.random() * confetti.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-30px';
            emoji.style.fontSize = '24px';
            emoji.style.zIndex = '9999';
            emoji.style.pointerEvents = 'none';
            
            document.body.appendChild(emoji);
            
            // ทำให้ emoji ตกลงมา
            let top = -30;
            const interval = setInterval(() => {
                top += Math.random() * 3 + 2;
                emoji.style.top = top + 'px';
                emoji.style.opacity = 1 - (top / window.innerHeight);
                
                if (top > window.innerHeight) {
                    clearInterval(interval);
                    emoji.remove();
                }
            }, 20);
        }
        
        alert('🎉 ยินดีด้วย! คุณพบ Easter Egg ลับๆ ของหน้านี้! 🎉');
    }
});

// ========== INITIAL SETUP ========== 
// เตรียมความพร้อมเมื่อเปิดหน้าเว็บ

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portfolio ของคุณโหลดสำเร็จ!');
    console.log('📧 ติดต่อ: lnwzar@email.com');
    console.log('🔗 GitHub: https://github.com/LnwZaR');
});
