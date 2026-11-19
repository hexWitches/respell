/**
 * PugliaSalute Redesign Prototype - Interactive Logic (Strict Wireframe v1 Edition)
 */

// Application State
const state = {
  version: 'v2', // Disponibilità & Calendario
  currentScreen: 'screen-home',
  user: {
    name: 'MIRIANA PINTO',
    cf: 'PNTMRN90A41A662K',
    phone: '+39 340 1234567',
    email: 'miriana.pinto@email.it'
  },
  wizard: {
    beneficiary: null,
    delegateName: '',
    delegateCF: '',
    regime: null,
    selectedExam: null,
    selectedExamCode: '',
    selectedSlot: null,
    cupCode: '2026649029',
    privacyAccepted: false,
    privacyScrolled: false
  },
  bookingFilters: {
    year: '',
    azienda: '',
    status: ''
  },
  bookings: [
    // Gruppo 1: Prenotate da pagare e da effettuare (cronologico decrescente)
    {
      id: '2026409823',
      date: '28/12/2026',
      time: '09:15',
      dateTime: '28/12/2026 Ore 09:15',
      exam: 'VISITA OCULISTICA (PRIMA VISITA)',
      hospital: 'OSPEDALE SAN PAOLO - BARI',
      azienda: 'ASL Bari',
      bookingType: 'SSN Ricetta Dematerializzata',
      cancelDeadline: '24/12/2026',
      status: 'Da pagare da effettuare'
    },
    // Gruppo 2: Pagate da effettuare (dalla più vicina alla più lontana)
    {
      id: '2026841102',
      date: '24/11/2026',
      time: '10:30',
      dateTime: '24/11/2026 Ore 10:30',
      exam: 'VISITA CARDIOLOGICA CON ECG',
      hospital: 'POLICLINICO DI BARI - ASCLEPIOS',
      azienda: 'ASL Bari',
      bookingType: 'SSN Ricetta Dematerializzata',
      cancelDeadline: '22/11/2026',
      status: 'Pagato da effettuare'
    },
    {
      id: '2026955318',
      date: '02/12/2026',
      time: '11:15',
      dateTime: '02/12/2026 Ore 11:15',
      exam: 'ECOGRAFIA ADDOME COMPLETO',
      hospital: 'OSPEDALE ANTONIO PERRINO - BRINDISI',
      azienda: 'ASL Brindisi',
      bookingType: 'SSN Ricetta Dematerializzata',
      cancelDeadline: '30/11/2026',
      status: 'Pagato da effettuare'
    },
    {
      id: '2026338871',
      date: '18/12/2026',
      time: '08:45',
      dateTime: '18/12/2026 Ore 08:45',
      exam: 'GLUCOSIO DOSAGGIO SERIALE (CURVA DA CARICO)',
      hospital: 'OSPEDALE LORENZO BONOMO - ANDRIA',
      azienda: 'ASL Barletta-Andria-Trani',
      bookingType: 'SSN Ricetta Dematerializzata',
      cancelDeadline: '16/12/2026',
      status: 'Pagato da effettuare'
    },
    // Gruppo 3: Pagate ed effettuate (cronologico decrescente)
    {
      id: '2026512994',
      date: '15/10/2026',
      time: '15:30',
      dateTime: '15/10/2026 Ore 15:30',
      exam: 'RISONANZA MAGNETICA (RM) ENCEFALO',
      hospital: 'OSPEDALE VITO FAZZI - LECCE',
      azienda: 'ASL Lecce',
      bookingType: 'SSN Ricetta Dematerializzata',
      cancelDeadline: '13/10/2026',
      status: 'Effettuato pagato'
    },
    {
      id: '2026699059',
      date: '18/08/2026',
      time: '08:15',
      dateTime: '18/08/2026 Ore 08:15',
      exam: 'PROTEINE [S]',
      hospital: 'OSPEDALE CIVILE - MARTINA FRANCA',
      azienda: 'ASL Taranto',
      bookingType: 'SSN con Ricetta Rossa',
      cancelDeadline: '',
      status: 'Effettuato pagato'
    },
    {
      id: '2025730476',
      date: '01/09/2025',
      time: '09:30',
      dateTime: '01/09/2025 Ore 09:30',
      exam: 'ASPARTATO AMINOTRANSFERASI (AST) (GOT) [S]',
      hospital: 'OSPEDALE CIVILE - MARTINA FRANCA',
      azienda: 'ASL Taranto',
      bookingType: 'SSN con Ricetta Rossa',
      cancelDeadline: '-',
      status: 'Effettuato pagato'
    },
    {
      id: '2025184209',
      date: '14/05/2025',
      time: '11:00',
      dateTime: '14/05/2025 Ore 11:00',
      exam: 'VISITA DERMATOLOGICA',
      hospital: 'POLICLINICO RIUNITI - FOGGIA',
      azienda: 'ASL Foggia',
      bookingType: 'SSN con Ricetta Rossa',
      cancelDeadline: '-',
      status: 'Effettuato pagato'
    }
  ]
};

// Appointment slots from the fake repository (prototype/js/fake-repository.js)
function getRepositorySlots() {
  if (typeof window !== 'undefined' && Array.isArray(window.fakeAvailabilities) && window.fakeAvailabilities.length > 0) {
    return window.fakeAvailabilities;
  }
  return [];
}

// Helper for prototype stub actions
function showNotImplemented() {
  alert('Questa funzione non è implementata in questo prototipo.');
}

// Accessibility Font Resizer (Wireframe Top Red Bar: A-, A+)
function setFontSize(size) {
  const alreadyActive = document.documentElement.classList.contains('font-' + size);
  document.documentElement.classList.remove('font-sm', 'font-md', 'font-lg');
  const btnSm = document.getElementById('btnFontSm');
  const btnLg = document.getElementById('btnFontLg');

  if (btnSm) btnSm.classList.remove('active');
  if (btnLg) btnLg.classList.remove('active');

  if (!alreadyActive) {
    if (size === 'sm') {
      document.documentElement.classList.add('font-sm');
      if (btnSm) btnSm.classList.add('active');
    } else if (size === 'lg') {
      document.documentElement.classList.add('font-lg');
      if (btnLg) btnLg.classList.add('active');
    }
  }
}

// Brand Logo Click Behavior
function handleBrandClick() {
  if (state.currentScreen === 'screen-home') {
    goToScreen('screen-home');
  } else {
    goToScreen('screen-fse');
  }
}

// Logout Behavior: Returns from authenticated FSE services back to public portal
function logoutToHome() {
  closeUserMenu();
  goToScreen('screen-home');
}

// Login to FSE from screen-login or hero button
function loginToFSE(method) {
  // Navigate directly to Personal Area (FSE)
  goToScreen('screen-fse');
}

// Start New Booking from success page or menu: resets wizard state
function startNewBooking() {
  state.wizard = {
    editingBookingId: null,
    isModification: false,
    beneficiary: null,
    delegateName: '',
    delegateCF: '',
    regime: null,
    selectedExam: null,
    selectedExamCode: '',
    selectedSlot: null,
    cupCode: '2026649029',
    privacyAccepted: false,
    privacyScrolled: false
  };

  const bMe = document.getElementById('choiceBeneficiaryMe');
  const bOther = document.getElementById('choiceBeneficiaryOther');
  if (bMe) { bMe.classList.remove('selected'); bMe.setAttribute('aria-checked', 'false'); }
  if (bOther) { bOther.classList.remove('selected'); bOther.setAttribute('aria-checked', 'false'); }

  const rSSN = document.getElementById('choiceRegimeSSN');
  const rALPI = document.getElementById('choiceRegimeALPI');
  if (rSSN) { rSSN.classList.remove('selected'); rSSN.setAttribute('aria-checked', 'false'); }
  if (rALPI) { rALPI.classList.remove('selected'); rALPI.setAttribute('aria-checked', 'false'); }

  const p1 = document.getElementById('prescCard1');
  const p2 = document.getElementById('prescCard2');
  if (p1) p1.classList.remove('selected');
  if (p2) p2.classList.remove('selected');

  const chkNote = document.getElementById('checkNoteOperatore');
  const chkPriv = document.getElementById('checkPrivacyConsent');
  if (chkNote) chkNote.checked = false;
  if (chkPriv) {
    chkPriv.checked = false;
    chkPriv.disabled = false;
    chkPriv.style.cursor = 'pointer';
  }
  clearStep1Errors();
  clearStep2Errors();
  clearStep3Errors();
  clearStep4Errors();
  clearStep5ConsentErrors();

  const step3Email = document.getElementById('inputEmail');
  const step3Phone = document.getElementById('inputPhone');
  if (step3Email) step3Email.value = (typeof userContacts !== 'undefined' && userContacts.email) ? userContacts.email : (state.user.email || 'miriana.pinto@email.it');
  if (step3Phone) step3Phone.value = (typeof userContacts !== 'undefined' && userContacts.cellulare) ? userContacts.cellulare : (state.user.phone || '+39 340 1234567');

  const detailsDropdown = document.getElementById('step4RecipeDetailsDropdown');
  const detailsText = document.getElementById('btnToggleRecipeDetailsText');
  const detailsCaret = document.getElementById('recipeDetailsCaret');
  if (detailsDropdown) detailsDropdown.style.display = 'none';
  if (detailsText) detailsText.innerText = 'Vedi Dettagli';
  if (detailsCaret) detailsCaret.style.transform = 'rotate(0deg)';

  const modBanner = document.getElementById('step4ModificationBanner');
  if (modBanner) modBanner.style.display = 'none';

  resetStep4Filters();

  goToScreen('screen-step-beneficiary');
}

// Navigazione tasto "Indietro" su Step 4
function step4GoBack() {
  if (state.wizard && state.wizard.isModification) {
    goToScreen('screen-bookings');
  } else {
    goToScreen('screen-step-prescription');
  }
}

// Screen Router
function goToScreen(screenId) {
  state.currentScreen = screenId;

  // Hide all screens
  document.querySelectorAll('.wireframe-screen').forEach(s => s.classList.remove('active'));

  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Header and title area updates based on screen
  updatePageHeader(screenId);
}

