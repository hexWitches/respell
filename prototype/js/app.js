/**
 * PugliaSalute Redesign Prototype - Interactive Logic (Strict Wireframe v1 Edition)
 */

// Application State
const state = {
  version: 'v1', // 'v1' (Base Wireframe) or 'v2' (Redesign Disponibilità & Calendario)
  currentScreen: 'screen-home',
  user: {
    name: 'MIRIANA PINTO',
    cf: 'PNTMRN90A41A662K',
    phone: '+1234567890',
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

// Version 1 Available appointment slots (original reference wireframe)
const v1AvailableSlots = [
  {
    id: 'slot-1',
    azienda: 'Asl Brindisi',
    struttura: 'OSPEDALE OSTUNI',
    address: 'VIA LUIGI MICOLI - OSTUNI (BR)',
    date: '13/11/2026',
    time: '07:55',
    dateTime: '13/11/2026 ore 07:55',
    ambulatorio: 'VIA LUIGI MICOLI - OSTUNI (BR)',
    sedeUnita: 'SEDE: VIA VILLAFRANCA UNITA: VIA LUIGI MICCOLI - OSTUNI (BR)',
    firstAvailable: false
  },
  {
    id: 'slot-2',
    azienda: 'Asl Barletta-Andria-Trani',
    struttura: 'POL. MARGHERITA DI SAVOIA',
    address: 'Via Ospedale 3, Margherita di Savoia (BT)',
    date: '03/12/2026',
    time: '08:30',
    dateTime: '03/12/2026 ore 08:30',
    ambulatorio: 'VIA OSPEDALE 3 - MARGHERITA DI SAVOIA (BT)',
    sedeUnita: 'SEDE: VIA OSPEDALE 3 - MARGHERITA DI SAVOIA (BT)',
    firstAvailable: false
  }
];

// Version 2 appointment slots from the fake repository (prototype/js/fake-repository.js)
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

  // Update discreet dock selector
  const dockSel = document.getElementById('dockScreenSelect');
  if (dockSel && dockSel.value !== screenId) {
    dockSel.value = screenId;
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

      if (screenId === 'screen-step-slots') {
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

// Switch prototype version ('v1' or 'v2')
function setPrototypeVersion(ver) {
  const targetVer = (ver === 'v2') ? 'v2' : 'v1';
  state.version = targetVer;
  try {
    localStorage.setItem('fse_prototype_version', targetVer);
  } catch (e) {
    // Ignore storage restriction
  }

  const dockSel = document.getElementById('dockVersionSelect');
  if (dockSel && dockSel.value !== targetVer) {
    dockSel.value = targetVer;
  }

  setupStep4ForVersion(targetVer);
  updateTornaIndietro(state.currentScreen);

  if (state.currentScreen === 'screen-step-slots') {
    renderSlots();
  } else if (state.currentScreen === 'screen-step-recap') {
    updateRecapStep();
  } else if (state.currentScreen === 'screen-step-success') {
    updateSuccessStep();
  }
}

// Setup Step 4 initial filters and dropdowns based on version
function setupStep4ForVersion(ver) {
  state.version = ver;
  state.wizard.selectedSlot = null;

  const master = document.getElementById('aslTutto');
  if (master) master.checked = false;

  // In entrambe le versioni nessun filtro ASL è attivo di default
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

  const countBadge = document.getElementById('slotsCountBadge');
  if (countBadge) countBadge.style.display = 'none';
}

// Reset Step 4 filters and inputs
function resetStep4Filters() {
  setupStep4ForVersion(state.version || 'v1');
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

// Step 4: Render Slots (Version Dispatcher)
function renderSlots() {
  if (state.version === 'v1') {
    renderSlotsV1();
  } else {
    renderSlotsV2();
  }
}

// Step 4 Version 1: Dynamic Slots from fake-repository.js with empty guidance state
function renderSlotsV1() {
  const container = document.getElementById('slotsWireframeList');
  const countBadge = document.getElementById('slotsCountBadge');
  const selectStruttura = document.getElementById('selectStruttura');
  const inputDateFrom = document.getElementById('inputDateFrom');
  if (!container) return;

  const allSlots = getRepositorySlots();

  // Get all checked ASL checkboxes
  const checkedBoxes = Array.from(document.querySelectorAll('.asl-check:checked'));
  const checkedAsls = checkedBoxes.map(cb => (cb.value || cb.parentElement.textContent).trim());

  // Update structure select options dynamically
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
    const fromDate = new Date(dateFromVal);
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

// Step 4 Version 2: Dynamic Fake Repository Render with Empty Guidance State
function renderSlotsV2() {
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
    const fromDate = new Date(dateFromVal);
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
  if (state.version === 'v2') {
    openAvailModal(slotId);
  } else {
    openAvailV1Modal(slotId);
  }
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
// MODALE CALENDARIO DISPONIBILITÀ - VERSIONE 1 (Matching media_3745fb8f)
// ==============================================================================
const availModalV1State = {
  slotId: null,
  selectedDateTime: '',
  options: []
};

function openAvailV1Modal(slotId) {
  availModalV1State.slotId = slotId;
  const allSlots = getRepositorySlots();
  const slot = allSlots.find(s => s.id === slotId) || state.wizard.selectedSlot;

  // Recipe & performance details
  const nreEl = document.getElementById('availV1ModalNRE');
  const prestEl = document.getElementById('availV1ModalPrestazioni');
  if (nreEl) {
    nreEl.innerText = state.wizard.selectedExamCode || '160A24680453583';
  }
  if (prestEl) {
    prestEl.innerText = (state.wizard.selectedExam === 'cardio' ? '1 di 1' : '3 di 3');
  }

  // Determine current slot date/time
  const currentDateTime = slot ? (slot.dateTime || `${slot.date} ore ${slot.time}`) : '09/12/2026 ore 08:30';
  availModalV1State.selectedDateTime = currentDateTime;

  // Generate 10 alternative date options (5 on left, 5 on right)
  availModalV1State.options = generateV1DateOptions(slot, currentDateTime);

  // Render modal table rows
  renderAvailV1Table();

  // Show modal
  const modal = document.getElementById('availModalV1Overlay');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
}

function generateV1DateOptions(slot, currentDateTime) {
  let baseDate = null;
  let baseTime = '08:30';

  if (slot && slot.date) {
    baseDate = parseSlotDate(slot.date, slot.dateISO);
  }
  if (slot && slot.time) {
    baseTime = slot.time;
  }

  // Ensure baseDate is at least today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!baseDate || isNaN(baseDate.getTime()) || baseDate < today) {
    baseDate = new Date(today);
  }

  const options = [];
  const cur = new Date(baseDate);

  // Collect 10 working days (Mon-Fri)
  let count = 0;
  while (count < 10) {
    const dayOfWeek = cur.getDay(); // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const day = String(cur.getDate()).padStart(2, '0');
      const month = String(cur.getMonth() + 1).padStart(2, '0');
      const year = cur.getFullYear();
      const dtStr = `${day}/${month}/${year} ore ${baseTime}`;
      options.push(dtStr);
      count++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  // Ensure currentDateTime is included in options
  if (currentDateTime && !options.includes(currentDateTime)) {
    options[0] = currentDateTime;
  }

  return options;
}

function renderAvailV1Table() {
  const container = document.getElementById('availV1TableBody');
  if (!container) return;

  const options = availModalV1State.options || [];
  // 5 rows, each with 2 columns: left is index i, right is index i + 5
  let html = '';
  for (let i = 0; i < 5; i++) {
    const optLeft = options[i] || '';
    const optRight = options[i + 5] || '';

    const isLeftSelected = (optLeft === availModalV1State.selectedDateTime);
    const isRightSelected = (optRight === availModalV1State.selectedDateTime);

    html += `
      <div class="avail-v1-table-row">
        <div class="avail-v1-cell ${optLeft ? '' : 'avail-v1-cell-empty'}">
          <span class="avail-v1-cell-date">${optLeft}</span>
          ${optLeft ? `
            <button type="button" class="avail-v1-check-btn ${isLeftSelected ? 'selected' : ''}" onclick="selectAvailV1DateTime('${optLeft}')" aria-label="Seleziona data ${optLeft}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          ` : ''}
        </div>
        <div class="avail-v1-cell ${optRight ? '' : 'avail-v1-cell-empty'}">
          <span class="avail-v1-cell-date">${optRight}</span>
          ${optRight ? `
            <button type="button" class="avail-v1-check-btn ${isRightSelected ? 'selected' : ''}" onclick="selectAvailV1DateTime('${optRight}')" aria-label="Seleziona data ${optRight}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

function selectAvailV1DateTime(dateTimeStr) {
  availModalV1State.selectedDateTime = dateTimeStr;
  renderAvailV1Table();
}

function confirmAvailV1Modal() {
  const allSlots = getRepositorySlots();
  let targetSlot = allSlots.find(s => s.id === availModalV1State.slotId);
  if (!targetSlot) {
    targetSlot = state.wizard.selectedSlot || allSlots[0];
  }

  if (targetSlot && availModalV1State.selectedDateTime) {
    const parts = availModalV1State.selectedDateTime.split(' ore ');
    if (parts.length === 2) {
      targetSlot.date = parts[0].trim();
      targetSlot.time = parts[1].trim();
      targetSlot.dateTime = availModalV1State.selectedDateTime;
    } else {
      targetSlot.dateTime = availModalV1State.selectedDateTime;
    }
    state.wizard.selectedSlot = targetSlot;
  }

  closeAvailV1Modal();
  renderSlots();
}

function closeAvailV1Modal() {
  const modal = document.getElementById('availModalV1Overlay');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function handleAvailV1BackdropClick(e) {
  if (e.target && e.target.id === 'availModalV1Overlay') {
    closeAvailV1Modal();
  }
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
  setVal('recapData', slot.date || '13/11/2026');
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
  const defaultSlot = getRepositorySlots()[0] || {};
  const slot = state.wizard.selectedSlot || defaultSlot;

  if (state.wizard && state.wizard.isModification && state.wizard.editingBookingId) {
    state.wizard.cupCode = state.wizard.editingBookingId;
    const existing = state.bookings.find(b => b.id === state.wizard.editingBookingId);
    if (existing) {
      existing.date = slot.date || existing.date;
      existing.time = slot.time || existing.time;
      existing.dateTime = (slot.date || existing.date) + ' Ore ' + (slot.time || existing.time);
      existing.hospital = slot.struttura || existing.hospital;
      if (slot.azienda) existing.azienda = slot.azienda;
      existing.status = 'Confermato (Data modificata)';
    }
  } else {
    state.wizard.cupCode = '2026649029';

    // Aggiunge la nuova prenotazione alla lista personale
    const newBooking = {
      id: state.wizard.cupCode,
      date: slot.date || '13/11/2026',
      time: slot.time || '07:55',
      dateTime: (slot.date || '13/11/2026') + ' Ore ' + (slot.time || '07:55'),
      exam: (state.wizard.selectedExam === 'cardio' ? 'INSULINA (CURVA DA CARICO)' : 'PROFILO LIPIDICO (COLESTEROLO E TRIGLICERIDI)'),
      hospital: slot.struttura || 'OSPEDALE OSTUNI',
      bookingType: 'SSN con Ricetta Dematerializzata',
      cancelDeadline: '11/11/2026',
      status: 'Confermato'
    };

    // Se non già presente, aggiungila
    if (!state.bookings.some(b => b.id === newBooking.id)) {
      state.bookings.unshift(newBooking);
    }
  }

  // Naviga al 6° Passo (Riepilogo)
  goToScreen('screen-step-success');
}

// Step 6: Update Success (Riepilogo - Matching Image 2)
function updateSuccessStep() {
  const defaultSlot = getRepositorySlots()[0] || {};
  const slot = state.wizard.selectedSlot || defaultSlot;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  setVal('successBookingId', 'NUMERO PRENOTAZIONE: ' + (state.wizard.cupCode || '2026649029'));
  setVal('successHospital', slot.struttura || 'OSPEDALE OSTUNI');
  setVal('successDateTime', (slot.date || '13/11/2026') + ' ore ' + (slot.time || '07:55'));

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

// Update "Torna indietro" / "Chiudi ×" visibility based on current screen and version
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

  if (isWizard && state.version === 'v2') {
    // Version 2: show "Chiudi ×" button in page header, hide "Torna indietro"
    if (btn) { btn.classList.remove('visible'); btn.style.display = 'none'; }
    if (container) container.style.display = 'none';
    if (chiudiBtn) chiudiBtn.style.display = 'inline-flex';
  } else if (isWizard) {
    // Version 1: show "Torna indietro", hide "Chiudi ×"
    if (btn) { btn.classList.add('visible'); btn.style.display = 'inline-block'; }
    if (container) container.style.display = 'block';
    if (chiudiBtn) chiudiBtn.style.display = 'none';
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

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
  const pill = document.querySelector('.user-pill-btn-v2');
  const menu = document.getElementById('userDropdownMenu');
  if (pill && menu && !pill.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('active');
  }
});

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  let savedVersion = 'v1';
  try {
    savedVersion = localStorage.getItem('fse_prototype_version') || 'v1';
  } catch (e) { }
  setPrototypeVersion(savedVersion);
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
