const API_BASE = 'api';
console.log('%c App Logic v5 Loaded ', 'background: #222; color: #bada55');

// Utilities
function showAlert(message, type = 'error') {
    const alertBox = document.getElementById('alertBox');
    if (!alertBox) return; // not all pages have alertBox

    alertBox.textContent = message;
    alertBox.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');

    if (type === 'error') {
        alertBox.classList.add('bg-red-100', 'text-red-700');
    } else {
        alertBox.classList.add('bg-green-100', 'text-green-700');
    }

    alertBox.classList.remove('hidden');
    setTimeout(() => alertBox.classList.add('hidden'), 5000);
}

// Slot Validation & Availability Logic
function getSlotKey(date, time) {
    return `booking_count_${date}_${time}`;
}

function checkSlotAvailability(date, time) {
    const key = getSlotKey(date, time);
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    return count < 10;
}

function incrementSlotCount(date, time) {
    const key = getSlotKey(date, time);
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, (count + 1).toString());
}

function showSlotFullModal(time) {
    // DEBUG: Remove after verification
    console.log('showSlotFullModal called with:', time);

    const existing = document.getElementById('slot-full-modal');
    if (existing) existing.remove();

    // FORCE ALERT FOR DEBUGGING
    alert(`DEBUG: The slot for ${time} is full. You should see a modal next.`);

    const timeClean = (time || '').toLowerCase().trim();
    let message = "This slot is full. Please choose another date or time.";

    if (timeClean === 'evening') {
        message = "The seats are full. You can book tomorrow's slot.";
    } else {
        message = "The seats are full. You can choose the next slot.";
    }

    const modalMarkup = `
    <div id="slot-full-modal" style="position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; animation: fadeIn 0.3s ease-out; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px);">
        <div style="position: relative; width: 100%; max-width: 400px; background: #fff; border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.2); overflow: hidden; animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 1px solid #e2e8f0;">
            <div style="background: #F4F7F0; padding: 2rem; text-align: center;">
                <div style="width: 4rem; height: 4rem; background: #E8EFE0; color: #5A7A3E; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 700; color: #2C3E1F; margin-bottom: 0.5rem; font-family: inherit;">Slot Full</h3>
                <p style="color: #4b5563; margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.5;">${message}</p>
                
                <button onclick="document.getElementById('slot-full-modal').remove(); const t=document.getElementById('preferredTime'); if(t) t.focus();" 
                    style="background: #5A7A3E; color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600; width: 100%; border: none; cursor: pointer; transition: background 0.2s;">
                    Choose Another Slot
                </button>
            </div>
            <button onclick="this.closest('#slot-full-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; color: #9ca3af; background: none; border: none; cursor: pointer;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalMarkup);
}

// Professional Auth Modal
function showAuthModal(message = "Please login or create an account to book a consultation.", title = "Authentication Required") {
    // Remove existing modal if any
    const existing = document.getElementById('auth-modal');
    if (existing) existing.remove();

    const modalMarkup = `
    <div id="auth-modal" style="position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; animation: fade-in 0.3s ease-out; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px);">
        <div style="position: relative; width: 100%; max-width: 420px; background: #fff; border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.2); overflow: hidden; animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
            
            <!-- Close Button -->
            <button onclick="document.getElementById('auth-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: #f3f4f6; border: none; border-radius: 50%; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #4b5563; transition: all 0.2s;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div style="padding: 2.5rem 2rem 2rem;">
                <div style="width: 4rem; height: 4rem; background: #e0f2fe; color: #0284c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                
                <h3 style="font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-bottom: 0.75rem; text-align: center;">${title}</h3>
                <p style="color: #64748b; text-align: center; line-height: 1.6; margin-bottom: 2rem;">${message}</p>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div onclick="window.location.href='login.html?redirect=booking.html'" style="cursor: pointer; display: block; width: 100%; text-align: center; background: #6B8E4A; color: white; padding: 0.875rem; border-radius: 0.75rem; font-weight: 600; text-decoration: none; transition: background 0.2s;">
                        Login
                    </div>
                    <div onclick="window.location.href='login.html?redirect=booking.html#register'" style="cursor: pointer; display: block; width: 100%; text-align: center; background: white; color: #6B8E4A; border: 2px solid #6B8E4A; padding: 0.875rem; border-radius: 0.75rem; font-weight: 600; text-decoration: none; transition: background 0.2s;">
                        Create Account
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalMarkup);
}