function updatePageHeader(screenId) {
  const heading = document.getElementById('pageMainHeading');
  const subtitleContainer = document.getElementById('stepSubtitleContainer');
  const stepper = document.getElementById('wizardStepper');
  const breadcrumb = document.getElementById('breadcrumbText');
  const pageTopZone = document.getElementById('pageTopZone');

  // Top Window Bar & Header Elements
  const topWindowBar = document.querySelector('.top-window-bar');
  const topBarBreadcrumb = document.getElementById('topBarBreadcrumbText');
  const brandPublic = document.getElementById('brandPublic');
  const brandFSE = document.getElementById('brandFSE');
  const headerFseLinks = document.getElementById('headerFseLinks');
  const btnHeaderSearch = document.getElementById('btnHeaderSearch');
  const subNavbarBar = document.getElementById('subNavbarBar');

  const navLinkFsePrenotazioni = document.getElementById('navLinkFsePrenotazioni');
  const navLinkFseAssistenza = document.getElementById('navLinkFseAssistenza');

  // Reset
  if (subtitleContainer) subtitleContainer.style.display = 'none';
  if (stepper) stepper.style.display = 'none';
  if (breadcrumb) breadcrumb.style.display = 'none';

  // Always keep Top Red Window Bar with breadcrumbs and font resizer visible across both Public and FSE
  if (topWindowBar) topWindowBar.style.display = 'flex';

  // Reset torna indietro and chiudi for non-wizard screens
  if (!screenId.startsWith('screen-step-')) {
    const tornaContainer = document.getElementById('tornaIndietroContainer');
    if (tornaContainer) tornaContainer.style.display = 'none';
    const tornaBtn = document.getElementById('btnTornaIndietro');
    if (tornaBtn) tornaBtn.style.display = 'none';
    const chiudiBtn = document.getElementById('btnChiudiWizard');
    if (chiudiBtn) chiudiBtn.style.display = 'none';
  }

  if (screenId === 'screen-home') {
    // Portale Pubblico (Matching media_1794782458951_fc4d4c90.png)
    if (topBarBreadcrumb) topBarBreadcrumb.innerHTML = 'REGIONE PUGLIA / SALUTE, SPORT E BUONA VITA / PUGLIASALUTE';
    if (brandPublic) brandPublic.style.display = 'flex';
    if (brandFSE) brandFSE.style.display = 'none';
    if (headerFseLinks) headerFseLinks.style.display = 'none';
    if (btnHeaderSearch) btnHeaderSearch.style.display = 'flex';
    if (subNavbarBar) subNavbarBar.style.display = 'block';
    if (pageTopZone) pageTopZone.style.display = 'none';

    const contentZone = document.querySelector('.page-content-zone');
    if (contentZone) contentZone.style.backgroundColor = '#FFFFFF';
  } else if (screenId === 'screen-login') {
    // Accesso FSE
    if (topBarBreadcrumb) topBarBreadcrumb.innerHTML = 'REGIONE PUGLIA / SALUTE, SPORT E BUONA VITA / PUGLIASALUTE / FASCICOLO SANITARIO ELETTRONICO';
    if (brandPublic) brandPublic.style.display = 'flex';
    if (brandFSE) brandFSE.style.display = 'none';
    if (headerFseLinks) headerFseLinks.style.display = 'none';
    if (btnHeaderSearch) btnHeaderSearch.style.display = 'flex';
    if (subNavbarBar) subNavbarBar.style.display = 'block';
    if (pageTopZone) pageTopZone.style.display = 'none';

    const contentZone = document.querySelector('.page-content-zone');
    if (contentZone) contentZone.style.backgroundColor = '#FFFFFF';
  } else {
    // Area Autenticata FSE (Matching Wireframe Reference 1-8)
    if (topBarBreadcrumb) topBarBreadcrumb.innerHTML = 'REGIONE PUGLIA / SALUTE, SPORT E BUONA VITA / PUGLIASALUTE / FASCICOLO SANITARIO ELETTRONICO';
    if (brandPublic) brandPublic.style.display = 'none';
    if (brandFSE) brandFSE.style.display = 'flex';
    if (headerFseLinks) headerFseLinks.style.display = 'flex';
    if (btnHeaderSearch) btnHeaderSearch.style.display = 'none';
    if (subNavbarBar) subNavbarBar.style.display = 'none';

    const contentZone = document.querySelector('.page-content-zone');
    if (contentZone) contentZone.style.backgroundColor = 'var(--ps-bg-bottom-ice)';

    if (navLinkFseAssistenza) navLinkFseAssistenza.classList.remove('active');
    if (navLinkFsePrenotazioni) navLinkFsePrenotazioni.classList.remove('active');

    if (screenId === 'screen-fse') {
      if (pageTopZone) pageTopZone.style.display = 'none'; // Area Personale has its own header
    } else if (screenId === 'screen-profilo-sanitario') {
      if (pageTopZone) pageTopZone.style.display = 'none'; // Profilo sanitario has its own header
    } else if (screenId === 'screen-bookings') {
      if (navLinkFsePrenotazioni) navLinkFsePrenotazioni.classList.add('active');
      if (pageTopZone) pageTopZone.style.display = 'none'; // Le mie prenotazioni has its own header
      renderBookings();
    } else if (screenId === 'screen-assistenza') {
      if (navLinkFseAssistenza) navLinkFseAssistenza.classList.add('active');
      if (pageTopZone) pageTopZone.style.display = 'none'; // Assistenza has its own header
    } else if (screenId.startsWith('screen-step-')) {
      const isMod = Boolean(state.wizard && state.wizard.isModification);
      if (navLinkFsePrenotazioni) navLinkFsePrenotazioni.classList.add('active');
      if (pageTopZone) pageTopZone.style.display = 'block';
      if (heading) heading.innerText = isMod ? 'Modifica data prenotazione' : 'Nuova prenotazione';
      if (stepper) stepper.style.display = 'flex';

      if (breadcrumb) {
        breadcrumb.style.display = 'flex';
        breadcrumb.innerHTML = `
          <a onclick="goToScreen('screen-home')">PugliaSalute</a>
          <span class="breadcrumb-sep">/</span>
          <a onclick="goToScreen('screen-fse')">Fascicolo Sanitario Elettronico</a>
          <span class="breadcrumb-sep">/</span>
          <a onclick="goToScreen('screen-bookings')">Le mie prenotazioni</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${isMod ? 'Modifica data prenotazione' : 'Nuova prenotazione'}</span>
        `;
      }

      const stepMap = {
        'screen-step-beneficiary': 1,
        'screen-step-regime': 2,
        'screen-step-prescription': 3,
        'screen-step-slots': 4,
        'screen-step-recap': 5,
        'screen-step-success': 6
      };

      const stepNum = stepMap[screenId] || 1;

      // Aggiornamento Stepper con checkmark SVG circolare
      updateStepperProgress(stepNum);

      // Mostra "Torna indietro" su tutti i passi wizard (Step 1-6)
      updateTornaIndietro(screenId);

      if (screenId === 'screen-step-prescription') {
        const step3Email = document.getElementById('inputEmail');
        const step3Phone = document.getElementById('inputPhone');
        if (step3Email && (!step3Email.value || step3Email.value.trim() === '')) {
          step3Email.value = (typeof userContacts !== 'undefined' && userContacts.email) ? userContacts.email : (state.user.email || 'miriana.pinto@email.it');
        }
        if (step3Phone && (!step3Phone.value || step3Phone.value.trim() === '')) {
          step3Phone.value = (typeof userContacts !== 'undefined' && userContacts.cellulare) ? userContacts.cellulare : (state.user.phone || '+39 340 1234567');
        }
      } else if (screenId === 'screen-step-slots') {
        updateStep4RecipeDetails();
        renderSlots();

        const modBanner = document.getElementById('step4ModificationBanner');
        if (modBanner) {
          modBanner.style.display = isMod ? 'flex' : 'none';
        }
      } else if (screenId === 'screen-step-recap') {
        updateRecapStep();
      } else if (screenId === 'screen-step-success') {
        updateSuccessStep();
      }
    } else if (screenId === 'screen-spec-guide') {
      if (topWindowBar) topWindowBar.style.display = 'flex';
      if (pageTopZone) pageTopZone.style.display = 'block';
      if (breadcrumb) {
        breadcrumb.style.display = 'flex';
        breadcrumb.innerHTML = `
          <a onclick="goToScreen('screen-home')">PugliaSalute</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Specifiche Componenti</span>
        `;
      }
      if (heading) heading.innerText = 'Design System & Componenti';
    }
  }
}

// Stepper Progress: Dark Navy active, completed has circle checkmark icon
function updateStepperProgress(currentStepNum) {
  for (let i = 1; i <= 6; i++) {
    const stepEl = document.getElementById(`stepperStep${i}`);
    if (!stepEl) continue;

    const baseName = stepEl.dataset.baseName;
    stepEl.classList.remove('active', 'completed');

    if (i < currentStepNum) {
      // Passo completato: colore differente + aggiunta icona SVG cerchio con spunta
      stepEl.classList.add('completed');
      stepEl.innerHTML = `<span>${baseName}</span> <svg class="stepper-check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="16 9 10 15 7 12"></polyline></svg>`;
    } else if (i === currentStepNum) {
      // Passo corrente: Dark Navy solido con testo bianco
      stepEl.classList.add('active');
      stepEl.innerText = baseName;
    } else {
      // Passi futuri: colore base neutro
      stepEl.innerText = baseName;
    }
  }
}

// ==============================================================================
// ORDINAMENTO E RENDER DELLE PRENOTAZIONI PERSONALI
// ==============================================================================

// Priorità gruppi di stato:
// 1: Prenotate da pagare e da effettuare
// 2: Pagate da effettuare
// 3: Pagate ed effettuate
function getBookingStatusPriority(b) {
  if (!b || !b.status) return 99;
  const s = b.status.toLowerCase();

  // 1. Prenotate da pagare e da effettuare
  if (s.includes('da pagare') || s.includes('confermat')) {
    return 1;
  }
  // 2. Pagate da effettuare
  if (s.includes('pagato da effettuare') || (s.includes('pagat') && s.includes('da effettuare'))) {
    return 2;
  }
  // 3. Pagate ed effettuate
  if (s.includes('effettuat')) {
    return 3;
  }
  return 4;
}

// Timestamp per ordinamento cronologico (dalla più recente alla più vecchia)
function getBookingTimestamp(b) {
  if (!b) return 0;
  if (b.date) {
    const parts = b.date.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      let hours = 0;
      let minutes = 0;
      if (b.time) {
        const timeParts = b.time.split(':');
        if (timeParts.length >= 2) {
          hours = parseInt(timeParts[0], 10);
          minutes = parseInt(timeParts[1], 10);
        }
      }
      const d = new Date(year, month, day, hours, minutes, 0);
      if (!isNaN(d.getTime())) return d.getTime();
    }
  }
  const fallback = parseSlotDate(b.date || b.dateTime);
  return fallback ? fallback.getTime() : 0;
}

// Comparatore:
// 1. Gruppo di stato prima (1: Da pagare da effettuare -> 2: Pagato da effettuare -> 3: Effettuato pagato)
// 2. Per le prenotazioni da effettuare (Gruppi 1 e 2): ordine cronologico crescente (la data più prossima per prima)
// 3. Per lo storico delle prenotazioni già effettuate (Gruppo 3): ordine cronologico decrescente (la più recente per prima)
function compareBookings(a, b) {
  const pA = getBookingStatusPriority(a);
  const pB = getBookingStatusPriority(b);

  if (pA !== pB) {
    return pA - pB;
  }

  const timeA = getBookingTimestamp(a);
  const timeB = getBookingTimestamp(b);

  if (pA <= 2) {
    return timeA - timeB;
  }
  return timeB - timeA;
}

// Render Bookings List (Matching Image 6)
function renderBookings() {
  const container = document.getElementById('bookingsWireframeList');
  if (!container) return;

  const filters = state.bookingFilters || { year: '', azienda: '', status: '' };
  const hasActiveFilters = Boolean(filters.year || filters.azienda || filters.status);

  // Aggiorna l'indicatore dei filtri attivi nella toolbar
  updateActiveFilterIndicator(hasActiveFilters, filters);

  const filteredBookings = state.bookings.filter(b => {
    // Filtro per Anno
    if (filters.year) {
      const matchYear = (b.date && b.date.includes(filters.year)) || (b.dateTime && b.dateTime.includes(filters.year));
      if (!matchYear) return false;
    }
    // Filtro per Azienda
    if (filters.azienda) {
      if (b.azienda !== filters.azienda) return false;
    }
    // Filtro per Stato
    if (filters.status) {
      if (b.status !== filters.status) return false;
    }
    return true;
  });

  // Ordinamento:
  // 1. Prima quelle prenotate da pagare e da effettuare
  // 2. Poi quelle pagate da effettuare
  // 3. Infine quelle pagate ed effettuate
  // All'interno dei gruppi da effettuare (1 e 2): in ordine cronologico (la più vicina per prima)
  // All'interno dello storico (3): in ordine cronologico decrescente (la più recente per prima)
  filteredBookings.sort(compareBookings);

  if (filteredBookings.length === 0) {
    container.innerHTML = `
      <div style="background: white; border: 1px dashed var(--ps-border-color); padding: 40px 20px; text-align: center; color: var(--ps-text-muted); border-radius: 4px;">
        <p style="font-size: 1.05rem; font-weight: 700; color: var(--ps-wireframe-navy); margin-bottom: 8px;">
          ${hasActiveFilters ? 'Nessuna prenotazione trovata per i filtri selezionati' : 'Nessuna prenotazione presente'}
        </p>
        <p style="font-size: 0.88rem; margin-bottom: 16px;">
          ${hasActiveFilters ? 'Prova a modificare o resettare i filtri impostati per visualizzare le altre prenotazioni.' : 'Non ci sono prenotazioni registrate nel tuo fascicolo.'}
        </p>
        ${hasActiveFilters ? '<button type="button" class="btn-filter-outline" onclick="resetBookingFilters()">Resetta tutti i filtri</button>' : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = filteredBookings.map(b => `
    <div class="booking-row-card">
      <div class="booking-details-grid-v2">
        <div class="booking-grid-col">
          <div class="booking-detail-row">
            <span class="booking-detail-label">Sede appuntamento</span>
            <span class="booking-detail-value">${b.hospital}${b.azienda ? ` <span style="font-size: 0.8rem; color: #64748B; font-weight: 600;">(${b.azienda})</span>` : ''}</span>
          </div>
          <div class="booking-detail-row">
            <span class="booking-detail-label">Tipo di prenotazione</span>
            <span class="booking-detail-value">${b.bookingType}</span>
          </div>
          <div class="booking-detail-row">
            <span class="booking-detail-label">Prestazione</span>
            <span class="booking-detail-value">${b.exam}</span>
          </div>
          <div class="booking-detail-row">
            <span class="booking-detail-label">Data Utile Disdetta</span>
            <span class="booking-detail-value">${b.cancelDeadline || '-'}</span>
          </div>
        </div>

        <div class="booking-grid-col">
          <div class="booking-detail-row">
            <span class="booking-detail-label">Data e ora</span>
            <span class="booking-detail-value">${b.dateTime}</span>
          </div>
          <div class="booking-detail-row">
            <span class="booking-detail-label">Numero di prenotazione</span>
            <span class="booking-detail-value" style="font-family: monospace;">${b.id}</span>
          </div>
          <div class="booking-detail-row">
            <span class="booking-detail-label">Stato</span>
            <span class="booking-detail-value">${b.status}</span>
          </div>
        </div>
      </div>

      <div class="booking-row-actions-new">
        <div class="booking-actions-left">
          <button class="btn-booking-action" onclick="modifyBooking('${b.id}')">Modifica</button>
          <button class="btn-booking-action" onclick="cancelBooking('${b.id}')">Disdici</button>
        </div>
        <a class="link-vedi-dettagli" onclick="showNotImplemented()">Vedi Dettagli &rarr;</a>
      </div>
    </div>
  `).join('');
}

// Modifica data prenotazione: invia l'utente allo Step 4 per cambiare la data
function modifyBooking(id) {
  const booking = state.bookings.find(b => b.id === id);
  if (!booking) return;

  // Inizializza il wizard con i dati della prenotazione esistente
  state.wizard = {
    editingBookingId: booking.id,
    isModification: true,
    beneficiary: 'me',
    delegateName: '',
    delegateCF: '',
    regime: (booking.bookingType && booking.bookingType.includes('Rossa')) ? 'alpi' : 'ssn',
    selectedExam: 'cardio',
    selectedExamCode: (booking.bookingType && booking.bookingType.includes('Rossa')) ? '160A24680453583' : '160A37295673820',
    exam: booking.exam,
    examCode: '160A37295673820',
    selectedSlot: null,
    cupCode: booking.id,
    originalDate: booking.date,
    originalTime: booking.time,
    originalHospital: booking.hospital,
    originalAzienda: booking.azienda || '',
    privacyAccepted: true,
    privacyScrolled: true
  };

  const allSlots = getRepositorySlots();

  // Trova l'Azienda Sanitaria associata alla struttura o alla prenotazione
  let targetAsl = booking.azienda || '';
  if (!targetAsl && booking.hospital) {
    const matchSlot = allSlots.find(s => s.struttura && s.struttura.toUpperCase().includes(booking.hospital.toUpperCase()));
    if (matchSlot) targetAsl = matchSlot.azienda;
  }
  if (!targetAsl) {
    targetAsl = 'Asl Brindisi';
  }

  // Pre-seleziona la checkbox dell'ASL corrispondente
  const checks = document.querySelectorAll('.asl-check');
  checks.forEach(c => {
    const val = (c.value || c.parentElement.textContent || '').trim();
    if (val.toLowerCase() === targetAsl.toLowerCase() || (targetAsl && val.includes(targetAsl)) || (targetAsl && targetAsl.includes(val))) {
      c.checked = true;
    } else {
      c.checked = false;
    }
  });

  const master = document.getElementById('aslTutto');
  if (master) master.checked = false;

  // Popola e pre-seleziona la struttura nel menu a tendina
  updateStrutturaDropdown([targetAsl], allSlots);
  const selectStruttura = document.getElementById('selectStruttura');
  if (selectStruttura) {
    const hasOpt = Array.from(selectStruttura.options).some(o => o.value === booking.hospital);
    if (hasOpt) {
      selectStruttura.value = booking.hospital;
    } else {
      selectStruttura.value = '';
    }
  }

  const inputDate = document.getElementById('inputDateFrom');
  if (inputDate) inputDate.value = '';
  const displayDate = document.getElementById('filterDateDisplay');
  if (displayDate) {
    displayDate.value = '';
    displayDate.classList.remove('has-value');
  }
  const clearBtn = document.getElementById('btnFilterDateClear');
  if (clearBtn) clearBtn.style.display = 'none';
  if (typeof filterCalState !== 'undefined') {
    filterCalState.selectedDateStr = '';
    filterCalState.selectedDateObj = null;
  }
  closeFilterDatePicker();

  // Aggiorna codice ricetta nel summary bar
  const recipeLabel = document.getElementById('step4RecipeNumber');
  if (recipeLabel) {
    recipeLabel.innerText = state.wizard.selectedExamCode;
  }

  // Configura il banner di modifica in Step 4
  const modBanner = document.getElementById('step4ModificationBanner');
  const modTitle = document.getElementById('step4ModTitle');
  const modDesc = document.getElementById('step4ModDesc');
  if (modBanner) {
    modBanner.style.display = 'flex';
    if (modTitle) {
      modTitle.innerText = `Modifica della prenotazione n. ${booking.id}`;
    }
    if (modDesc) {
      modDesc.innerHTML = `Stai modificando la data per la prestazione <strong>${booking.exam}</strong>.<br>Appuntamento attuale: <strong>${booking.dateTime || (booking.date + ' Ore ' + booking.time)}</strong> presso <strong>${booking.hospital}</strong>.<br>Seleziona una nuova data e struttura dall'elenco, oppure clicca su <em>"Scegli altra data"</em> per scegliere giorno e ora dal calendario.`;
    }
  }

  clearStep4Errors();

  // Invia direttamente l'utente allo Step 4 (Data e struttura)
  goToScreen('screen-step-slots');
}

