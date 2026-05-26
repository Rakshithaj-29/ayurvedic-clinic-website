function renderGlobalHeader(activePage = 'home') {
    const headerHTML = `
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-organic transition-all duration-300" id="mainHeader">
        <nav class="w-full px-4 md:px-6 min-h-[72px] flex items-center">
            <div class="flex items-center justify-between py-2 gap-8 w-full">
                <!-- Logo (Left) -->
                <div class="flex-1 flex items-center justify-start">
                    <a href="index.html" class="flex items-center group cursor-pointer">
                        <div class="bg-white/95 p-1.5 rounded-xl shadow-sm border border-primary-50/50 transition-all group-hover:shadow-md group-hover:scale-105 mr-4">
                            <img src="images/logo1.png" alt="Baira Panditha Naati Vaidyalaya Logo" class="h-12 md:h-[56px] w-auto object-contain block opacity-100">
                        </div>
                        <div>
                            <h1 class="font-headline text-xl font-semibold text-primary" data-key="nav_title">Baira Panditha Naati Vaidyalaya</h1>
                        </div>
                    </a>
                </div>

                <!-- Navigation (Center) -->
                <div class="hidden lg:flex flex-1 justify-center items-center">
                    <div class="flex items-center gap-2">
                        <a href="homepage.html"
                            class="${activePage === 'home' ? 'text-primary font-medium border-b-2 border-primary' : 'text-text-secondary hover:text-primary'} pb-1 px-3 text-lg flex items-center justify-center"
                            style="min-width: 52px; min-height: 52px;">
                            <img src="images/home.png" alt="Home" style="width: 42px; height: 42px; display: block; object-fit: contain;">
                        </a>
                        <!-- About Dropdown -->
                        <div class="relative group">
                            <div class="nav-link-3d ${(activePage === 'about' || activePage === 'about_doctor') ? 'text-primary font-medium border-b-2 border-primary' : 'text-text-secondary hover:text-primary'} transition-colors cursor-pointer flex items-center gap-1 px-3 text-lg">
                                <span data-key="about_menu">About</span>
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                                    stroke-width="2" class="transition-transform group-hover:rotate-180">
                                    <polyline points="4 6 8 10 12 6"></polyline>
                                </svg>
                            </div>
                            <div class="dropdown-menu absolute left-0 top-full pt-2 max-h-0 overflow-hidden opacity-0 invisible pointer-events-none group-hover:max-h-screen group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-50">
                                <div class="w-64 bg-white shadow-2xl rounded-lg py-4 border border-gray-100 flex flex-col space-y-2">
                                    <a href="about_ayurveda.html" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                        <span class="text-sm font-medium text-green-700" data-key="about_ayurveda">About Ayurveda</span>
                                    </a>
                                    <a href="about_ayurveda.html#about-doctor" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <span class="text-sm font-medium text-green-700" data-key="about_doctor">About Doctor</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Treatments Dropdown -->
                        <div class="relative group">
                            <a href="treatments.html"
                                class="nav-link-3d ${activePage === 'treatments' ? 'text-primary font-medium border-b-2 border-primary' : 'text-text-secondary hover:text-primary'} transition-colors cursor-pointer flex items-center gap-1 px-3 text-lg">
                                <span data-key="treatments">Treatments</span>
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                                    stroke-width="2" class="transition-transform group-hover:rotate-180">
                                    <polyline points="4 6 8 10 12 6"></polyline>
                                </svg>
                            </a>
                            <div class="dropdown-menu absolute left-0 top-full pt-2 max-h-0 overflow-hidden opacity-0 invisible pointer-events-none group-hover:max-h-screen group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-50">
                                <div class="w-64 bg-white shadow-2xl rounded-lg py-4 border border-gray-100 flex flex-col space-y-2">
                                    <a href="treatments.html#panchakarma" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/panchakarma.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="panchakarma">Panchakarma</span>
                                    </a>
                                    <a href="treatments.html#polio" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/polio1.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="polio">Polio</span>
                                    </a>
                                    <a href="treatments.html#stroke" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/stroke.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="stroke">Stroke Treatment</span>
                                    </a>
                                    <a href="treatments.html#epilepsy" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/epilepsy1.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="epilepsy">Epilepsy Treatment</span>
                                    </a>
                                    <a href="treatments.html#neuralgia" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/neuron.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="neuralgia">Neuralgia Treatment</span>
                                    </a>
                                    <a href="treatments.html#blood-clots" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/blood.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="blood_clots">Blood Clots Treatment</span>
                                    </a>
                                    <a href="treatments.html#anemia" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/anemia.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="anemia">Anemia Treatment</span>
                                    </a>
                                    <a href="treatments.html#hematuria" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/hematuria.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="hematuria">Hematuria Treatment</span>
                                    </a>
                                    <a href="treatments.html#hand-poisoning" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/poison.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="hand_poisoning">Hand Poisoning Treatment</span>
                                    </a>
                                    <a href="treatments.html#rickets" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/rickets.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="childhood_rickets">Childhood Rickets Treatment</span>
                                    </a>
                                    <a href="treatments.html#gynecological" class="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors">
                                        <img src="images/gynaecological.png" class="w-4 h-5 object-contain" alt="">
                                        <span class="text-sm font-medium text-green-700" data-key="gynecological_diseases">Gynecological Diseases</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <a href="packages.html"
                            class="nav-link-3d ${activePage === 'packages' ? 'text-primary font-medium border-b-2 border-primary' : 'text-text-secondary hover:text-primary'} transition-colors px-3 text-lg"
                            data-key="packages">Packages</a>
                        <a href="facilities.html"
                            class="nav-link-3d ${activePage === 'facilities' ? 'text-primary font-medium border-b-2 border-primary' : 'text-text-secondary hover:text-primary'} transition-colors px-3 text-lg"
                            data-key="facilities">Facilities</a>
                        <a href="contact.html"
                            class="nav-link-3d ${activePage === 'contact' ? 'text-primary font-medium border-b-2 border-primary' : 'text-text-secondary hover:text-primary'} transition-colors px-3 text-lg"
                            data-key="contact">Contact</a>
                    </div>
                </div>

                <!-- Right Side (Login / Logout & CTA) -->
                <div class="hidden lg:flex flex-1 justify-end items-center gap-4 xl:gap-8 flex-wrap" id="auth-nav-container">
                    <div class="relative group">
                        <button class="nav-link-3d text-text-secondary hover:text-primary transition-colors flex items-center gap-1 text-lg">
                            <span id="currentLangDisplay">EN</span>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                                stroke-width="2" class="transition-transform group-hover:rotate-180">
                                <polyline points="4 6 8 10 12 6"></polyline>
                            </svg>
                        </button>
                        <div class="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div class="min-w-[8rem] w-auto bg-white shadow-xl rounded-lg py-2 border border-gray-100 flex flex-col">
                                <button onclick="setLanguage('en')" class="px-4 py-2 text-sm text-left hover:bg-primary-50 transition-colors lang-option" data-lang="en">English</button>
                                <button onclick="setLanguage('kn')" class="px-4 py-2 text-sm text-left hover:bg-primary-50 transition-colors lang-option" data-lang="kn">ಕನ್ನಡ</button>
                                <button onclick="setLanguage('ml')" class="px-4 py-2 text-sm text-left hover:bg-primary-50 transition-colors lang-option" data-lang="ml">മലയാളം</button>
                            </div>
                        </div>
                    </div>

                    <a href="login.html" class="nav-link-3d text-text-secondary hover:text-primary transition-colors text-lg auth-link" data-key="login">Login</a>

                    <button id="headerLogoutBtn" onclick="handleHeaderLogout()" style="display:none" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span data-key="log_out">Logout</span>
                    </button>

                    <a href="booking.html" class="btn btn-primary py-3 px-4 text-lg h-auto min-h-[48px] text-center" data-key="book_consultation">Book Consultation</a>
                </div>

                <!-- Mobile Menu Button -->
                <button id="mobileMenuBtn" class="lg:hidden p-2 text-primary hover:bg-primary-50 rounded-lg transition-colors" aria-label="Toggle mobile menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden lg:hidden pb-4">
                <div class="flex flex-col gap-4">
                    <a href="homepage.html" class="flex items-center ${activePage === 'home' ? 'text-primary font-medium border-l-4 border-primary' : 'text-text-secondary hover:text-primary'} py-2 pl-4 transition-colors" style="min-height: 40px;">
                        <img src="images/home.png" alt="Home" style="width: 24px; height: 24px; display: block; object-fit: contain;">
                    </a>
                    <a href="about_ayurveda.html" class="${activePage === 'about' ? 'text-primary font-medium border-l-4 border-primary' : 'text-text-secondary hover:text-primary'} py-2 pl-4 transition-colors" data-key="about_ayurveda">About Ayurveda</a>
                    <a href="about_ayurveda.html#about-doctor" class="${activePage === 'about_doctor' ? 'text-primary font-medium border-l-4 border-primary' : 'text-text-secondary hover:text-primary'} py-2 pl-4 transition-colors" data-key="about_doctor">About Doctor</a>
                    <a href="treatments.html" class="${activePage === 'treatments' ? 'text-primary font-medium border-l-4 border-primary' : 'text-text-secondary hover:text-primary'} py-2 pl-4 transition-colors" data-key="treatments">Treatments</a>
                    <a href="packages.html" class="${activePage === 'packages' ? 'text-primary font-medium border-l-4 border-primary' : 'text-text-secondary hover:text-primary'} py-2 pl-4 transition-colors" data-key="packages">Packages</a>
                    <a href="facilities.html" class="${activePage === 'facilities' ? 'text-primary font-medium border-l-4 border-primary' : 'text-text-secondary hover:text-primary'} py-2 pl-4 transition-colors" data-key="facilities">Facilities</a>
                    <a href="contact.html" class="${activePage === 'contact' ? 'text-primary font-medium border-l-4 border-primary' : 'text-text-secondary hover:text-primary'} py-2 pl-4 transition-colors" data-key="contact">Contact</a>
                    <a href="login.html" class="text-text-secondary hover:text-primary py-2 pl-4 transition-colors auth-link" data-key="login">Login</a>
                    <button id="mobileLogoutBtn" onclick="handleHeaderLogout()" style="display:none" class="text-left text-primary-700 hover:text-primary py-2 pl-4 transition-colors font-semibold" data-key="log_out">Logout</button>
                    <a href="booking.html" class="btn btn-primary w-full mt-2" data-key="book_consultation">Book Consultation</a>
                </div>
            </div>
        </nav>
    </header>
    `;

    document.getElementById('header-placeholder').innerHTML = headerHTML;

    // Header scroll effect
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('shadow-organic');
        } else {
            header.classList.remove('shadow-organic');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }



    // Apply translations to the newly injected header
    if (typeof applyTranslations === 'function') {
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        applyTranslations(savedLang);
    }
}

// Kept for backwards compatibility but logic is now in app_logic_v5.js renderSessionUI()
function checkAuthStatus() {
    // No-op: auth state management delegated to renderSessionUI() in app_logic_v5.js
}

async function handleHeaderLogout() {
    try {
        await fetch('api/auth.php?action=logout');
    } catch (e) {
        console.error('Logout error:', e);
    }
    window.location.href = 'homepage.html';
}


