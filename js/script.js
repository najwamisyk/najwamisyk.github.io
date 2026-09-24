/* ======================================================
   SAGARA - Offline JavaScript
   Interaktivitas & Konfigurasi In-Website
====================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi Lucide Icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu) {
                menu.classList.add('hidden');
            }
        });
    });

    // Navbar Scroll Effect (Add blur and shadow on scroll)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-md', 'bg-base/95');
                navbar.classList.remove('bg-base/90');
            } else {
                navbar.classList.remove('shadow-md', 'bg-base/95');
                navbar.classList.add('bg-base/90');
            }
        });
    }

    // Event Listener Escape key untuk menutup modal, lightbox & peta offline
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeInWebModal();
            closeLightbox();
            closeOfflineMap();
        }
    });
});

// ======================================================
// MODAL KONSULTASI IN-WEBSITE (TANYA SAGARA)
// ======================================================

function openInWebModal(topic = 'umum') {
    const modal = document.getElementById('inweb-modal');
    if (!modal) return;

    // Switch ke tab form & reset form view
    switchModalTab('form');
    resetModalForm();

    // Set pilihan topik & pesan preset sesuai tombol yang diklik
    const topicSelect = document.getElementById('modal-topic');
    const msgInput = document.getElementById('modal-message');
    
    if (topicSelect) {
        if (topic === 'rute' || topic === 'petualangan') {
            topicSelect.value = 'rute';
            if (msgInput) msgInput.value = 'Halo Sagara! 🌊 Saya mau konsultasi rute dan panduan perjalanan terbaik dari Kediri menuju pantai pesisir JLS. Jalur mana yang paling nyaman?';
        } else if (topic === 'kuliner') {
            topicSelect.value = 'kuliner';
            if (msgInput) msgInput.value = 'Halo Sagara! 🐟 Saya ingin rekomendasi kuliner seafood segar khas pesisir dan sentra warung UMKM lokal di sepanjang JLS. Spill tempat terbaiknya dong!';
        } else if (topic === 'homestay') {
            topicSelect.value = 'homestay';
            if (msgInput) msgInput.value = 'Halo Sagara! 🏠 Saya tertarik ingin booking / tanya ketersediaan homestay & cottage pesisir dekat pantai JLS untuk rencana liburan.';
        } else if (topic === 'panduan') {
            topicSelect.value = 'panduan';
            if (msgInput) msgInput.value = 'Halo Sagara! 🧭 Boleh minta panduan itinerary rute perjalanan day trip / 2D1N dari Kediri menuju destinasi pantai JLS?';
        } else if (topic === 'mitra') {
            topicSelect.value = 'mitra';
            if (msgInput) msgInput.value = 'Halo Sagara! 🤝 Saya pemilik usaha / UMKM lokal pesisir (warung/homestay/wahana/oleh-oleh) dan ingin mendaftarkan usaha saya di platform Sagara.';
        } else if (topic === 'spot' || topic === 'galeri') {
            topicSelect.value = 'spot';
            if (msgInput) msgInput.value = 'Halo Sagara! 📸 Saya mau tanya titik lokasi spot foto paling aesthetic dan view sunset terbaik di sepanjang Jalur Lintas Selatan.';
        } else {
            topicSelect.value = 'umum';
            if (msgInput) msgInput.value = 'Halo Sagara! 🌊 Saya baru cek websitenya dan berminat untuk healing menikmati pesona pantai di JLS. Boleh minta informasi lengkapnya? ✨';
        }
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);

    // Refresh icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function closeInWebModal() {
    const modal = document.getElementById('inweb-modal');
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function switchModalTab(tabName) {
    const tabs = ['form', 'rute', 'kontak'];
    tabs.forEach(t => {
        const contentEl = document.getElementById(`tab-content-${t}`);
        const btnEl = document.getElementById(`tab-btn-${t}`);
        if (contentEl) {
            if (t === tabName) {
                contentEl.classList.remove('hidden');
            } else {
                contentEl.classList.add('hidden');
            }
        }
        if (btnEl) {
            if (t === tabName) {
                btnEl.classList.add('bg-primary', 'text-white', 'shadow-sm');
                btnEl.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
            } else {
                btnEl.classList.remove('bg-primary', 'text-white', 'shadow-sm');
                btnEl.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
            }
        }
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function submitInWebForm(event) {
    event.preventDefault();
    const name = document.getElementById('modal-name')?.value || 'Teman Healing';
    const topic = document.getElementById('modal-topic')?.value || 'umum';
    const message = document.getElementById('modal-message')?.value || '';

    const formView = document.getElementById('tab-content-form');
    const successView = document.getElementById('modal-success-view');
    const successName = document.getElementById('success-user-name');
    const successTopicInfo = document.getElementById('success-topic-info');

    if (successName) successName.textContent = name;
    
    let infoSnippet = '';
    if (topic === 'rute') {
        infoSnippet = '📍 <strong>Rute Utama:</strong> Kediri ➔ Tulungagung / Blitar ➔ Jalur Lintas Selatan (JLS Lot 6A). Akses jalan full aspal mulus dengan pemandangan tebing dan laut!';
    } else if (topic === 'kuliner') {
        infoSnippet = '🐟 <strong>Kuliner Wajib:</strong> Ikan Bakar Sambal Kecap Pantai Sine, Mie Kepiting Rempah, & Es Teler Kelapa Muda Sunset Gazebo!';
    } else if (topic === 'spot') {
        infoSnippet = '📸 <strong>Spot Aesthetic:</strong> Tebing Pandang Laut JLS, Tikungan Panorama Lot 6A, dan Sunset Point Pantai Pasur!';
    } else {
        infoSnippet = '✨ <strong>Info Wisata:</strong> Pantai JLS buka 24 jam dengan waktu berkunjung terbaik jam 15.00 - 17.30 WIB untuk menikmati momen Sunset!';
    }

    if (successTopicInfo) successTopicInfo.innerHTML = infoSnippet;

    if (formView && successView) {
        formView.classList.add('hidden');
        successView.classList.remove('hidden');
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function resetModalForm() {
    const formView = document.getElementById('tab-content-form');
    const successView = document.getElementById('modal-success-view');
    if (formView && successView) {
        formView.classList.remove('hidden');
        successView.classList.add('hidden');
    }
    const nameInput = document.getElementById('modal-name');
    if (nameInput) nameInput.value = '';
}

// ======================================================
// LIGHTBOX MODAL UNTUK GAMBAR
// ======================================================

function openLightbox(imgSrc, title = '', desc = '', mapQuery = '') {
    const lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) return;

    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbDesc = document.getElementById('lightbox-desc');
    const lbMapBtn = document.getElementById('lightbox-map-btn');

    if (lbImg) lbImg.src = imgSrc;
    if (lbTitle) lbTitle.textContent = title;
    if (lbDesc) lbDesc.textContent = desc;

    if (lbMapBtn) {
        if (mapQuery) {
            let key = 'gemah';
            const qLower = mapQuery.toLowerCase();
            if (qLower.includes('tambakrejo')) key = 'tambakrejo';
            else if (qLower.includes('serang')) key = 'serang';
            else if (qLower.includes('sine')) key = 'sine';
            else if (qLower.includes('pasur') || qLower.includes('molang')) key = 'pasur';
            else if (qLower.includes('bayem') || qLower.includes('klotok')) key = 'bayem';

            lbMapBtn.href = "#";
            lbMapBtn.onclick = (e) => {
                e.preventDefault();
                closeLightbox();
                openOfflineMap(key);
            };
            lbMapBtn.innerHTML = '<i data-lucide="map-pin" class="w-4 h-4 mr-1.5"></i> Peta Offline & Maps';
            lbMapBtn.classList.remove('hidden');
        } else {
            lbMapBtn.classList.add('hidden');
        }
    }

    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        const lbContent = lightbox.querySelector('.lightbox-content');
        if (lbContent) {
            lbContent.classList.remove('scale-95');
            lbContent.classList.add('scale-100');
        }
    }, 10);

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) return;

    const lbContent = lightbox.querySelector('.lightbox-content');
    if (lbContent) {
        lbContent.classList.remove('scale-100');
        lbContent.classList.add('scale-95');
    }
    lightbox.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        lightbox.classList.add('hidden');
    }, 300);
}

// ======================================================
// FAQ ACCORDION TOGGLE
// ======================================================

function toggleFAQ(faqId) {
    const item = document.getElementById(faqId);
    if (!item) return;

    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    const isOpen = !answer.classList.contains('hidden');

    // Tutup FAQ lainnya agar akordeon rapi
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherAnswer && otherIcon) {
            otherAnswer.classList.add('hidden');
            otherIcon.classList.remove('rotate-180');
            otherItem.classList.remove('border-primary', 'bg-primary/[0.02]');
            otherItem.classList.add('border-gray-200/80');
        }
    });

    if (!isOpen) {
        answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        item.classList.add('border-primary', 'bg-primary/[0.02]');
        item.classList.remove('border-gray-200/80');
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

// ======================================================
// UTILITY SALIN TEXT & PETA OFFLINE
// ======================================================

function copyContactText(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btnElement.innerHTML;
        btnElement.innerHTML = '<i data-lucide="check" class="w-4 h-4 inline mr-1"></i> Tersalin!';
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
        setTimeout(() => {
            btnElement.innerHTML = originalHTML;
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin text: ', err);
    });
}

// ======================================================
// DATABASE PETA & RUTE OFFLINE SAGARA (100% OFFLINE)
// ======================================================

const DESTINASI_OFFLINE_MAPS = {
    gemah: {
        title: 'Pantai Gemah Tulungagung',
        region: '📍 Tulungagung • JLS Lot 6',
        distance: '52 km (± 1 Jam 30 Menit dari Kota Kediri)',
        condition: '100% Aspal Mulus & Lebar (Mobil & Bus)',
        price: 'Rp 10.000 / orang',
        hours: '24 Jam (Terbaik 14.30 - 17.30 WIB)',
        coords: '-8.2415, 111.8312',
        image: 'images/pantai_gemah.jpg',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Gemah+Tulungagung',
        steps: [
            'Dari Kota Kediri, ambil arah Selatan menuju Ngantru / Tulungagung (± 25 km).',
            'Ikuti jalan utama Kota Tulungagung menuju arah Selatan (Kecamatan Campurdarat).',
            'Dari Campurdarat, ikuti papan petunjuk arah menuju Gerbang Utama JLS Lot 6.',
            'Masuk Jalur Lintas Selatan (JLS), nikmati tebing dan pemandangan laut (± 10 km).',
            'Pintu gerbang Pantai Gemah berada di sebelah kiri jalan JLS dengan parkir sangat luas.'
        ],
        facilities: ['Parkir Bus & Mobil', 'Sewa ATV & Perahu', 'Resto Ikan Bakar', 'Hutan Pinus Rindang', 'Toilet & Mushola Clean']
    },
    tambakrejo: {
        title: 'Pantai Tambakrejo Blitar',
        region: '📍 Blitar • JLS Pesisir',
        distance: '65 km (± 1 Jam 45 Menit dari Kota Kediri)',
        condition: 'Jalan Utama Pesisir & JLS Mulai Kademangan',
        price: 'Rp 10.000 / orang',
        hours: '24 Jam (TPI Segar Jam 07.00 - 12.00 WIB)',
        coords: '-8.3214, 112.1465',
        image: 'images/pantai_tambakrejo.jpg',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Tambakrejo+Blitar',
        steps: [
            'Dari Kediri, meluncur ke arah Timur Selatan menuju Kota Blitar (via Kras/Srengat).',
            'Dari Kota Blitar, ambil rute Selatan melintasi Jembatan Kademangan.',
            'Ikuti jalur utama menuju Wonotirto dan masuk simpul Jalur Lintas Selatan (JLS Blitar).',
            'Ikuti petunjuk jalan lurus menuju Dermaga & Tempat Pelelangan Ikan (TPI) Tambakrejo.'
        ],
        facilities: ['Tempat Pelelangan Ikan (TPI)', 'Pasir Putih Cantik', 'Sentra Ikan Bakar Khas', 'Perahu Nelayan', 'Parkir Luas']
    },
    serang: {
        title: 'Pantai Serang Blitar',
        region: '📍 Blitar • JLS Pesisir',
        distance: '70 km (± 1 Jam 50 Menit dari Kota Kediri)',
        condition: 'Jalan Aspal Mulus Berbukit & Tepi JLS',
        price: 'Rp 10.000 / orang',
        hours: '24 Jam (Spot Sunset Paling Kejinga)',
        coords: '-8.3512, 112.2154',
        image: 'images/pantai_serang.jpg',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Serang+Blitar',
        steps: [
            'Dari Kota Kediri menuju Kota Blitar via Kras / Srengat (± 35 km).',
            'Dari Blitar Selatan, arahkan kendaraan ke Kademangan - Panggungrejo.',
            'Masuk rute pesisir pantai Serang yang sudah terhubung dengan sirip JLS.',
            'Tiba di kawasan wisata Pantai Serang dengan hamparan cemara udang nan rindang.'
        ],
        facilities: ['Deretan Cemara Udang', 'Spot Sunset Magis', 'Gasebo Lesehan', 'Warung Kelapa Muda', 'Area Camping']
    },
    sine: {
        title: 'Pantai Sine Tulungagung',
        region: '📍 Tulungagung • JLS Lot 6A',
        distance: '58 km (± 1 Jam 35 Menit dari Kota Kediri)',
        condition: 'Jalan Aspal Mulus di Pinggir Tebing JLS',
        price: 'Rp 5.000 - Rp 10.000 / orang',
        hours: '24 Jam (Spot Sunrise & Nelayan)',
        coords: '-8.2611, 111.8921',
        image: 'images/CCC.jpg',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Sine+Tulungagung',
        steps: [
            'Dari Kediri meluncur ke Tulungagung (Kecamatan Kalidawir / Tanggunggunung).',
            'Ikuti jalur utama JLS Lot 6A yang menawarkan tebing laut spektakuler.',
            'Turun sedikit di persimpangan Teluk Sine.',
            'Tiba di Pantai Sine dengan panorama sunrise alami dan perahu warna-warni.'
        ],
        facilities: ['Spot Sunrise Alami', 'Perahu Tradisional Nelayan', 'Kedai Seafood Lesehan', 'Spot foto tebing JLS']
    },
    pasur: {
        title: 'Pantai Pasur & Molang',
        region: '📍 Perbatasan Tulungagung - Blitar • JLS',
        distance: '62 km (± 1 Jam 40 Menit dari Kota Kediri)',
        condition: 'JLS Mulus Berkelok Indah',
        price: 'Rp 5.000 / orang',
        hours: '24 Jam',
        coords: '-8.2988, 111.9641',
        image: 'images/AAA.png',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Pasur+Tulungagung',
        steps: [
            'Dari Kediri menuju Tulungagung atau Blitar Selatan.',
            'Masuk segmen JLS perbatasan Tulungagung-Blitar.',
            'Ikuti petunjuk jalan ke Pantai Pasur / Molang di tepi samudra.',
            'Tiba di pantai eksotis dengan muara sungai dan tebing karang megah.'
        ],
        facilities: ['Tebing Karang Megah', 'Muara Sungai Jernih', 'Pasir Hitam Eksotis', 'Spot Foto Panorama JLS']
    },
    bayem: {
        title: 'Pantai Bayem & Klotok',
        region: '📍 Tulungagung • JLS Pesisir',
        distance: '53 km (± 1 Jam 32 Menit dari Kota Kediri)',
        condition: 'Sangat dekat dari Pantai Gemah di Jalur JLS',
        price: 'Rp 5.000 / orang',
        hours: '24 Jam',
        coords: '-8.2450, 111.8380',
        image: 'images/BBB.jpg',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Bayem+Tulungagung',
        steps: [
            'Ikuti rute ke Pantai Gemah via JLS Tulungagung.',
            'Tepat sebelum/setelah Pantai Gemah, ada persimpangan kecil ke Pantai Bayem & Klotok.',
            'Tiba di tempat yang lebih sepi dan asri untuk bersantai.'
        ],
        facilities: ['Pantai Tenang & Asri', 'Spot Camping', 'Suara Ombak Syahdu', 'Parkir Motor/Mobil']
    }
};

function openOfflineMap(key = 'gemah') {
    const data = DESTINASI_OFFLINE_MAPS[key] || DESTINASI_OFFLINE_MAPS['gemah'];
    const mapModal = document.getElementById('offline-map-modal');
    if (!mapModal) return;

    // Fill elements
    const titleEl = document.getElementById('map-modal-title');
    const regionEl = document.getElementById('map-modal-region');
    const imgEl = document.getElementById('map-modal-img');
    const distEl = document.getElementById('map-modal-distance');
    const condEl = document.getElementById('map-modal-condition');
    const priceEl = document.getElementById('map-modal-price');
    const hoursEl = document.getElementById('map-modal-hours');
    const coordsEl = document.getElementById('map-modal-coords');
    const stepsEl = document.getElementById('map-modal-steps');
    const facsEl = document.getElementById('map-modal-facilities');
    const onlineMapBtn = document.getElementById('map-modal-online-btn');

    if (titleEl) titleEl.textContent = data.title;
    if (regionEl) regionEl.textContent = data.region;
    if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.title;
    }
    if (distEl) distEl.textContent = data.distance;
    if (condEl) condEl.textContent = data.condition;
    if (priceEl) priceEl.textContent = data.price;
    if (hoursEl) hoursEl.textContent = data.hours;
    if (coordsEl) coordsEl.textContent = data.coords;

    if (onlineMapBtn) {
        onlineMapBtn.href = data.googleMapsUrl;
    }

    // Render Steps
    if (stepsEl) {
        stepsEl.innerHTML = data.steps.map((step, idx) => `
            <div class="flex items-start space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span class="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
                <p class="text-xs text-gray-700 leading-relaxed font-medium">${step}</p>
            </div>
        `).join('');
    }

    // Render Facilities
    if (facsEl) {
        facsEl.innerHTML = data.facilities.map(fac => `
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                ✨ ${fac}
            </span>
        `).join('');
    }

    mapModal.classList.remove('hidden');
    setTimeout(() => {
        mapModal.classList.remove('opacity-0', 'pointer-events-none');
        const mapContent = mapModal.querySelector('.map-modal-content');
        if (mapContent) {
            mapContent.classList.remove('scale-95');
            mapContent.classList.add('scale-100');
        }
    }, 10);

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function closeOfflineMap() {
    const mapModal = document.getElementById('offline-map-modal');
    if (!mapModal) return;

    const mapContent = mapModal.querySelector('.map-modal-content');
    if (mapContent) {
        mapContent.classList.remove('scale-100');
        mapContent.classList.add('scale-95');
    }
    mapModal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        mapModal.classList.add('hidden');
    }, 300);
}