function cancelBooking(id) {
  state._pendingCancelId = id;
  const label = document.getElementById('cancelConfirmBookingId');
  if (label) label.textContent = id;

  const modal = document.getElementById('cancelConfirmModalOverlay');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
}

function closeCancelConfirmModal() {
  const modal = document.getElementById('cancelConfirmModalOverlay');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
  state._pendingCancelId = null;
}

function handleCancelConfirmBackdropClick(e) {
  if (e.target && e.target.id === 'cancelConfirmModalOverlay') {
    closeCancelConfirmModal();
  }
}

function confirmCancelBooking() {
  const id = state._pendingCancelId;
  closeCancelConfirmModal();

  if (id) {
    state.bookings = state.bookings.filter(b => b.id !== id);
    renderBookings();

    // Generate a fake disdetta number
    const disdettaNum = String(Math.floor(100000 + Math.random() * 900000));
    const numEl = document.getElementById('cancelSuccessNumero');
    if (numEl) numEl.textContent = disdettaNum;

    const successModal = document.getElementById('cancelSuccessModalOverlay');
    if (successModal) {
      successModal.classList.add('active');
      successModal.style.display = 'flex';
    }
  }
}

function closeCancelSuccessModal() {
  const modal = document.getElementById('cancelSuccessModalOverlay');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function handleCancelSuccessBackdropClick(e) {
  if (e.target && e.target.id === 'cancelSuccessModalOverlay') {
    closeCancelSuccessModal();
  }
}

// ==============================================================================
// STEP 1 - BENEFICIARIO: GESTIONE ERRORI ED EVENTI
// ==============================================================================
function clearStep1Errors() {
  const me = document.getElementById('choiceBeneficiaryMe');
  const other = document.getElementById('choiceBeneficiaryOther');
  const banner = document.getElementById('step1ErrorBanner');
  const nameInput = document.getElementById('inputDelegateName');
  const cfInput = document.getElementById('inputDelegateCF');
  const nameLabel = document.getElementById('labelDelegateName');
  const cfLabel = document.getElementById('labelDelegateCF');

  if (me) me.classList.remove('choice-card-error');
  if (other) other.classList.remove('choice-card-error');
  if (nameInput) nameInput.classList.remove('field-error');
  if (cfInput) cfInput.classList.remove('field-error');
  if (nameLabel) nameLabel.classList.remove('label-error');
  if (cfLabel) cfLabel.classList.remove('label-error');
  if (banner) banner.style.display = 'none';
}

function handleStep1DelegateChange() {
  const nameInput = document.getElementById('inputDelegateName');
  const cfInput = document.getElementById('inputDelegateCF');
  const nameLabel = document.getElementById('labelDelegateName');
  const cfLabel = document.getElementById('labelDelegateCF');
  const banner = document.getElementById('step1ErrorBanner');

  if (nameInput && nameInput.value.trim() && nameLabel) {
    nameInput.classList.remove('field-error');
    nameLabel.classList.remove('label-error');
  }
  if (cfInput && cfInput.value.trim() && cfLabel) {
    cfInput.classList.remove('field-error');
    cfLabel.classList.remove('label-error');
  }
  const isNameValid = !nameInput || nameInput.value.trim().length > 0;
  const isCFValid = !cfInput || cfInput.value.trim().length > 0;
  if (isNameValid && isCFValid && banner) {
    banner.style.display = 'none';
  }
}

function setBeneficiaryChoice(type) {
  state.wizard.beneficiary = type;
  const me = document.getElementById('choiceBeneficiaryMe');
  const other = document.getElementById('choiceBeneficiaryOther');
  if (me) {
    me.classList.toggle('selected', type === 'me');
    me.classList.remove('choice-card-error');
    me.setAttribute('aria-checked', type === 'me' ? 'true' : 'false');
  }
  if (other) {
    other.classList.toggle('selected', type === 'other');
    other.classList.remove('choice-card-error');
    other.setAttribute('aria-checked', type === 'other' ? 'true' : 'false');
  }

  const delegationBox = document.getElementById('delegationBox');
  if (delegationBox) {
    delegationBox.style.display = type === 'other' ? 'block' : 'none';
  }

  const banner = document.getElementById('step1ErrorBanner');
  if (type === 'me') {
    if (banner) banner.style.display = 'none';
  } else if (type === 'other') {
    handleStep1DelegateChange();
  }
}

function proceedFromStep1() {
  const me = document.getElementById('choiceBeneficiaryMe');
  const other = document.getElementById('choiceBeneficiaryOther');
  const banner = document.getElementById('step1ErrorBanner');
  let hasError = false;

  if (!state.wizard.beneficiary) {
    hasError = true;
    if (me) me.classList.add('choice-card-error');
    if (other) other.classList.add('choice-card-error');
  }

  if (state.wizard.beneficiary === 'other') {
    const nameInput = document.getElementById('inputDelegateName');
    const cfInput = document.getElementById('inputDelegateCF');
    const nameLabel = document.getElementById('labelDelegateName');
    const cfLabel = document.getElementById('labelDelegateCF');

    if (nameInput && !nameInput.value.trim()) {
      hasError = true;
      nameInput.classList.add('field-error');
      if (nameLabel) nameLabel.classList.add('label-error');
    }
    if (cfInput && !cfInput.value.trim()) {
      hasError = true;
      cfInput.classList.add('field-error');
      if (cfLabel) cfLabel.classList.add('label-error');
    }
  }

  if (hasError) {
    if (banner) {
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return;
  }

  clearStep1Errors();
  goToScreen('screen-step-regime');
}

// ==============================================================================
// STEP 2 - TIPO PRENOTAZIONE: GESTIONE ERRORI ED EVENTI
// ==============================================================================
function clearStep2Errors() {
  const ssn = document.getElementById('choiceRegimeSSN');
  const alpi = document.getElementById('choiceRegimeALPI');
  const banner = document.getElementById('step2ErrorBanner');

  if (ssn) ssn.classList.remove('choice-card-error');
  if (alpi) alpi.classList.remove('choice-card-error');
  if (banner) banner.style.display = 'none';
}

function setRegimeChoice(type) {
  state.wizard.regime = type;
  const ssn = document.getElementById('choiceRegimeSSN');
  const alpi = document.getElementById('choiceRegimeALPI');
  if (ssn) {
    ssn.classList.toggle('selected', type === 'ssn');
    ssn.classList.remove('choice-card-error');
    ssn.setAttribute('aria-checked', type === 'ssn' ? 'true' : 'false');
  }
  if (alpi) {
    alpi.classList.toggle('selected', type === 'alpi');
    alpi.classList.remove('choice-card-error');
    alpi.setAttribute('aria-checked', type === 'alpi' ? 'true' : 'false');
  }

  const banner = document.getElementById('step2ErrorBanner');
  if (banner) banner.style.display = 'none';
}

function proceedFromStep2() {
  const ssn = document.getElementById('choiceRegimeSSN');
  const alpi = document.getElementById('choiceRegimeALPI');
  const banner = document.getElementById('step2ErrorBanner');

  if (!state.wizard.regime) {
    if (ssn) ssn.classList.add('choice-card-error');
    if (alpi) alpi.classList.add('choice-card-error');
    if (banner) {
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return;
  }

  clearStep2Errors();
  goToScreen('screen-step-prescription');
}

// ==============================================================================
// STEP 3 - INSERIMENTO DATI & RICETTA: GESTIONE ERRORI ED EVENTI
// ==============================================================================
function clearStep3Errors() {
  const emailInput = document.getElementById('inputEmail');
  const phoneInput = document.getElementById('inputPhone');
  const emailLabel = document.getElementById('labelInputEmail');
  const phoneLabel = document.getElementById('labelInputPhone');
  const c1 = document.getElementById('prescCard1');
  const c2 = document.getElementById('prescCard2');
  const banner = document.getElementById('step3ErrorBanner');

  if (emailInput) emailInput.classList.remove('field-error');
  if (phoneInput) phoneInput.classList.remove('field-error');
  if (emailLabel) emailLabel.classList.remove('label-error');
  if (phoneLabel) phoneLabel.classList.remove('label-error');
  if (c1) c1.classList.remove('card-error');
  if (c2) c2.classList.remove('card-error');
  if (banner) banner.style.display = 'none';
}

function handleStep3FieldChange() {
  const emailInput = document.getElementById('inputEmail');
  const emailLabel = document.getElementById('labelInputEmail');
  const phoneInput = document.getElementById('inputPhone');
  const phoneLabel = document.getElementById('labelInputPhone');
  const banner = document.getElementById('step3ErrorBanner');

  const emailVal = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailVal.length > 0 && emailRegex.test(emailVal);

  if (isEmailValid && emailInput) {
    emailInput.classList.remove('field-error');
    if (emailLabel) emailLabel.classList.remove('label-error');
  }

  const phoneVal = phoneInput ? phoneInput.value.trim() : '';
  if (phoneVal.length > 0 && phoneInput) {
    phoneInput.classList.remove('field-error');
    if (phoneLabel) phoneLabel.classList.remove('label-error');
  }

  if (isEmailValid && phoneVal.length > 0 && state.wizard.selectedExam && banner) {
    banner.style.display = 'none';
  }
}

function setPrescriptionCard(examType) {
  state.wizard.selectedExam = examType;
  const isCardio = examType === 'cardio';
  const c1 = document.getElementById('prescCard1');
  const c2 = document.getElementById('prescCard2');
  if (c1) {
    c1.classList.toggle('selected', isCardio);
    c1.classList.remove('card-error');
  }
  if (c2) {
    c2.classList.toggle('selected', !isCardio);
    c2.classList.remove('card-error');
  }

  state.wizard.selectedExamCode = isCardio ? '160A37295673820' : '160A24680453583';
  const recEl = document.getElementById('step4RecipeNumber');
  if (recEl) recEl.innerText = state.wizard.selectedExamCode;

  state.wizard.exam = isCardio
    ? 'INSULINA (CURVA DA CARICO O DOPO TEST FARMACOLOGICI, MAX. 5)'
    : 'PROFILO LIPIDICO (COLESTEROLO TOTALE, TRIGLICERIDI, HDL-C, LDL-C)';
  state.wizard.examCode = isCardio ? '67001' : '68002';

  updateStep4RecipeDetails();

  const emailInput = document.getElementById('inputEmail');
  const emailVal = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailVal.length > 0 && emailRegex.test(emailVal);
  const banner = document.getElementById('step3ErrorBanner');
  if (isEmailValid && banner) {
    banner.style.display = 'none';
  }
}

function proceedFromStep3() {
  const emailInput = document.getElementById('inputEmail');
  const emailLabel = document.getElementById('labelInputEmail');
  const phoneInput = document.getElementById('inputPhone');
  const phoneLabel = document.getElementById('labelInputPhone');
  const c1 = document.getElementById('prescCard1');
  const c2 = document.getElementById('prescCard2');
  const banner = document.getElementById('step3ErrorBanner');

  let hasError = false;

  const emailVal = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailVal.length > 0 && emailRegex.test(emailVal);

  if (!isEmailValid) {
    hasError = true;
    if (emailInput) emailInput.classList.add('field-error');
    if (emailLabel) emailLabel.classList.add('label-error');
  } else {
    if (emailInput) emailInput.classList.remove('field-error');
    if (emailLabel) emailLabel.classList.remove('label-error');
  }

  const phoneVal = phoneInput ? phoneInput.value.trim() : '';
  if (!phoneVal) {
    hasError = true;
    if (phoneInput) phoneInput.classList.add('field-error');
    if (phoneLabel) phoneLabel.classList.add('label-error');
  } else {
    if (phoneInput) phoneInput.classList.remove('field-error');
    if (phoneLabel) phoneLabel.classList.remove('label-error');
  }

  if (!state.wizard.selectedExam) {
    hasError = true;
    if (c1) c1.classList.add('card-error');
    if (c2) c2.classList.add('card-error');
  } else {
    if (c1) c1.classList.remove('card-error');
    if (c2) c2.classList.remove('card-error');
  }

  if (hasError) {
    if (banner) {
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return;
  }

  clearStep3Errors();
  goToScreen('screen-step-slots');
}

// ==============================================================================
// STEP 4 - DETTAGLI RICETTA SELEZIONATA (DROPDOWN INFORMATIVO)
// ==============================================================================
function toggleRecipeDetails() {
  const dropdown = document.getElementById('step4RecipeDetailsDropdown');
  const btnText = document.getElementById('btnToggleRecipeDetailsText');
  const caret = document.getElementById('recipeDetailsCaret');
  if (!dropdown) return;

  const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
  if (isHidden) {
    updateStep4RecipeDetails();
    dropdown.style.display = 'block';
    if (btnText) btnText.innerText = 'Nascondi Dettagli';
    if (caret) caret.style.transform = 'rotate(180deg)';
  } else {
    dropdown.style.display = 'none';
    if (btnText) btnText.innerText = 'Vedi Dettagli';
    if (caret) caret.style.transform = 'rotate(0deg)';
  }
}

function updateStep4RecipeDetails() {
  const recEl = document.getElementById('step4RecipeNumber');
  const contentEl = document.getElementById('step4RecipeDetailsContent');
  const isCardio = (state.wizard.selectedExam === 'cardio' || !state.wizard.selectedExam);

  const recipeCode = isCardio ? '160A37295673820' : '160A24680453583';
  if (recEl) {
    recEl.innerText = state.wizard.selectedExamCode || recipeCode;
  }

  if (contentEl) {
    if (isCardio) {
      contentEl.innerHTML = `
        -INSULINA (CURVA DA CARICO O DOPO TEST FARMACOLOGICI, MAX. 5)<br>
        -GLUCOSIO DOSAGGIO SERIALE DOPO CARICO (DA 2 a 4 DETERMINAZIONI)
      `;
    } else {
      contentEl.innerHTML = `
        -COLESTEROLO TOTALE<br>
        -TRIGLICERIDI<br>
        -COLESTEROLO HDL (HDL-C)<br>
        -COLESTEROLO LDL (LDL-C)
      `;
    }
  }
}

// Helper: Format Date object to DD/MM/YYYY string
function formatDateDDMMYYYY(d) {
  if (!d || isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Helper: Parse DD/MM/YYYY or YYYY-MM-DD (normalized to midnight)
function parseSlotDate(dateStr, dateISO) {
  if (dateISO) {
    const d = new Date(dateISO);
    if (!isNaN(d.getTime())) {
      d.setHours(0, 0, 0, 0);
      return d;
    }
  }
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    d.setHours(0, 0, 0, 0);
    return d;
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    d.setHours(0, 0, 0, 0);
    return d;
  }
  return null;
}

// ==============================================================================
// STEP 4: CUSTOM DATEPICKER CALENDAR ("Cerca a partire da:")
// ==============================================================================
const filterCalState = {
  selectedDateStr: '', // 'DD/MM/YYYY'
  selectedDateObj: null,
  calYear: 2026,
  calMonth: 10 // November (0-indexed)
};

function toggleFilterDatePicker(e) {
  if (e) e.stopPropagation();
  const popover = document.getElementById('filterDatePickerPopover');
  if (!popover) return;
  const isHidden = (popover.style.display === 'none' || !popover.style.display);
  if (isHidden) {
    openFilterDatePicker();
  } else {
    closeFilterDatePicker();
  }
}

function openFilterDatePicker() {
  const popover = document.getElementById('filterDatePickerPopover');
  if (!popover) return;

  const inputVal = document.getElementById('inputDateFrom') ? document.getElementById('inputDateFrom').value : '';
  if (inputVal) {
    const d = parseSlotDate(inputVal);
    if (d) {
      filterCalState.selectedDateObj = d;
      filterCalState.selectedDateStr = formatDateDDMMYYYY(d);
      filterCalState.calYear = d.getFullYear();
      filterCalState.calMonth = d.getMonth();
    }
  } else {
    const today = new Date();
    filterCalState.calYear = today.getFullYear();
    filterCalState.calMonth = today.getMonth();
  }

  renderFilterCalendarGrid();
  popover.style.display = 'block';

  const displayInput = document.getElementById('filterDateDisplay');
  if (displayInput) displayInput.setAttribute('aria-expanded', 'true');
}

function closeFilterDatePicker() {
  const popover = document.getElementById('filterDatePickerPopover');
  if (popover) popover.style.display = 'none';

  const displayInput = document.getElementById('filterDateDisplay');
  if (displayInput) displayInput.setAttribute('aria-expanded', 'false');
}

function changeFilterCalMonth(val) {
  filterCalState.calMonth = parseInt(val, 10);
  renderFilterCalendarGrid();
}

function changeFilterCalYear(val) {
  filterCalState.calYear = parseInt(val, 10);
  renderFilterCalendarGrid();
}

function renderFilterCalendarGrid() {
  const grid = document.getElementById('filterCalDaysGrid');
  const monthSelect = document.getElementById('filterCalMonthSelect');
  const yearSelect = document.getElementById('filterCalYearSelect');
  if (!grid) return;

  if (monthSelect) monthSelect.value = filterCalState.calMonth;
  if (yearSelect) yearSelect.value = filterCalState.calYear;

  const year = filterCalState.calYear;
  const month = filterCalState.calMonth;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Day 1 of current month
  const firstDayObj = new Date(year, month, 1);
  let startingDay = firstDayObj.getDay(); // 0 is Sunday
  if (startingDay === 0) startingDay = 7; // Convert to Mon=1, Sun=7

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let html = '';

  // Previous month trailing days
  const prevDaysCount = startingDay - 1;
  for (let i = prevDaysCount; i > 0; i--) {
    const dayNum = daysInPrevMonth - i + 1;
    let prevM = month - 1;
    let prevY = year;
    if (prevM < 0) { prevM = 11; prevY -= 1; }
    const cellDate = new Date(prevY, prevM, dayNum);
    cellDate.setHours(0, 0, 0, 0);
    const isPast = cellDate < today;

    if (isPast) {
      html += `<div class="avail-cal-day past muted disabled" title="Data passata non selezionabile">${dayNum}</div>`;
    } else {
      html += `<div class="avail-cal-day muted" onclick="selectFilterCalPrevMonthDay(${dayNum})">${dayNum}</div>`;
    }
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);
    const dateStr = formatDateDDMMYYYY(cellDate);
    const isSelected = (dateStr === filterCalState.selectedDateStr);
    const isPast = cellDate < today;

    if (isPast) {
      html += `
        <div class="avail-cal-day past muted disabled" title="Data passata non selezionabile">
          ${day}
        </div>
      `;
    } else {
      html += `
        <div class="avail-cal-day ${isSelected ? 'selected' : ''}" onclick="selectFilterCalendarDay(${year}, ${month}, ${day})">
          ${day}
        </div>
      `;
    }
  }

  // Next month leading days to complete grid
  const totalCells = prevDaysCount + daysInCurrentMonth;
  const nextDaysCount = (totalCells > 35) ? (42 - totalCells) : (35 - totalCells);
  for (let day = 1; day <= nextDaysCount; day++) {
    html += `<div class="avail-cal-day muted" onclick="selectFilterCalNextMonthDay(${day})">${day}</div>`;
  }

  grid.innerHTML = html;
}

function selectFilterCalendarDay(year, month, day) {
  const chosenDate = new Date(year, month, day);
  chosenDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (chosenDate < today) {
    return; // Disallow selecting past dates
  }

  const dateStr = formatDateDDMMYYYY(chosenDate);
  filterCalState.selectedDateStr = dateStr;
  filterCalState.selectedDateObj = chosenDate;

  const inputDate = document.getElementById('inputDateFrom');
  const displayDate = document.getElementById('filterDateDisplay');
  const clearBtn = document.getElementById('btnFilterDateClear');

  if (inputDate) inputDate.value = dateStr;
  if (displayDate) {
    displayDate.value = dateStr;
    displayDate.classList.add('has-value');
  }
  if (clearBtn) clearBtn.style.display = 'inline-flex';

  closeFilterDatePicker();
  renderSlots();
}

function selectFilterCalPrevMonthDay(day) {
  let m = filterCalState.calMonth - 1;
  let y = filterCalState.calYear;
  if (m < 0) {
    m = 11;
    y -= 1;
  }
  filterCalState.calMonth = m;
  filterCalState.calYear = y;
  selectFilterCalendarDay(y, m, day);
}

function selectFilterCalNextMonthDay(day) {
  let m = filterCalState.calMonth + 1;
  let y = filterCalState.calYear;
  if (m > 11) {
    m = 0;
    y += 1;
  }
  filterCalState.calMonth = m;
  filterCalState.calYear = y;
  selectFilterCalendarDay(y, m, day);
}

function selectFilterCalToday(e) {
  if (e) e.stopPropagation();
  const today = new Date();
  selectFilterCalendarDay(today.getFullYear(), today.getMonth(), today.getDate());
}

function clearFilterDate(e) {
  if (e) e.stopPropagation();
  filterCalState.selectedDateStr = '';
  filterCalState.selectedDateObj = null;

  const inputDate = document.getElementById('inputDateFrom');
  const displayDate = document.getElementById('filterDateDisplay');
  const clearBtn = document.getElementById('btnFilterDateClear');

  if (inputDate) inputDate.value = '';
  if (displayDate) {
    displayDate.value = '';
    displayDate.classList.remove('has-value');
  }
  if (clearBtn) clearBtn.style.display = 'none';

  closeFilterDatePicker();
  renderSlots();
}

// Helper: Parse manual typed date string (DD/MM/YYYY, DD-MM-YYYY, DD/MM, YYYY-MM-DD)
function parseManualDateInput(val) {
  if (!val) return null;
  val = val.trim();

  // Match DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const dmyMatch = val.match(/^(\d{1,2})[\/\-\.](\d{1,2})([\/\-\.](\d{2,4}))?$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    let year = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 2026;
    if (year < 100) year += 2000;
    if (month >= 0 && month <= 11 && day >= 1 && day <= 31) {
      const d = new Date(year, month, day);
      if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        d.setHours(0, 0, 0, 0);
        return d;
      }
    }
  }

  // Match YYYY-MM-DD
  const isoMatch = val.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    if (month >= 0 && month <= 11 && day >= 1 && day <= 31) {
      const d = new Date(year, month, day);
      if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        d.setHours(0, 0, 0, 0);
        return d;
      }
    }
  }
  return null;
}