// Success Popup with Animations
function showSuccessPopup() {
    console.log('showSuccessPopup function called!'); // Debug log

    // Remove existing popup if any
    const existing = document.getElementById('success-popup-modal');
    if (existing) existing.remove();

    const modalMarkup = `
    <div id="success-popup-modal" style="position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; animation: fadeIn 0.4s ease-out; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px);">
        <div style="position: relative; width: 100%; max-width: 500px; background: linear-gradient(135deg, #ffffff 0%, #f8faf8 100%); border-radius: 2rem; box-shadow: 0 30px 60px -12px rgba(107, 142, 74, 0.4), 0 0 0 1px rgba(107, 142, 74, 0.1); overflow: hidden; animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">
            
            <!-- Confetti Background -->
            <div class="confetti-container" style="position: absolute; inset: 0; overflow: hidden; pointer-events: none;">
                ${Array.from({ length: 30 }, (_, i) => `
                    <div class="confetti" style="
                        position: absolute;
                        width: ${Math.random() * 10 + 5}px;
                        height: ${Math.random() * 10 + 5}px;
                        background: ${['#6B8E4A', '#B8860B', '#4CAF50', '#FFC107', '#FF5722'][Math.floor(Math.random() * 5)]};
                        top: -10%;
                        left: ${Math.random() * 100}%;
                        opacity: ${Math.random() * 0.8 + 0.2};
                        animation: confettiFall ${Math.random() * 3 + 2}s linear infinite;
                        animation-delay: ${Math.random() * 2}s;
                        transform: rotate(${Math.random() * 360}deg);
                    "></div>
                `).join('')}
            </div>

            <!-- Close Button -->
            <button onclick="this.closest('#success-popup-modal').remove()" style="position: absolute; top: 1.5rem; right: 1.5rem; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: rgba(255, 255, 255, 0.9); border: 2px solid #e5e7eb; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; z-index: 10; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>

            <!-- Content -->
            <div style="padding: 3.5rem 2.5rem; text-align: center; position: relative; z-index: 1;">
                
                <!-- Animated Success Icon -->
                <div style="width: 7rem; height: 7rem; background: linear-gradient(135deg, #6B8E4A 0%, #5a7a3d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem auto; box-shadow: 0 15px 35px rgba(107, 142, 74, 0.3), 0 0 0 10px rgba(107, 142, 74, 0.1); animation: successPulse 2s ease-in-out infinite;">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="animation: checkDraw 0.8s ease-out 0.3s both;">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>

                <!-- Thank You Text with Gradient -->
                <h2 style="font-size: 2.75rem; font-weight: 900; background: linear-gradient(135deg, #6B8E4A 0%, #4a6332 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; font-family: inherit; line-height: 1.2; animation: slideUp 0.6s ease-out 0.2s both;">
                    Thank You!
                </h2>

                <!-- Success Badge -->
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 0.75rem 1.5rem; border-radius: 2rem; font-weight: 700; font-size: 1.125rem; margin-bottom: 1.5rem; box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3); animation: slideUp 0.6s ease-out 0.4s both;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Booking Successful
                </div>

                <!-- Message -->
                <p style="color: #4b5563; font-size: 1.125rem; line-height: 1.7; margin-bottom: 2rem; animation: slideUp 0.6s ease-out 0.6s both; max-width: 400px; margin-left: auto; margin-right: auto;">
                    We've received your consultation request and will contact you within <strong style="color: #6B8E4A;">24 hours</strong> to confirm your appointment.
                </p>

                <!-- Action Button -->
                <button onclick="this.closest('#success-popup-modal').remove()" style="background: linear-gradient(135deg, #6B8E4A 0%, #5a7a3d 100%); color: white; padding: 1rem 2.5rem; border-radius: 1rem; font-weight: 700; font-size: 1.125rem; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 25px rgba(107, 142, 74, 0.3); animation: slideUp 0.6s ease-out 0.8s both; width: 100%; max-width: 280px;">
                    Got it, Thanks!
                </button>

                <!-- Email Reminder -->
                <p style="margin-top: 1.5rem; font-size: 0.875rem; color: #9ca3af; animation: slideUp 0.6s ease-out 1s both;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Check your email for confirmation details
                </p>
            </div>
        </div>
    </div>

    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { 
                transform: scale(0.8) translateY(30px); 
                opacity: 0; 
            }
            to { 
                transform: scale(1) translateY(0); 
                opacity: 1; 
            }
        }
        
        @keyframes slideUp {
            from { 
                transform: translateY(20px); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0); 
                opacity: 1; 
            }
        }
        
        @keyframes successPulse {
            0%, 100% { 
                transform: scale(1); 
                box-shadow: 0 15px 35px rgba(107, 142, 74, 0.3), 0 0 0 10px rgba(107, 142, 74, 0.1); 
            }
            50% { 
                transform: scale(1.05); 
                box-shadow: 0 20px 45px rgba(107, 142, 74, 0.4), 0 0 0 15px rgba(107, 142, 74, 0.15); 
            }
        }
        
        @keyframes checkDraw {
            0% { 
                stroke-dasharray: 0, 100; 
                opacity: 0; 
            }
            50% { 
                opacity: 1; 
            }
            100% { 
                stroke-dasharray: 100, 0; 
                opacity: 1; 
            }
        }
        
        @keyframes confettiFall {
            0% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 1; 
            }
            100% { 
                transform: translateY(100vh) rotate(720deg); 
                opacity: 0; 
            }
        }

        #success-popup-modal button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(107, 142, 74, 0.4);
        }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalMarkup);

    // Auto-close after 8 seconds
    setTimeout(() => {
        const modal = document.getElementById('success-popup-modal');
        if (modal) {
            modal.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
        }
    }, 8000);
}

// Auth State Management
async function checkSession() {
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=check_session`, {
            cache: 'no-store'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        localStorage.setItem('userSession', JSON.stringify(data));
        return data;
    } catch (e) {
        console.error("Session check failed", e);
        const fallback = { loggedIn: false };
        localStorage.setItem('userSession', JSON.stringify(fallback));
        return fallback;
    }
}