// Keydown handler: allow only numbers, navigation, backspace, delete, tab, enter
function handleFilterDateKeydown(e, input) {
  const allowedControlKeys = [
    'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'Home', 'End'
  ];

  if (allowedControlKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
    if (e.key === 'Enter') {
      input.blur();
    }
    // Handle backspace when right after a slash
    if (e.key === 'Backspace') {
      const pos = input.selectionStart;
      if ((pos === 3 || pos === 6) && input.selectionEnd === pos) {
        e.preventDefault();
        const val = input.value;
        input.value = val.slice(0, pos - 2) + val.slice(pos);
        input.setSelectionRange(pos - 2, pos - 2);
        handleFilterDateInput(input, e);
      }
    }
    return;
  }

  // Allow only digits 0-9
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
}

// Handler per l'inserimento manuale da tastiera con maschera e slash automatici (DD/MM/YYYY)
function handleFilterDateInput(input, event) {
  let digits = input.value.replace(/\D/g, '');
  if (digits.length > 8) {
    digits = digits.substring(0, 8);
  }

  const clearBtn = document.getElementById('btnFilterDateClear');
  const hiddenInput = document.getElementById('inputDateFrom');

  if (!digits) {
    input.value = '';
    input.classList.remove('has-value');
    if (clearBtn) clearBtn.style.display = 'none';
    if (hiddenInput) hiddenInput.value = '';
    filterCalState.selectedDateStr = '';
    filterCalState.selectedDateObj = null;
    renderSlots();
    return;
  }

  if (clearBtn) clearBtn.style.display = 'inline-flex';
  input.classList.add('has-value');

  // Format DD/MM/YYYY and validate segments
  let formatted = '';

  // Day (1-2 digits)
  if (digits.length >= 1) {
    let day = digits.substring(0, 2);
    // If first digit is > 3, auto-pad with 0 (e.g. 5 -> 05)
    if (digits.length === 1 && parseInt(digits[0], 10) > 3) {
      day = '0' + digits[0];
      digits = day + digits.substring(1);
    } else if (day.length === 2) {
      let dayNum = parseInt(day, 10);
      if (dayNum > 31) day = '31';
      if (dayNum === 0) day = '01';
    }
    formatted = day;

    if (digits.length > 2) {
      formatted += '/';
      let month = digits.substring(2, 4);
      // If month first digit is > 1, auto-pad with 0 (e.g. 4 -> 04)
      if (digits.length === 3 && parseInt(digits[2], 10) > 1) {
        month = '0' + digits[2];
        digits = digits.substring(0, 2) + month + digits.substring(3);
      } else if (month.length === 2) {
        let monthNum = parseInt(month, 10);
        if (monthNum > 12) month = '12';
        if (monthNum === 0) month = '01';
      }
      formatted += month;

      if (digits.length > 4) {
        formatted += '/';
        const year = digits.substring(4, 8);
        formatted += year;
      } else if (digits.length === 4) {
        formatted += '/';
      }
    } else if (digits.length === 2) {
      formatted += '/';
    }
  }

  input.value = formatted;

  // When complete 8 digits are entered (DD/MM/YYYY), validate date and filter
  if (digits.length === 8) {
    const d = parseManualDateInput(formatted);
    if (d) {
      const validStr = formatDateDDMMYYYY(d);
      input.value = validStr;
      filterCalState.selectedDateStr = validStr;
      filterCalState.selectedDateObj = d;
      filterCalState.calYear = d.getFullYear();
      filterCalState.calMonth = d.getMonth();

      if (hiddenInput) hiddenInput.value = validStr;
      renderSlots();

      const popover = document.getElementById('filterDatePickerPopover');
      if (popover && popover.style.display !== 'none') {
        renderFilterCalendarGrid();
      }
    }
  } else {
    // Incomplete date while typing: clear filter until full date is typed
    if (hiddenInput && hiddenInput.value !== '') {
      hiddenInput.value = '';
      filterCalState.selectedDateStr = '';
      filterCalState.selectedDateObj = null;
      renderSlots();
    }
  }
}

// Handler per completamento o perdita focus del campo (blur)
function handleFilterDateBlur(input) {
  const val = input.value.trim();
  const digits = val.replace(/\D/g, '');
  const clearBtn = document.getElementById('btnFilterDateClear');
  const hiddenInput = document.getElementById('inputDateFrom');

  if (!digits) {
    input.value = '';
    input.classList.remove('has-value');
    if (clearBtn) clearBtn.style.display = 'none';
    if (hiddenInput) hiddenInput.value = '';
    renderSlots();
    return;
  }

  // If user typed only day and month (4 digits, e.g. 20/11), auto-complete with 2026
  if (digits.length === 4) {
    const d = parseManualDateInput(val);
    if (d) {
      const validStr = formatDateDDMMYYYY(d);
      input.value = validStr;
      input.classList.add('has-value');
      if (clearBtn) clearBtn.style.display = 'inline-flex';
      if (hiddenInput) hiddenInput.value = validStr;
      filterCalState.selectedDateStr = validStr;
      filterCalState.selectedDateObj = d;
      filterCalState.calYear = d.getFullYear();
      filterCalState.calMonth = d.getMonth();
      renderSlots();
      return;
    }
  }

  // If less than 8 digits and not full date, reset or clean up
  if (digits.length < 8) {
    clearFilterDate();
  }
}

// Setup Step 4 initial filters and dropdowns
function setupStep4() {
  state.wizard.selectedSlot = null;

  const master = document.getElementById('aslTutto');
  if (master) master.checked = false;

  const checks = document.querySelectorAll('.asl-check');
  checks.forEach(c => c.checked = false);

  const selectStruttura = document.getElementById('selectStruttura');
  if (selectStruttura) {
    selectStruttura.innerHTML = '<option value="">-- Seleziona prima un\'Azienda Sanitaria --</option>';
    selectStruttura.value = '';
    selectStruttura.disabled = true;
  }

  const inputDate = document.getElementById('inputDateFrom');
  if (inputDate) inputDate.value = '';
  const displayDate = document.getElementById('filterDateDisplay');
  if (displayDate) {
    displayDate.value = '';
    displayDate.classList.remove('has-value');
  }
  const clearBtn = document.getElementById('btnFilterDateClear');
  if (clearBtn) clearBtn.style.display = 'none';
  if (typeof filterCalState !== 'undefined') {
    filterCalState.selectedDateStr = '';
    filterCalState.selectedDateObj = null;
  }
  closeFilterDatePicker();

  const countBadge = document.getElementById('slotsCountBadge');
  if (countBadge) countBadge.style.display = 'none';
}

// Reset Step 4 filters and inputs
function resetStep4Filters() {
  setupStep4();
}

// Dynamically populate structure select dropdown based on selected ASLs (used in v2)
function updateStrutturaDropdown(checkedAsls, allSlots) {
  const selectStruttura = document.getElementById('selectStruttura');
  if (!selectStruttura) return;

  const currentVal = selectStruttura.value;

  if (checkedAsls.length === 0) {
    selectStruttura.innerHTML = '<option value="">-- Seleziona prima un\'Azienda Sanitaria --</option>';
    selectStruttura.disabled = true;
    return;
  }

  selectStruttura.disabled = false;

  // Collect unique strutture for selected ASLs
  const availableStrutture = [];
  allSlots.forEach(s => {
    if (checkedAsls.includes(s.azienda) && !availableStrutture.includes(s.struttura)) {
      availableStrutture.push(s.struttura);
    }
  });

  availableStrutture.sort();

  let optionsHtml = '<option value="">Tutte le strutture</option>';
  availableStrutture.forEach(str => {
    const isSelected = (str === currentVal);
    optionsHtml += `<option value="${str}" ${isSelected ? 'selected' : ''}>${str}</option>`;
  });

  selectStruttura.innerHTML = optionsHtml;
}