// Global Language Setter
window.setLanguage = function (lang) {
    if (typeof applyTranslations === 'function') {
        applyTranslations(lang);
        localStorage.setItem('preferredLanguage', lang);
        const display = document.getElementById('currentLangDisplay');
        if (display) display.textContent = lang.toUpperCase();
    } else {
        console.error("applyTranslations not found.");
    }
};

// Consolidated Booking Form Logic
if (document.getElementById('contactForm')) {
    const form = document.getElementById('contactForm');

    // 1. Capture-phase submit listener (Synchronous block)
    form.addEventListener('submit', function (e) {
        // If we haven't verified the session yet, stop everything
        if (form.dataset.authVerified !== 'true') {
            e.preventDefault();
            e.stopPropagation();

            checkSession().then(session => {
                if (session.loggedIn) {
                    form.dataset.authVerified = 'true';
                    // Trigger a click on the submit button to re-trigger the flow
                    const submitBtn = form.querySelector('[type="submit"]');
                    if (submitBtn) submitBtn.click();
                } else {
                    showAuthModal('Booking consultations and accessing services is available only for registered users. Kindly log in to proceed.', 'Please Login First');
                }
            });
            return false;
        }
    }, true);

    // 2. Main submission handler (only runs if authVerified is true)
    form.addEventListener('submit', async (e) => {
        if (form.dataset.authVerified !== 'true') return;

        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Slot Validation
        const pDate = data.preferredDate;
        const pTime = data.preferredTime;
        if (pDate && pTime && typeof checkSlotAvailability === 'function') {
            if (!checkSlotAvailability(pDate, pTime)) {
                if (typeof showSlotFullModal === 'function') showSlotFullModal(pTime);

                const dInput = document.getElementById('preferredDate');
                const tInput = document.getElementById('preferredTime');

                // Visual feedback
                if (dInput) dInput.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                if (tInput) {
                    tInput.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                    tInput.value = ''; // Reset time only
                }

                // Restore styles
                setTimeout(() => {
                    if (dInput) dInput.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                    if (tInput) tInput.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                }, 3000);

                return; // Prevent submission
            }
        }

        // Show loading state on button
        const submitBtn = form.querySelector('[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
        }

        try {
            const res = await fetch(`${API_BASE}/booking.php`, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (result.success) {
                // Professional Success Flow
                if (typeof incrementSlotCount === 'function') incrementSlotCount(data.preferredDate, data.preferredTime);
                showSuccessPopup();
                form.reset();
                form.dataset.authVerified = 'false'; // Reset for next time
            } else {
                console.log('Booking failed:', result.message);
                showAlert(result.message || 'Booking failed.', 'error');
            }
        } catch (error) {
            console.error('Booking error:', error);
            showAlert('Connection error. Please try again.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    });
}

// GLOBAL NAVBAR LOGIC (Inject Login/Logout/Account)
async function updateNavigation() {
    // 1. Try to use cached data first for instant UI
    const cached = localStorage.getItem('userSession');
    if (cached) {
        try {
            renderSessionUI(JSON.parse(cached));
        } catch (e) { }
    }

    // 2. Fetch fresh session and refresh UI
    const session = await checkSession();
    renderSessionUI(session);
}

function renderSessionUI(session) {
    console.log('[Auth] Rendering Session UI:', session);
    const authLinks = document.querySelectorAll('.auth-link');

    // Show/hide the header logout buttons (desktop + mobile)
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    if (session.loggedIn) {
        // --- LOGGED IN ---
        console.log('[Auth] User is logged in. Role:', session.role);

        // Show the logout buttons explicitly
        if (headerLogoutBtn) headerLogoutBtn.style.display = 'inline-flex';
        if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'block';

        // Update each login link to show user info instead
        authLinks.forEach(authLink => {
            // Temporarily disable translation for this element
            if (authLink.hasAttribute('data-key')) {
                authLink.dataset.oldKey = authLink.getAttribute('data-key');
                authLink.removeAttribute('data-key');
            }

            const userText = session.role === 'admin' ? 'Admin Panel' : `Hi, ${session.name || 'User'}`;
            const userLink = session.role === 'admin' ? 'admin_dashboard.html' : 'homepage.html';

            authLink.textContent = userText;
            authLink.href = userLink;
            authLink.style.display = 'block'; // Ensure it's visible
            authLink.classList.remove('text-text-secondary');
            authLink.classList.add('font-medium', 'text-primary');
        });

    } else {
        // --- NOT LOGGED IN ---
        console.log('[Auth] User is NOT logged in.');

        // Hide the logout buttons
        if (headerLogoutBtn) headerLogoutBtn.style.display = 'none';
        if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'none';

        // Restore login links
        authLinks.forEach(authLink => {
            if (authLink.dataset.oldKey) {
                authLink.setAttribute('data-key', authLink.dataset.oldKey);
                delete authLink.dataset.oldKey;
            }

            authLink.textContent = 'Login';
            authLink.href = 'login.html';
            authLink.style.display = 'block'; // Ensure it's visible
            authLink.classList.add('text-text-secondary');
            authLink.classList.remove('font-medium', 'text-primary');
        });
    }

    // Update Language Display in Header
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    const display = document.getElementById('currentLangDisplay');
    if (display) display.textContent = savedLang.toUpperCase();
}

// Intercept all "Book Now" clicks if not logged in
// Intercept all "Book Now" clicks if not logged in
// Intercept all "Book Now" clicks if not logged in
// Intercept all "Book Now" clicks if not logged in
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href') || '';
    const fullHref = target.href || '';

    // [FIX] Priority 1: Always allow login/register links to proceed
    if (fullHref.includes('login.html') || href.includes('login.html')) {
        return;
    }

    // [FIX] Priority 2: Allow anchor links on the same page
    if (href.startsWith('#')) return;

    // [FIX] Priority 3: Intercept ANY navigation to booking.html
    if (fullHref.includes('booking.html') || href === 'booking.html') {
        const isTriggeredByScript = e.isTrusted === false || target.classList.contains('auth-checked');

        if (!target.classList.contains('auth-checked')) {
            e.preventDefault();
            e.stopPropagation();

            checkSession().then(session => {
                if (session.loggedIn) {
                    target.classList.add('auth-checked');
                    target.click(); // Re-trigger click once verified
                } else {
                    showAuthModal('Booking consultations and accessing services is available only for registered users. Kindly log in to proceed.', 'Please Login First');
                }
            });
            return;
        }
    }
}, true); // Use capture phase to intercept before other listeners

// Call on every page load
document.addEventListener('DOMContentLoaded', updateNavigation);


// ADMIN DASHBOARD LOGIC
async function initAdminDashboard() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('dashboardContent');

    // check auth first
    const session = await checkSession();
    if (!session.loggedIn || session.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await fetch(`${API_BASE}/auth.php?action=logout`);
        window.location.href = 'login.html';
    });

    try {
        const res = await fetch(`${API_BASE}/admin_data.php?action=stats`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();

        // Populate Logins
        const loginBody = document.getElementById('loginTableBody');
        loginBody.innerHTML = data.recentLogins.map(l => `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3">${l.name}</td>
                <td class="p-3 text-gray-500">${l.email}</td>
                <td class="p-3 text-sm text-gray-500">${l.login_time}</td>
            </tr>
        `).join('');

        // Populate Orders
        const orderBody = document.getElementById('orderTableBody');
        orderBody.innerHTML = data.recentOrders.map(o => `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3">#${o.id}</td>
                <td class="p-3">${o.name}</td>
                <td class="p-3 font-medium">${o.package_name}</td>
                <td class="p-3 text-green-700">$${o.price}</td>
                <td class="p-3"><span class="px-2 py-1 rounded-full text-xs ${o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">${o.status}</span></td>
                <td class="p-3 text-sm text-gray-500">${o.created_at}</td>
            </tr>
        `).join('');

        // Populate Bookings
        const bookingBody = document.getElementById('bookingTableBody');
        bookingBody.innerHTML = data.recentBookings.map(b => `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3">${b.first_name} ${b.last_name}</td>
                <td class="p-3">${b.inquiry_type}</td>
                <td class="p-3 text-sm">${b.preferred_date} ${b.preferred_time}</td>
                <td class="p-3 text-gray-500">${b.phone}</td>
            </tr>
        `).join('');

        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (e) {
        console.error(e);
        loading.innerHTML = '<p class="text-red-500">Error loading dashboard data.</p>';
    }
}


// PACKAGE "BUY NOW" LOGIC
function attachBuyHandlers() {
    // We look for links with "Book Now" context, but we will target specifically or add onclicks in HTML.
    // Ideally we should modify package.html to have specific classes or IDs.
    // However, I can also add a global handler for now if I modify the HTML.
}

window.buyPackage = async function (packageName, price) {
    // Store selected package details
    localStorage.setItem('selected_package', packageName);
    localStorage.setItem('selected_price', price);

    const session = await checkSession();
    if (session.loggedIn) {
        window.location.href = 'booking.html';
    } else {
        showAuthModal('Accessing wellness packages requires being logged in. Please log in or create an account to proceed.', 'Authentication Required');
    }
}

window.bookTreatment = async function (treatmentName) {
    localStorage.setItem('selected_treatment', treatmentName);
    const session = await checkSession();
    if (session.loggedIn) {
        window.location.href = 'booking.html';
    } else {
        showAuthModal('Accessing specialized treatments requires being logged in. Please log in or create an account to proceed with your booking.', 'Authentication Required');
    }
}

window.bookDosha = async function (doshaName = 'Dosha Assessment') {
    localStorage.setItem('selected_dosha', doshaName);
    const session = await checkSession();
    if (session.loggedIn) {
        window.location.href = 'booking.html';
    } else {
        showAuthModal('To provide a personalized Dosha assessment, we need you to be logged in. Please log in or create an account.', 'Authentication Required');
    }
}
// Final Form Interception Cleanup (Removing redundant listeners if any)
// The logic is now consolidated in the "Consolidated Booking Form Logic" section above.