// Step 4: Dynamic Fake Repository Render with Empty Guidance State
function renderSlots() {
  const container = document.getElementById('slotsWireframeList');
  const countBadge = document.getElementById('slotsCountBadge');
  const selectStruttura = document.getElementById('selectStruttura');
  const inputDateFrom = document.getElementById('inputDateFrom');
  if (!container) return;

  const allSlots = getRepositorySlots();

  // Get all checked ASL checkboxes
  const checkedBoxes = Array.from(document.querySelectorAll('.asl-check:checked'));
  const checkedAsls = checkedBoxes.map(cb => (cb.value || cb.parentElement.textContent).trim());

  // Update dropdown options
  updateStrutturaDropdown(checkedAsls, allSlots);

  // If NO Azienda Sanitaria is selected, do NOT show availabilities
  if (checkedAsls.length === 0) {
    state.wizard.selectedSlot = null;
    if (countBadge) countBadge.style.display = 'none';

    container.innerHTML = `
      <div class="slots-empty-state">
        <svg class="slots-empty-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h7"></path>
          <circle cx="18" cy="18" r="3"></circle>
          <path d="m20.5 20.5 2 2"></path>
        </svg>
        <div class="slots-empty-title">Nessuna Azienda Sanitaria selezionata</div>
        <p class="slots-empty-desc">
          Per visualizzare le date e le strutture disponibili è necessario selezionare almeno un'<strong>Azienda Sanitaria</strong> dall'elenco sovrastante.
        </p>
      </div>
    `;
    return;
  }

  // Filter slots by selected ASLs
  let filtered = allSlots.filter(slot => checkedAsls.includes(slot.azienda));

  // Filter by structure if chosen
  const selectedStruttura = selectStruttura ? selectStruttura.value : '';
  if (selectedStruttura) {
    filtered = filtered.filter(slot => slot.struttura.toUpperCase() === selectedStruttura.toUpperCase());
  }

  // Filter by starting date if chosen
  const dateFromVal = inputDateFrom ? inputDateFrom.value : '';
  if (dateFromVal) {
    const fromDate = parseSlotDate(dateFromVal) || new Date(dateFromVal);
    fromDate.setHours(0, 0, 0, 0);

    filtered = filtered.filter(slot => {
      const slotDate = parseSlotDate(slot.date, slot.dateISO);
      return slotDate ? slotDate >= fromDate : true;
    });
  }

  // Update badge count
  if (countBadge) {
    countBadge.style.display = 'inline-block';
    countBadge.innerText = `${filtered.length} ${filtered.length === 1 ? 'disponibilità' : 'disponibilità'}`;
  }

  // If no slots match the criteria
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="slots-empty-state">
        <svg class="slots-empty-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <div class="slots-empty-title">Nessuna disponibilità trovata</div>
        <p class="slots-empty-desc">
          Non sono state trovate disponibilità per le selezioni correnti. Prova a selezionare un'altra struttura o ad ampliare le Aziende Sanitarie scelte.
        </p>
      </div>
    `;
    return;
  }

  // Deselect if previously selected slot is no longer in filtered list
  if (state.wizard.selectedSlot && !filtered.some(s => s.id === state.wizard.selectedSlot.id)) {
    state.wizard.selectedSlot = null;
  }

  // Render Table
  let html = `
    <div class="slot-table-header">
      <div style="width: 36px;"></div>
      <div>Azienda sanitaria</div>
      <div>Struttura</div>
      <div>Data e ora</div>
      <div style="width: 140px; text-align: right;"></div>
    </div>
  `;

  html += filtered.map(slot => {
    const isSelected = state.wizard.selectedSlot && state.wizard.selectedSlot.id === slot.id;
    return `
      <div class="slot-table-row ${isSelected ? 'selected' : ''}" onclick="selectSlot('${slot.id}')">
        <div class="slot-radio-cell">
          <div class="slot-radio-btn ${isSelected ? 'checked' : ''}">
            ${isSelected ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
          </div>
        </div>
        <div class="slot-cell-azienda">
          ${slot.azienda}
        </div>
        <div class="slot-cell-struttura">
          ${slot.struttura}
          ${slot.firstAvailable ? '<span class="slot-first-badge">Prima data utile</span>' : ''}
        </div>
        <div class="slot-cell-datetime">
          <div class="slot-date-line">${slot.date}</div>
          <div class="slot-time-line">${slot.time}</div>
        </div>
        <div class="slot-cell-action">
          <button class="btn-scegli-altra-data" type="button" onclick="event.stopPropagation(); handleScegliAltraData('${slot.id}');">Scegli altra data</button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// Action for 'Scegli altra data' button
function handleScegliAltraData(slotId) {
  openAvailModal(slotId);
}

function clearStep4Errors() {
  const banner = document.getElementById('step4ErrorBanner');
  const filterPanel = document.getElementById('step4FiltersPanel');
  const slotsWrap = document.querySelector('.disponibilita-table-wrap');

  if (filterPanel) filterPanel.classList.remove('step4-filters-error');
  if (slotsWrap) slotsWrap.classList.remove('step4-slots-error');
  if (banner) banner.style.display = 'none';
}

function selectSlot(slotId) {
  const allSlots = getRepositorySlots();
  const found = allSlots.find(s => s.id === slotId);

  // Allow to select and de-select slots clicking on them
  if (state.wizard.selectedSlot && state.wizard.selectedSlot.id === slotId) {
    state.wizard.selectedSlot = null;
  } else if (found) {
    state.wizard.selectedSlot = found;
    const banner = document.getElementById('step4ErrorBanner');
    const slotsWrap = document.querySelector('.disponibilita-table-wrap');
    if (slotsWrap) slotsWrap.classList.remove('step4-slots-error');
    if (banner) banner.style.display = 'none';
  }

  renderSlots();
}

function handleASLCheckChange() {
  const master = document.getElementById('aslTutto');
  const checks = Array.from(document.querySelectorAll('.asl-check'));
  if (master) {
    master.checked = checks.length > 0 && checks.every(c => c.checked);
  }
  const filterPanel = document.getElementById('step4FiltersPanel');
  if (filterPanel && checks.some(c => c.checked)) {
    filterPanel.classList.remove('step4-filters-error');
    const banner = document.getElementById('step4ErrorBanner');
    if (banner && state.wizard.selectedSlot) banner.style.display = 'none';
  }
  renderSlots();
}

function proceedFromStep4() {
  const banner = document.getElementById('step4ErrorBanner');
  const filterPanel = document.getElementById('step4FiltersPanel');
  const slotsWrap = document.querySelector('.disponibilita-table-wrap');
  let hasError = false;

  const checkedBoxes = document.querySelectorAll('.asl-check:checked');
  if (checkedBoxes.length === 0) {
    hasError = true;
    if (filterPanel) filterPanel.classList.add('step4-filters-error');
  } else {
    if (filterPanel) filterPanel.classList.remove('step4-filters-error');
  }

  if (!state.wizard.selectedSlot) {
    hasError = true;
    if (slotsWrap) slotsWrap.classList.add('step4-slots-error');
  } else {
    if (slotsWrap) slotsWrap.classList.remove('step4-slots-error');
  }

  if (hasError) {
    if (banner) {
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return;
  }

  clearStep4Errors();
  goToScreen('screen-step-recap');
}



// ==============================================================================
// MODALE CALENDARIO DISPONIBILITÀ (Scegli altra data - Matching Wireframe)
// ==============================================================================
const availModalState = {
  slotId: null,
  view: 'lista', // 'lista' or 'calendario'
  selectedDate: null,
  selectedDateObj: null,
  selectedTime: '7:42',
  calYear: null,
  calMonth: null,
  datesPool: [],
  visibleDatesCount: 6,
  timesPool: [
    '7:30', '7:42', '7:54', '8:18',
    '8:30', '9:06', '9:18', '9:30',
    '9:48', '10:06', '10:18', '10:30'
  ]
};

// Build filtered and sorted dates pool starting from today (or after), strictly excluding past dates
function buildFilteredSortedDatesPool(preferredDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const datesMap = new Map();

  // 1. Generate sequential dates for the next 45 days starting from today
  for (let i = 0; i < 45; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    d.setHours(0, 0, 0, 0);
    datesMap.set(formatDateDDMMYYYY(d), d);
  }

  // 2. Include any future dates from the repository slots
  const allSlots = getRepositorySlots();
  allSlots.forEach(s => {
    if (s.date) {
      const d = parseSlotDate(s.date, s.dateISO);
      if (d && d >= today) {
        datesMap.set(formatDateDDMMYYYY(d), d);
      }
    }
  });

  // 3. If preferredDate is supplied, check if >= today
  if (preferredDate) {
    const d = parseSlotDate(preferredDate);
    if (d && d >= today) {
      datesMap.set(formatDateDDMMYYYY(d), d);
    }
  }

  // 4. Filter out any date strictly before today, then sort ascending
  const sortedDates = Array.from(datesMap.entries())
    .filter(([str, dateObj]) => dateObj >= today)
    .sort((a, b) => a[1].getTime() - b[1].getTime())
    .map(entry => entry[0]);

  return sortedDates;
}

function openAvailModal(slotId) {
  availModalState.slotId = slotId;
  const allSlots = getRepositorySlots();
  const slot = allSlots.find(s => s.id === slotId) || state.wizard.selectedSlot;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let preferredDate = null;
  if (slot && slot.date) {
    const parsed = parseSlotDate(slot.date, slot.dateISO);
    if (parsed && parsed >= today) {
      preferredDate = slot.date;
    }
  }

  // Build sorted dates pool starting strictly from today or after
  availModalState.datesPool = buildFilteredSortedDatesPool(preferredDate);
  availModalState.visibleDatesCount = 6;

  // Select preferred date if valid and future, otherwise the earliest available date (today)
  if (preferredDate && availModalState.datesPool.includes(preferredDate)) {
    availModalState.selectedDate = preferredDate;
  } else {
    availModalState.selectedDate = availModalState.datesPool[0] || formatDateDDMMYYYY(today);
  }

  availModalState.selectedDateObj = parseSlotDate(availModalState.selectedDate) || new Date(today);
  availModalState.calYear = availModalState.selectedDateObj.getFullYear();
  availModalState.calMonth = availModalState.selectedDateObj.getMonth();

  if (slot && slot.time) {
    availModalState.selectedTime = slot.time;
  } else if (!availModalState.selectedTime) {
    availModalState.selectedTime = '7:42';
  }

  renderAvailModal();

  const modal = document.getElementById('availModalOverlay');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
}

function closeAvailModal() {
  const modal = document.getElementById('availModalOverlay');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function handleAvailBackdropClick(e) {
  if (e.target && e.target.id === 'availModalOverlay') {
    closeAvailModal();
  }
}

function switchAvailView(viewType) {
  availModalState.view = viewType;

  const btnCal = document.getElementById('btnToggleCalendario');
  const btnLista = document.getElementById('btnToggleLista');
  const viewLista = document.getElementById('availViewLista');
  const viewCal = document.getElementById('availViewCalendario');

  if (viewType === 'calendario') {
    if (btnCal) btnCal.classList.add('active');
    if (btnLista) btnLista.classList.remove('active');
    if (viewLista) viewLista.style.display = 'none';
    if (viewCal) viewCal.style.display = 'block';
    renderCalendarGrid();
  } else {
    if (btnCal) btnCal.classList.remove('active');
    if (btnLista) btnLista.classList.add('active');
    if (viewLista) viewLista.style.display = 'block';
    if (viewCal) viewCal.style.display = 'none';
    renderDatesList();
  }
}

function renderAvailModal() {
  switchAvailView(availModalState.view || 'lista');
  renderDatesList();
  renderCalendarGrid();
  renderTimePills();
  updateAvailSummary();
}

function renderDatesList() {
  const container = document.getElementById('availDatesListContainer');
  if (!container) return;

  const datesToShow = availModalState.datesPool.slice(0, availModalState.visibleDatesCount);

  container.innerHTML = datesToShow.map(dateStr => {
    const isSelected = (dateStr === availModalState.selectedDate);
    return `
      <div class="avail-date-row ${isSelected ? 'selected' : ''}" onclick="selectAvailDate('${dateStr}')">
        <span class="avail-date-pill">${dateStr}</span>
      </div>
    `;
  }).join('');
}

function showMoreAvailDates() {
  if (availModalState.visibleDatesCount < availModalState.datesPool.length) {
    availModalState.visibleDatesCount = Math.min(availModalState.visibleDatesCount + 5, availModalState.datesPool.length);
  } else {
    const lastDateStr = availModalState.datesPool[availModalState.datesPool.length - 1];
    let d = parseSlotDate(lastDateStr);
    if (!d) d = new Date();
    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(d);
      nextDate.setDate(d.getDate() + i);
      const str = formatDateDDMMYYYY(nextDate);
      if (!availModalState.datesPool.includes(str)) {
        availModalState.datesPool.push(str);
      }
    }
    availModalState.datesPool.sort((a, b) => parseSlotDate(a) - parseSlotDate(b));
    availModalState.visibleDatesCount = availModalState.datesPool.length;
  }
  renderDatesList();
}

function selectAvailDate(dateStr) {
  const d = parseSlotDate(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!d || d < today) return; // Disallow selecting past dates

  availModalState.selectedDate = dateStr;
  availModalState.selectedDateObj = d;
  availModalState.calYear = d.getFullYear();
  availModalState.calMonth = d.getMonth();

  renderDatesList();
  renderCalendarGrid();
  updateAvailSummary();
}

function renderCalendarGrid() {
  const grid = document.getElementById('availCalDaysGrid');
  const monthSelect = document.getElementById('availCalMonthSelect');
  const yearSelect = document.getElementById('availCalYearSelect');
  if (!grid) return;

  if (monthSelect) monthSelect.value = availModalState.calMonth;
  if (yearSelect) yearSelect.value = availModalState.calYear;

  const year = availModalState.calYear;
  const month = availModalState.calMonth;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Day 1 of current month
  const firstDayObj = new Date(year, month, 1);
  let startingDay = firstDayObj.getDay(); // 0 is Sunday
  if (startingDay === 0) startingDay = 7; // Convert to Mon=1, Sun=7

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let html = '';

  // Previous month trailing days
  const prevDaysCount = startingDay - 1;
  for (let i = prevDaysCount; i > 0; i--) {
    const dayNum = daysInPrevMonth - i + 1;
    let prevM = month - 1;
    let prevY = year;
    if (prevM < 0) { prevM = 11; prevY -= 1; }
    const cellDate = new Date(prevY, prevM, dayNum);
    cellDate.setHours(0, 0, 0, 0);
    const isPast = cellDate < today;

    if (isPast) {
      html += `<div class="avail-cal-day past muted disabled" title="Data passata non selezionabile">${dayNum}</div>`;
    } else {
      html += `<div class="avail-cal-day muted" onclick="selectCalendarPrevMonthDay(${dayNum})">${dayNum}</div>`;
    }
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);
    const dateStr = formatDateDDMMYYYY(cellDate);
    const isSelected = (dateStr === availModalState.selectedDate);
    const isPast = cellDate < today;

    if (isPast) {
      html += `
        <div class="avail-cal-day past muted disabled" title="Data passata non selezionabile">
          ${day}
        </div>
      `;
    } else {
      html += `
        <div class="avail-cal-day ${isSelected ? 'selected' : ''}" onclick="selectAvailCalendarDay(${year}, ${month}, ${day})">
          ${day}
        </div>
      `;
    }
  }

  // Next month leading days to complete grid
  const totalCells = prevDaysCount + daysInCurrentMonth;
  const nextDaysCount = (totalCells > 35) ? (42 - totalCells) : (35 - totalCells);
  for (let day = 1; day <= nextDaysCount; day++) {
    html += `<div class="avail-cal-day muted" onclick="selectCalendarNextMonthDay(${day})">${day}</div>`;
  }

  grid.innerHTML = html;
}

function changeCalendarMonth(val) {
  availModalState.calMonth = parseInt(val, 10);
  renderCalendarGrid();
}

function changeCalendarYear(val) {
  availModalState.calYear = parseInt(val, 10);
  renderCalendarGrid();
}

function selectAvailCalendarDay(year, month, day) {
  const chosenDate = new Date(year, month, day);
  chosenDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (chosenDate < today) {
    return; // Disallow selecting past dates
  }

  const dateStr = formatDateDDMMYYYY(chosenDate);
  availModalState.selectedDate = dateStr;
  availModalState.selectedDateObj = chosenDate;

  if (!availModalState.datesPool.includes(dateStr)) {
    availModalState.datesPool.push(dateStr);
    availModalState.datesPool.sort((a, b) => parseSlotDate(a) - parseSlotDate(b));
  }

  renderCalendarGrid();
  renderDatesList();
  updateAvailSummary();
}

function selectCalendarPrevMonthDay(day) {
  let m = availModalState.calMonth - 1;
  let y = availModalState.calYear;
  if (m < 0) {
    m = 11;
    y -= 1;
  }
  availModalState.calMonth = m;
  availModalState.calYear = y;
  selectAvailCalendarDay(y, m, day);
}

function selectCalendarNextMonthDay(day) {
  let m = availModalState.calMonth + 1;
  let y = availModalState.calYear;
  if (m > 11) {
    m = 0;
    y += 1;
  }
  availModalState.calMonth = m;
  availModalState.calYear = y;
  selectAvailCalendarDay(y, m, day);
}

function renderTimePills() {
  const container = document.getElementById('availTimePillsGrid');
  if (!container) return;

  container.innerHTML = availModalState.timesPool.map(timeStr => {
    const isSelected = (timeStr === availModalState.selectedTime);
    return `
      <button type="button" class="avail-time-pill ${isSelected ? 'selected' : ''}" onclick="selectAvailTime('${timeStr}')">
        ${timeStr}
      </button>
    `;
  }).join('');
}

function selectAvailTime(timeStr) {
  availModalState.selectedTime = timeStr;
  renderTimePills();
  updateAvailSummary();
}

function updateAvailSummary() {
  const summaryEl = document.getElementById('availModalSummaryValue');
  if (!summaryEl) return;

  const d = availModalState.selectedDateObj || new Date();
  const days = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

  const dayName = days[d.getDay()];
  const dayNum = d.getDate();
  const monthName = months[d.getMonth()];
  const yearNum = d.getFullYear();

  summaryEl.innerText = `${dayName} ${dayNum} ${monthName} ${yearNum} - ${availModalState.selectedTime}`;
}

function confirmAvailModal() {
  const allSlots = getRepositorySlots();
  let targetSlot = allSlots.find(s => s.id === availModalState.slotId);

  if (!targetSlot) {
    targetSlot = state.wizard.selectedSlot || allSlots[0];
  }

  if (targetSlot) {
    targetSlot.date = availModalState.selectedDate;
    targetSlot.time = availModalState.selectedTime;
    targetSlot.dateTime = `${availModalState.selectedDate} ore ${availModalState.selectedTime}`;
    state.wizard.selectedSlot = targetSlot;
  }

  closeAvailModal();
  renderSlots();
}

// Step 5: Update Recap with slot details (Matching Image 8)
function updateRecapStep() {
  const defaultSlot = getRepositorySlots()[0] || {};
  const slot = state.wizard.selectedSlot || defaultSlot;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  setVal('recapNRE', state.wizard.selectedExamCode || '160A37295673820');
  setVal('recapPrestazioni', '1');
  setVal('recapData', slot.date || '20/11/2026');
  setVal('recapOra', slot.time || '07:55');
  setVal('recapAzienda', slot.azienda || 'Asl Brindisi');
  setVal('recapStruttura', slot.struttura || 'OSPEDALE OSTUNI');
  setVal('recapAmbulatorio', slot.ambulatorio || slot.address || 'VIA LUIGI MICCOLI - OSTUNI (BR)');
  setVal('recapStrutturaAlt', slot.sedeUnita || slot.address || 'SEDE: VIA VILLAFRANCA UNITA: VIA LUIGI MICCOLI - OSTUNI (BR)');

  // Assicura che la checkbox privacy sia abilitata e resetta eventuali errori precedenti
  const chkPriv = document.getElementById('checkPrivacyConsent');
  if (chkPriv) {
    chkPriv.disabled = false;
    chkPriv.style.cursor = 'pointer';
  }
  clearStep5ConsentErrors();
}

// Gestione checkbox Step 5 e rimozione evidenziazione errore al click
function handleStep5CheckboxChange() {
  const checkNote = document.getElementById('checkNoteOperatore');
  const checkPrivacy = document.getElementById('checkPrivacyConsent');
  const rowNote = document.getElementById('consentRowNote');
  const rowPrivacy = document.getElementById('consentRowPrivacy');
  const errorBanner = document.getElementById('step5ErrorBanner');

  if (checkNote && checkNote.checked && rowNote) {
    rowNote.classList.remove('consent-error');
  }
  if (checkPrivacy && checkPrivacy.checked && rowPrivacy) {
    rowPrivacy.classList.remove('consent-error');
  }

  const allChecked = (!checkNote || checkNote.checked) && (!checkPrivacy || checkPrivacy.checked);
  if (allChecked && errorBanner) {
    errorBanner.style.display = 'none';
  }
}

function clearStep5ConsentErrors() {
  const rowNote = document.getElementById('consentRowNote');
  const rowPrivacy = document.getElementById('consentRowPrivacy');
  const errorBanner = document.getElementById('step5ErrorBanner');

  if (rowNote) rowNote.classList.remove('consent-error');
  if (rowPrivacy) rowPrivacy.classList.remove('consent-error');
  if (errorBanner) errorBanner.style.display = 'none';
}

function proceedFromStep5() {
  const checkNote = document.getElementById('checkNoteOperatore');
  const checkPrivacy = document.getElementById('checkPrivacyConsent');
  const rowNote = document.getElementById('consentRowNote');
  const rowPrivacy = document.getElementById('consentRowPrivacy');
  const errorBanner = document.getElementById('step5ErrorBanner');

  let hasError = false;

  // Evidenzia in rosso la casella Note Operatore se non spuntata
  if (checkNote && !checkNote.checked) {
    hasError = true;
    if (rowNote) rowNote.classList.add('consent-error');
  } else {
    if (rowNote) rowNote.classList.remove('consent-error');
  }

  // Evidenzia in rosso la casella Informativa Privacy se non spuntata
  if (checkPrivacy && !checkPrivacy.checked) {
    hasError = true;
    if (rowPrivacy) rowPrivacy.classList.add('consent-error');
  } else {
    if (rowPrivacy) rowPrivacy.classList.remove('consent-error');
  }

  // Mostra messaggio di errore inline sopra i pulsanti (Matching media_2d90cf8d)
  if (hasError) {
    if (errorBanner) {
      errorBanner.style.display = 'flex';
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return;
  }

  if (errorBanner) errorBanner.style.display = 'none';

  // Genera o conferma codice prenotazione
  const defaultSlot = getRepositorySlots()[0] || {
    id: 'slot-default',
    azienda: 'Asl Brindisi',
    struttura: 'OSPEDALE OSTUNI',
    address: 'VIA LUIGI MICCOLI - OSTUNI (BR)',
    date: '20/11/2026',
    time: '07:55',
    dateTime: '20/11/2026 ore 07:55'
  };
  const slot = state.wizard.selectedSlot || defaultSlot;
  const deadline = calculateCancelDeadline(slot);

  if (state.wizard && state.wizard.isModification && state.wizard.editingBookingId) {
    state.wizard.cupCode = state.wizard.editingBookingId;
    const existing = state.bookings.find(b => b.id === state.wizard.editingBookingId);
    if (existing) {
      existing.date = slot.date || existing.date;
      existing.time = slot.time || existing.time;
      existing.dateTime = (slot.date || existing.date) + ' Ore ' + (slot.time || existing.time);
      existing.hospital = slot.struttura || existing.hospital;
      if (slot.azienda) existing.azienda = slot.azienda;
      existing.cancelDeadline = deadline.dateStr;
      existing.status = 'Da pagare da effettuare';
    }
  } else {
    // Genera un CUP code univoco per la nuova prenotazione
    if (!state.wizard.cupCode || state.wizard.cupCode === '2026649029') {
      if (state.bookings.some(b => b.id === '2026649029')) {
        state.wizard.cupCode = '2026' + String(Math.floor(100000 + Math.random() * 900000));
      } else {
        state.wizard.cupCode = '2026649029';
      }
    }

    // Determina la prestazione selezionata nello Step 3 (esatta dicitura della ricetta)
    let examName = '';
    if (state.wizard.selectedExam === 'cardio') {
      examName = 'INSULINA (CURVA DA CARICO O DOPO TEST FARMACOLOGICI, MAX. 5)';
    } else if (state.wizard.selectedExam === 'lipidi') {
      examName = 'PROFILO LIPIDICO (COLESTEROLO TOTALE, TRIGLICERIDI, HDL-C, LDL-C)';
    } else if (state.wizard.exam) {
      examName = state.wizard.exam;
    } else {
      examName = 'PROFILO LIPIDICO (COLESTEROLO TOTALE, TRIGLICERIDI, HDL-C, LDL-C)';
    }

    // Tipo prenotazione in base al regime scelto nello Step 2
    let bookingTypeStr = 'SSN con Ricetta Dematerializzata';
    if (state.wizard.regime === 'alpi') {
      bookingTypeStr = 'Libera Professione (ALPI)';
    } else if (state.wizard.regime === 'ssn') {
      bookingTypeStr = 'SSN con Ricetta Dematerializzata';
    }

    const slotDate = slot.date || '20/11/2026';
    const slotTime = slot.time || '07:55';
    const slotDateTime = `${slotDate} Ore ${slotTime}`;
    const slotHospital = slot.struttura || 'OSPEDALE OSTUNI';
    const slotAzienda = slot.azienda || 'Asl Brindisi';

    // Aggiunge la nuova prenotazione alla lista personale con tutti i dati perfettamente combacianti
    const newBooking = {
      id: state.wizard.cupCode,
      date: slotDate,
      time: slotTime,
      dateTime: slotDateTime,
      exam: examName,
      hospital: slotHospital,
      azienda: slotAzienda,
      bookingType: bookingTypeStr,
      cancelDeadline: deadline.dateStr,
      status: 'Da pagare da effettuare'
    };

    // Rimuove eventuale duplicato con lo stesso id e inserisce in cima alla lista
    state.bookings = state.bookings.filter(b => b.id !== newBooking.id);
    state.bookings.unshift(newBooking);
  }

  // Naviga al 6° Passo (Riepilogo)
  goToScreen('screen-step-success');
}

// Calcolo termine utile disdetta (48 ore prima della prenotazione)
function calculateCancelDeadline(slot) {
  if (!slot) return { dateStr: '18/11/2026', timeStr: '07:55', fullStr: '18/11/2026 ore 07:55' };
  const d = parseSlotDate(slot.date, slot.dateISO);
  if (d && !isNaN(d.getTime())) {
    const deadline = new Date(d.getTime() - 2 * 24 * 60 * 60 * 1000);
    const dateStr = formatDateDDMMYYYY(deadline);
    const timeStr = slot.time || '07:55';
    return {
      dateStr: dateStr,
      timeStr: timeStr,
      fullStr: `${dateStr} ore ${timeStr}`
    };
  }
  return { dateStr: '18/11/2026', timeStr: '07:55', fullStr: '18/11/2026 ore 07:55' };
}

// Step 6: Update Success (Riepilogo - Matching Image 2)
function updateSuccessStep() {
  const defaultSlot = getRepositorySlots()[0] || {};
  const slot = state.wizard.selectedSlot || defaultSlot;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };
  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  setVal('successBookingId', 'NUMERO PRENOTAZIONE: ' + (state.wizard.cupCode || '2026649029'));
  setVal('successHospital', slot.struttura || 'OSPEDALE OSTUNI');
  setVal('successDateTime', (slot.date || '20/11/2026') + ' ore ' + (slot.time || '07:55'));

  // Calcolo dinamico termine utile di disdetta (48 ore prima della prenotazione)
  const deadline = calculateCancelDeadline(slot);
  setVal('successCancelDeadlineDate', deadline.dateStr);
  setVal('successCancelDeadlineTime', `Entro le ore ${deadline.timeStr} (48h prima)`);
  setHtml('successDisdettaFullText', `<strong>${deadline.dateStr} alle ore ${deadline.timeStr}</strong>`);

  const bannerText = document.getElementById('successBannerText');
  if (bannerText) {
    if (state.wizard && state.wizard.isModification) {
      bannerText.innerText = 'Data della prenotazione modificata con successo!';
    } else {
      bannerText.innerText = 'Prenotazione effettuata con successo!';
    }
  }
}

// Privacy Modal Controls (Wireframe r3_c1 - Consultazione facoltativa)
function openPrivacyModal() {
  const modal = document.getElementById('wireframeModalOverlay');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
}

function closePrivacyModal() {
  const modal = document.getElementById('wireframeModalOverlay');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function handlePrivacyBackdropClick(e) {
  if (e.target && e.target.id === 'wireframeModalOverlay') {
    closePrivacyModal();
  }
}

function acceptPrivacyFromModal() {
  closePrivacyModal();
  const check = document.getElementById('checkPrivacyConsent');
  if (check) {
    check.checked = true;
    handleStep5CheckboxChange();
  }
}

// Carousels
function shiftNews(direction) {
  const row = document.getElementById('newsCardsRow');
  if (row) {
    row.scrollBy({ left: direction === 'next' ? 280 : -280, behavior: 'smooth' });
  }
}

function shiftDocs(direction) {
  const row = document.getElementById('docsCardsRow');
  if (row) {
    row.scrollBy({ left: direction === 'next' ? 350 : -350, behavior: 'smooth' });
  }
}

// "Torna indietro" navigation — goes back one wizard step
function tornaIndietro() {
  if (state.wizard && state.wizard.isModification && state.currentScreen === 'screen-step-slots') {
    goToScreen('screen-bookings');
    return;
  }

  const stepOrder = [
    'screen-step-beneficiary',
    'screen-step-regime',
    'screen-step-prescription',
    'screen-step-slots',
    'screen-step-recap',
    'screen-step-success'
  ];

  const currentIndex = stepOrder.indexOf(state.currentScreen);
  if (currentIndex > 0) {
    goToScreen(stepOrder[currentIndex - 1]);
  } else if (currentIndex === 0) {
    goToScreen('screen-bookings');
  }
}

// Update "Chiudi ×" visibility based on current screen
function updateTornaIndietro(screenId) {
  const btn = document.getElementById('btnTornaIndietro');
  const container = document.getElementById('tornaIndietroContainer');
  const chiudiBtn = document.getElementById('btnChiudiWizard');

  const wizardScreens = [
    'screen-step-beneficiary',
    'screen-step-regime',
    'screen-step-prescription',
    'screen-step-slots',
    'screen-step-recap',
    'screen-step-success'
  ];

  const isWizard = wizardScreens.includes(screenId);

  if (isWizard) {
    // Show "Chiudi ×" button in page header, hide "Torna indietro"
    if (btn) { btn.classList.remove('visible'); btn.style.display = 'none'; }
    if (container) container.style.display = 'none';
    if (chiudiBtn) chiudiBtn.style.display = 'inline-flex';
  } else {
    // Not a wizard screen: hide both
    if (btn) { btn.classList.remove('visible'); btn.style.display = 'none'; }
    if (container) container.style.display = 'none';
    if (chiudiBtn) chiudiBtn.style.display = 'none';
  }
}

// "Chiudi ×" — Close the booking wizard and return to "Le mie prenotazioni"
function closeBookingToBookings() {
  startNewBooking();
  goToScreen('screen-bookings');
}

// Toggle all ASL checkboxes
function toggleAllASL(masterCheckbox) {
  const checks = document.querySelectorAll('.asl-check');
  checks.forEach(c => c.checked = masterCheckbox.checked);
  const filterPanel = document.getElementById('step4FiltersPanel');
  if (filterPanel && masterCheckbox.checked) {
    filterPanel.classList.remove('step4-filters-error');
  }
  renderSlots();
}



// User pill dropdown menu
function toggleUserMenu() {
  const menu = document.getElementById('userDropdownMenu');
  if (menu) menu.classList.toggle('active');
}

function closeUserMenu() {
  const menu = document.getElementById('userDropdownMenu');
  if (menu) menu.classList.remove('active');
}

// Close user menu and custom datepicker when clicking outside
document.addEventListener('click', (e) => {
  const pill = document.querySelector('.user-pill-btn-v2');
  const menu = document.getElementById('userDropdownMenu');
  if (pill && menu && !pill.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('active');
  }

  const popover = document.getElementById('filterDatePickerPopover');
  const dateGroup = document.querySelector('.filter-date-picker-group');
  if (popover && popover.style.display !== 'none') {
    if (dateGroup && !dateGroup.contains(e.target)) {
      closeFilterDatePicker();
    }
  }
});

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  setupStep4();
  const step3Email = document.getElementById('inputEmail');
  const step3Phone = document.getElementById('inputPhone');
  if (step3Email) step3Email.value = userContacts.email;
  if (step3Phone) step3Phone.value = userContacts.cellulare;
  goToScreen('screen-home');
});


// ==========================================================================
// ASSISTENZA & SUPPORTO FSE HANDLERS
// ==========================================================================
function toggleFaq(faqId) {
  const item = document.getElementById(faqId);
  if (!item) return;
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
  if (!wasActive) {
    item.classList.add('active');
  }
}

function handleAssistenzaInput(fieldId) {
  const field = document.getElementById(fieldId);
  const errMap = {
    'assistenzaEmail': 'errAssistenzaEmail',
    'assistenzaMotivo': 'errAssistenzaMotivo',
    'assistenzaOggetto': 'errAssistenzaOggetto',
    'assistenzaMessaggio': 'errAssistenzaMessaggio'
  };
  if (field) {
    field.classList.remove('assistenza-field-error');
  }
  const errEl = document.getElementById(errMap[fieldId]);
  if (errEl) {
    errEl.style.display = 'none';
  }
}

function submitAssistenzaForm() {
  const emailInput = document.getElementById('assistenzaEmail');
  const motivoSelect = document.getElementById('assistenzaMotivo');
  const oggettoInput = document.getElementById('assistenzaOggetto');
  const msgInput = document.getElementById('assistenzaMessaggio');
  const banner = document.getElementById('assistenzaSuccessBanner');
  const submitBtn = document.getElementById('btnSubmitAssistenza');

  let isValid = true;

  // Validate Email
  const emailVal = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailRegex.test(emailVal)) {
    isValid = false;
    if (emailInput) emailInput.classList.add('assistenza-field-error');
    const err = document.getElementById('errAssistenzaEmail');
    if (err) err.style.display = 'block';
  } else {
    if (emailInput) emailInput.classList.remove('assistenza-field-error');
    const err = document.getElementById('errAssistenzaEmail');
    if (err) err.style.display = 'none';
  }

  // Validate Motivo
  const motivoVal = motivoSelect ? motivoSelect.value.trim() : '';
  if (!motivoVal) {
    isValid = false;
    if (motivoSelect) motivoSelect.classList.add('assistenza-field-error');
    const err = document.getElementById('errAssistenzaMotivo');
    if (err) err.style.display = 'block';
  } else {
    if (motivoSelect) motivoSelect.classList.remove('assistenza-field-error');
    const err = document.getElementById('errAssistenzaMotivo');
    if (err) err.style.display = 'none';
  }

  // Validate Oggetto
  const oggettoVal = oggettoInput ? oggettoInput.value.trim() : '';
  if (!oggettoVal) {
    isValid = false;
    if (oggettoInput) oggettoInput.classList.add('assistenza-field-error');
    const err = document.getElementById('errAssistenzaOggetto');
    if (err) err.style.display = 'block';
  } else {
    if (oggettoInput) oggettoInput.classList.remove('assistenza-field-error');
    const err = document.getElementById('errAssistenzaOggetto');
    if (err) err.style.display = 'none';
  }

  // Validate Messaggio
  const msgVal = msgInput ? msgInput.value.trim() : '';
  if (!msgVal) {
    isValid = false;
    if (msgInput) msgInput.classList.add('assistenza-field-error');
    const err = document.getElementById('errAssistenzaMessaggio');
    if (err) err.style.display = 'block';
  } else {
    if (msgInput) msgInput.classList.remove('assistenza-field-error');
    const err = document.getElementById('errAssistenzaMessaggio');
    if (err) err.style.display = 'none';
  }

  if (!isValid) {
    return;
  }

  // Simulate submission feedback
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Invio in corso...';
  }

  setTimeout(() => {
    if (banner) {
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (oggettoInput) oggettoInput.value = '';
    if (msgInput) msgInput.value = '';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Invia un altro messaggio';
    }
  }, 400);
}


// ==========================================================================
// FILTRI PRENOTAZIONI & MODAL HANDLERS
// ==========================================================================
function updateActiveFilterIndicator(hasActiveFilters, filters) {
  const btnFiltra = document.getElementById('btnFiltraPrenotazioni');
  const filterPillBar = document.getElementById('bookingActiveFiltersBar');

  if (btnFiltra) {
    if (hasActiveFilters) {
      btnFiltra.innerHTML = 'Filtra <span class="filter-count-badge">•</span>';
      btnFiltra.classList.add('has-active-filters');
    } else {
      btnFiltra.innerHTML = 'Filtra';
      btnFiltra.classList.remove('has-active-filters');
    }
  }

  if (filterPillBar) {
    if (hasActiveFilters) {
      const activePills = [];
      if (filters.year) {
        activePills.push(`
          <span class="filter-tag-pill" id="filterPillYear">
            <span class="filter-tag-pill-text">Anno: <strong>${filters.year}</strong></span>
            <button type="button" class="filter-tag-pill-remove" onclick="removeSingleBookingFilter('year')" aria-label="Rimuovi filtro anno ${filters.year}" title="Rimuovi filtro anno">✕</button>
          </span>
        `);
      }
      if (filters.azienda) {
        activePills.push(`
          <span class="filter-tag-pill" id="filterPillAzienda">
            <span class="filter-tag-pill-text">Azienda: <strong>${filters.azienda}</strong></span>
            <button type="button" class="filter-tag-pill-remove" onclick="removeSingleBookingFilter('azienda')" aria-label="Rimuovi filtro azienda ${filters.azienda}" title="Rimuovi filtro azienda">✕</button>
          </span>
        `);
      }
      if (filters.status) {
        activePills.push(`
          <span class="filter-tag-pill" id="filterPillStatus">
            <span class="filter-tag-pill-text">Stato: <strong>${filters.status}</strong></span>
            <button type="button" class="filter-tag-pill-remove" onclick="removeSingleBookingFilter('status')" aria-label="Rimuovi filtro stato ${filters.status}" title="Rimuovi filtro stato">✕</button>
          </span>
        `);
      }

      filterPillBar.style.display = 'flex';
      filterPillBar.innerHTML = `
        <span class="filter-active-summary-label">Filtri attivi:</span>
        ${activePills.join('')}
        <button type="button" class="btn-clear-filters-link" onclick="resetBookingFilters()">Rimuovi tutti ✕</button>
      `;
    } else {
      filterPillBar.style.display = 'none';
      filterPillBar.innerHTML = '';
    }
  }
}

// Rimuove un singolo filtro selezionato cliccando la "x" sulla relativa pillola
function removeSingleBookingFilter(filterKey) {
  if (!state.bookingFilters) return;

  if (filterKey === 'year') {
    state.bookingFilters.year = '';
  } else if (filterKey === 'azienda') {
    state.bookingFilters.azienda = '';
  } else if (filterKey === 'status') {
    state.bookingFilters.status = '';
  }

  // Sincronizza i campi select del modal
  syncFilterInputs(state.bookingFilters.year, state.bookingFilters.azienda, state.bookingFilters.status);

  // Re-renderizza la lista delle prenotazioni
  renderBookings();
}

// Sincronizza i selettori nei modal filtri
function syncFilterInputs(year, azienda, status) {
  document.querySelectorAll('#filterSelectAnno').forEach(el => { el.value = year || ''; });
  document.querySelectorAll('#filterSelectAzienda').forEach(el => { el.value = azienda || ''; });
  document.querySelectorAll('#filterSelectStato').forEach(el => { el.value = status || ''; });
}

function openFilterModal() {
  const modal = document.getElementById('bookingFilterModalOverlay');
  if (!modal) return;

  const filters = state.bookingFilters || { year: '', azienda: '', status: '' };
  syncFilterInputs(filters.year, filters.azienda, filters.status);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFilterModal() {
  const modal = document.getElementById('bookingFilterModalOverlay');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function handleFilterBackdropClick(event) {
  if (event && event.target && event.target.id === 'bookingFilterModalOverlay') {
    closeFilterModal();
  }
}

function applyBookingFilters() {
  const selYear = document.getElementById('filterSelectAnno');
  const selAzienda = document.getElementById('filterSelectAzienda');
  const selStatus = document.getElementById('filterSelectStato');

  state.bookingFilters = {
    year: selYear ? selYear.value : '',
    azienda: selAzienda ? selAzienda.value : '',
    status: selStatus ? selStatus.value : ''
  };

  syncFilterInputs(state.bookingFilters.year, state.bookingFilters.azienda, state.bookingFilters.status);

  closeFilterModal();
  renderBookings();
}

function resetBookingFilters() {
  state.bookingFilters = {
    year: '',
    azienda: '',
    status: ''
  };

  syncFilterInputs('', '', '');

  closeFilterModal();
  renderBookings();
}


/* ==========================================================================
   PROFILO SANITARIO (AREA PERSONALE) LOGIC
   ========================================================================== */

// Recapiti paziente
let userContacts = {
  cellulare: '+39 340 1234567',
  email: 'miriana.pinto@email.it'
};

function saveProfiloRecapiti() {
  const cellInput = document.getElementById('profiloCellulare');
  const emailInput = document.getElementById('profiloEmail');
  const successBanner = document.getElementById('profiloSaveSuccessBanner');

  if (cellInput && emailInput) {
    userContacts.cellulare = cellInput.value.trim();
    userContacts.email = emailInput.value.trim();
    state.user.phone = userContacts.cellulare;
    state.user.email = userContacts.email;

    // Sincronizza i campi contatti nello Step 3 del wizard
    const step3Email = document.getElementById('inputEmail');
    const step3Phone = document.getElementById('inputPhone');
    if (step3Email) step3Email.value = userContacts.email;
    if (step3Phone) step3Phone.value = userContacts.cellulare;

    if (successBanner) {
      successBanner.style.display = 'flex';
      setTimeout(() => {
        successBanner.style.display = 'none';
      }, 5000);
    }
  }
}

function resetProfiloRecapiti() {
  const cellInput = document.getElementById('profiloCellulare');
  const emailInput = document.getElementById('profiloEmail');
  const successBanner = document.getElementById('profiloSaveSuccessBanner');

  if (cellInput) cellInput.value = userContacts.cellulare;
  if (emailInput) emailInput.value = userContacts.email;
  if (successBanner) successBanner.style.display = 'none';
}

// Modal Scegli / Revoca Medico
function openScegliRevocaModal() {
  const modal = document.getElementById('modalScegliRevocaOverlay');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeScegliRevocaModal() {
  const modal = document.getElementById('modalScegliRevocaOverlay');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleScegliRevocaBackdropClick(event) {
  if (event && event.target && event.target.id === 'modalScegliRevocaOverlay') {
    closeScegliRevocaModal();
  }
}

function confirmScegliRevocaMedico() {
  const select = document.getElementById('selectNuovoMedico');
  if (!select || !select.value) {
    alert('Seleziona un medico disponibile per procedere con la scelta.');
    return;
  }
  alert('Richiesta registrata con successo! Il nuovo medico è stato assegnato al tuo profilo.');
  closeScegliRevocaModal();
}

// Modal Chiedi Nuova Esenzione con Autocertificazione
function openChiediEsenzioneModal() {
  const modal = document.getElementById('modalChiediEsenzioneOverlay');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeChiediEsenzioneModal() {
  const modal = document.getElementById('modalChiediEsenzioneOverlay');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleChiediEsenzioneBackdropClick(event) {
  if (event && event.target && event.target.id === 'modalChiediEsenzioneOverlay') {
    closeChiediEsenzioneModal();
  }
}

function submitAutocertificazioneEsenzione() {
  const select = document.getElementById('selectCodiceEsenzione');
  const check = document.getElementById('checkAutocertificazione');

  if (!select || !select.value) {
    alert('Seleziona un codice di esenzione.');
    return;
  }
  if (!check || !check.checked) {
    alert('Devi confermare la dichiarazione di responsabilità.');
    return;
  }

  alert(`La richiesta di esenzione (${select.value}) è stata trasmessa con successo al sistema regionale per le verifiche.`);
  closeChiediEsenzioneModal();
}

// Modal Revoca Esenzione
function openRevocaEsenzioneModal() {
  const modal = document.getElementById('modalRevocaEsenzioneOverlay');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRevocaEsenzioneModal() {
  const modal = document.getElementById('modalRevocaEsenzioneOverlay');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleRevocaEsenzioneBackdropClick(event) {
  if (event && event.target && event.target.id === 'modalRevocaEsenzioneOverlay') {
    closeRevocaEsenzioneModal();
  }
}
