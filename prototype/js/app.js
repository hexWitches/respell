/**
 * PugliaSalute Redesign Prototype - Interactive Logic (Strict Wireframe v1 Edition)
 * Usability & User Experience 2025/26
 * - No Emojis
 * - No Pre-selected Cards
 * - Progress Bar with Dynamic Color & Checkmark (Non-clickable)
 * - 6th Step Named 'Riepilogo'
 * - Exact Buttons ('Prosegui', 'Indietro', etc.) and Functions
 */

// Application State
const state = {
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
    cupCode: '2026649029'
  },
  bookings: [
    {
      id: '2026699059',
      date: '18/08/2026',
      time: '08:15',
      dateTime: '18/08/2026 Ore 08:15',
      exam: 'PROTEINE [S]',
      hospital: 'OSPEDALE CIVILE - MARTINA FRANCA',
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
      bookingType: 'SSN con Ricetta Rossa',
      cancelDeadline: '-',
      status: 'Effettuato pagato'
    }
  ]
};

// Available appointment slots for Step 4 (matching reference wireframe Image 1)
const availableSlots = [
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
    beneficiary: null,
    delegateName: '',
    delegateCF: '',
    regime: null,
    selectedExam: null,
    selectedExamCode: '',
    selectedSlot: null,
    cupCode: '2026649029'
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
  if (chkPriv) chkPriv.checked = false;

  goToScreen('screen-step-beneficiary');
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
  const brandPublic = document.getElementById('brandPublic');
  const brandFSE = document.getElementById('brandFSE');
  const headerFseLinks = document.getElementById('headerFseLinks');
  const btnHeaderSearch = document.getElementById('btnHeaderSearch');
  const subNavbarBar = document.getElementById('subNavbarBar');

  const navLinkFsePrenotazioni = document.getElementById('navLinkFsePrenotazioni');
  const navLinkFseDashboard = document.getElementById('navLinkFseDashboard');

  // Reset
  if (subtitleContainer) subtitleContainer.style.display = 'none';
  if (stepper) stepper.style.display = 'none';
  if (breadcrumb) breadcrumb.style.display = 'none';

  // Reset torna indietro for non-wizard screens
  if (!screenId.startsWith('screen-step-')) {
    const tornaContainer = document.getElementById('tornaIndietroContainer');
    if (tornaContainer) tornaContainer.style.display = 'none';
    const tornaBtn = document.getElementById('btnTornaIndietro');
    if (tornaBtn) tornaBtn.style.display = 'none';
  }

  if (screenId === 'screen-home' || screenId === 'screen-login') {
    // Portale Pubblico / Accesso (Matching media_1794782458951_fc4d4c90.png)
    if (topWindowBar) topWindowBar.style.display = 'flex';
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
    if (topWindowBar) topWindowBar.style.display = 'none';
    if (brandPublic) brandPublic.style.display = 'none';
    if (brandFSE) brandFSE.style.display = 'flex';
    if (headerFseLinks) headerFseLinks.style.display = 'flex';
    if (btnHeaderSearch) btnHeaderSearch.style.display = 'none';
    if (subNavbarBar) subNavbarBar.style.display = 'none';

    const contentZone = document.querySelector('.page-content-zone');
    if (contentZone) contentZone.style.backgroundColor = 'var(--ps-bg-bottom-ice)';

    if (navLinkFseDashboard) navLinkFseDashboard.classList.remove('active');
    if (navLinkFsePrenotazioni) navLinkFsePrenotazioni.classList.remove('active');

    if (screenId === 'screen-fse') {
      if (navLinkFseDashboard) navLinkFseDashboard.classList.add('active');
      if (pageTopZone) pageTopZone.style.display = 'none'; // Area Personale has its own header
    } else if (screenId === 'screen-bookings') {
      if (navLinkFsePrenotazioni) navLinkFsePrenotazioni.classList.add('active');
      if (pageTopZone) pageTopZone.style.display = 'none'; // Le mie prenotazioni has its own header
      renderBookings();
    } else if (screenId.startsWith('screen-step-')) {
      if (navLinkFsePrenotazioni) navLinkFsePrenotazioni.classList.add('active');
      if (pageTopZone) pageTopZone.style.display = 'block';
      if (heading) heading.innerText = 'Nuova prenotazione';
      if (stepper) stepper.style.display = 'flex';

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
        renderSlots();
      } else if (screenId === 'screen-step-recap') {
        updateRecapStep();
      } else if (screenId === 'screen-step-success') {
        updateSuccessStep();
      }
    } else if (screenId === 'screen-spec-guide') {
      if (topWindowBar) topWindowBar.style.display = 'flex';
      if (pageTopZone) pageTopZone.style.display = 'block';
      if (breadcrumb) {
        breadcrumb.style.display = 'block';
        breadcrumb.innerText = 'PugliaSalute > Specifiche Componenti';
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

  if (state.bookings.length === 0) {
    container.innerHTML = `
      <div style="background: white; border: 1px dashed var(--ps-border-color); padding: 32px; text-align: center; color: var(--ps-text-muted);">
        Nessuna prenotazione presente.
      </div>
    `;
    return;
  }

  container.innerHTML = state.bookings.map(b => `
    <div class="booking-row-card">
      <div class="booking-details-grid-v2">
        <div class="booking-grid-col">
          <div class="booking-detail-row">
            <span class="booking-detail-label">Sede appuntamento</span>
            <span class="booking-detail-value">${b.hospital}</span>
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
            <span class="booking-detail-value">${b.cancelDeadline || ''}</span>
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
          <button class="btn-booking-action" onclick="alert('Modifica prenotazione ${b.id}')">Modifica</button>
          <button class="btn-booking-action" onclick="cancelBooking('${b.id}')">Disdici</button>
        </div>
        <a class="link-vedi-dettagli" onclick="alert('Dettagli appuntamento ${b.id}: promemoria e indicazioni per l\\'accesso.')">Vedi Dettagli &rarr;</a>
      </div>
    </div>
  `).join('');
}

function cancelBooking(id) {
  const ok = confirm(`Confermi di voler disdire la prenotazione ${id}?\nRicorda che la disdetta va comunicata almeno 48 ore prima per evitare la sanzione regionale.`);
  if (ok) {
    state.bookings = state.bookings.filter(b => b.id !== id);
    renderBookings();
    alert(`Prenotazione ${id} annullata.`);
  }
}

// Choice Card Selections
function setBeneficiaryChoice(type) {
  state.wizard.beneficiary = type;
  const me = document.getElementById('choiceBeneficiaryMe');
  const other = document.getElementById('choiceBeneficiaryOther');
  if (me) {
    me.classList.toggle('selected', type === 'me');
    me.setAttribute('aria-checked', type === 'me' ? 'true' : 'false');
  }
  if (other) {
    other.classList.toggle('selected', type === 'other');
    other.setAttribute('aria-checked', type === 'other' ? 'true' : 'false');
  }

  const delegationBox = document.getElementById('delegationBox');
  if (delegationBox) {
    delegationBox.style.display = type === 'other' ? 'block' : 'none';
  }
}

function proceedFromStep1() {
  if (!state.wizard.beneficiary) {
    alert('Seleziona per chi stai effettuando la prenotazione per proseguire.');
    return;
  }
  goToScreen('screen-step-regime');
}

function setRegimeChoice(type) {
  state.wizard.regime = type;
  const ssn = document.getElementById('choiceRegimeSSN');
  const alpi = document.getElementById('choiceRegimeALPI');
  if (ssn) {
    ssn.classList.toggle('selected', type === 'ssn');
    ssn.setAttribute('aria-checked', type === 'ssn' ? 'true' : 'false');
  }
  if (alpi) {
    alpi.classList.toggle('selected', type === 'alpi');
    alpi.setAttribute('aria-checked', type === 'alpi' ? 'true' : 'false');
  }
}

function proceedFromStep2() {
  if (!state.wizard.regime) {
    alert('Seleziona il regime con cui desideri effettuare la prenotazione per proseguire.');
    return;
  }
  goToScreen('screen-step-prescription');
}

function setPrescriptionCard(examType) {
  state.wizard.selectedExam = examType;
  const isCardio = examType === 'cardio';
  const c1 = document.getElementById('prescCard1');
  const c2 = document.getElementById('prescCard2');
  if (c1) c1.classList.toggle('selected', isCardio);
  if (c2) c2.classList.toggle('selected', !isCardio);

  state.wizard.exam = 'INSULINA (CURVA DA CARICO O DOPO TEST FARMACOLOGICI, MAX. 5)';
  state.wizard.examCode = '67001';
}

function proceedFromStep3() {
  if (!state.wizard.selectedExam) {
    alert('Seleziona una delle ricette trovate per proseguire.');
    return;
  }
  goToScreen('screen-step-slots');
}

// Step 4: Render Slots as Table (Matching Image 1)
function renderSlots() {
  const container = document.getElementById('slotsWireframeList');
  if (!container) return;

  let html = `
    <div class="slot-table-header">
      <div style="width: 36px;"></div>
      <div>Azienda sanitaria</div>
      <div>Struttura</div>
      <div>Data e ora</div>
      <div style="width: 140px; text-align: right;"></div>
    </div>
  `;

  html += availableSlots.map(slot => {
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
        </div>
        <div class="slot-cell-datetime">
          <div class="slot-date-line">${slot.date}</div>
          <div class="slot-time-line">${slot.time}</div>
        </div>
        <div class="slot-cell-action">
          <button class="btn-scegli-altra-data" onclick="event.stopPropagation(); alert('Ricerca altre date disponibili per ${slot.struttura}');">Scegli altra data</button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

function selectSlot(slotId) {
  const found = availableSlots.find(s => s.id === slotId);
  if (found) {
    state.wizard.selectedSlot = found;
    renderSlots();
  }
}

function proceedFromStep4() {
  if (!state.wizard.selectedSlot) {
    alert('Seleziona una delle disponibilità per proseguire.');
    return;
  }
  goToScreen('screen-step-recap');
}

// Step 5: Update Recap with slot details (Matching Image 8)
function updateRecapStep() {
  const slot = state.wizard.selectedSlot || availableSlots[0];

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  setVal('recapNRE', '160A24680453583');
  setVal('recapPrestazioni', '3');
  setVal('recapData', slot.date || '13/11/2026');
  setVal('recapOra', slot.time || '7:55');
  setVal('recapAzienda', slot.azienda || 'ASL Brindisi');
  setVal('recapStruttura', slot.struttura || 'OSPEDALE OSTUNI');
  setVal('recapAmbulatorio', slot.ambulatorio || 'VIA LUIGI MICOLI - OSTUNI (BR)');
  setVal('recapStrutturaAlt', slot.sedeUnita || 'SEDE: VIA VILLAFRANCA UNITA: VIA LUIGI MICCOLI - OSTUNI (BR)');
}

function proceedFromStep5() {
  const checkNote = document.getElementById('checkNoteOperatore');
  const checkPrivacy = document.getElementById('checkPrivacyConsent');

  if (checkNote && !checkNote.checked) {
    alert('Per proseguire è necessario dichiarare di aver preso visione delle Note Operatore.');
    return;
  }
  if (checkPrivacy && !checkPrivacy.checked) {
    alert('Per proseguire è necessario dichiarare di aver preso visione dell\'informativa sul trattamento dei dati personali.');
    return;
  }

  // Genera o conferma codice prenotazione (Matching Image 2: 2026649029)
  state.wizard.cupCode = '2026649029';

  // Aggiunge la prenotazione alla lista personale
  const slot = state.wizard.selectedSlot || availableSlots[0];
  const newBooking = {
    id: state.wizard.cupCode,
    date: slot.date || '13/11/2026',
    time: slot.time || '07:55',
    dateTime: (slot.date || '13/11/2026') + ' Ore ' + (slot.time || '07:55'),
    exam: 'INSULINA (CURVA DA CARICO)',
    hospital: slot.struttura || 'OSPEDALE OSTUNI',
    bookingType: 'SSN con Ricetta Dematerializzata',
    cancelDeadline: '11/11/2026',
    status: 'Confermato'
  };

  // Se non già presente, aggiungila
  if (!state.bookings.some(b => b.id === newBooking.id)) {
    state.bookings.unshift(newBooking);
  }

  // Naviga al 6° Passo (Riepilogo)
  goToScreen('screen-step-success');
}

// Step 6: Update Success (Riepilogo - Matching Image 2)
function updateSuccessStep() {
  const slot = state.wizard.selectedSlot || availableSlots[0];
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  setVal('successBookingId', 'NUMERO PRENOTAZIONE: ' + (state.wizard.cupCode || '2026649029'));
  setVal('successHospital', slot.struttura || 'OSPEDALE OSTUNI');
  setVal('successDateTime', (slot.date || '13/11/2026') + ' ore ' + (slot.time || '07:55'));
}

// Privacy Modal Controls (Wireframe r3_c1)
function openPrivacyModal() {
  const modal = document.getElementById('wireframeModalOverlay');
  if (modal) modal.classList.add('active');
}

function closePrivacyModal() {
  const modal = document.getElementById('wireframeModalOverlay');
  if (modal) modal.classList.remove('active');
}

function acceptPrivacyFromModal() {
  closePrivacyModal();
  const check = document.getElementById('checkPrivacyConsent');
  if (check) check.checked = true;
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
    row.scrollBy({ left: direction === 'next' ? 280 : -280, behavior: 'smooth' });
  }
}

// "Torna indietro" navigation — goes back one wizard step
function tornaIndietro() {
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

// Update "Torna indietro" visibility based on current screen
function updateTornaIndietro(screenId) {
  const btn = document.getElementById('btnTornaIndietro');
  const container = document.getElementById('tornaIndietroContainer');
  if (!btn || !container) return;

  const showOnScreens = [
    'screen-step-beneficiary',
    'screen-step-regime',
    'screen-step-prescription',
    'screen-step-slots',
    'screen-step-recap',
    'screen-step-success'
  ];

  if (showOnScreens.includes(screenId)) {
    btn.classList.add('visible');
    btn.style.display = 'inline-block';
    container.style.display = 'block';
  } else {
    btn.classList.remove('visible');
    btn.style.display = 'none';
    container.style.display = 'none';
  }
}

// Toggle all ASL checkboxes
function toggleAllASL(masterCheckbox) {
  const checks = document.querySelectorAll('.asl-check');
  checks.forEach(c => c.checked = masterCheckbox.checked);
}

// Start a new booking from the success screen
function startNewBooking() {
  // Reset wizard state to defaults shown in wireframes
  state.wizard.beneficiary = 'me';
  state.wizard.regime = 'ssn';
  state.wizard.selectedExam = 'cardio';
  state.wizard.selectedSlot = availableSlots[0];
  state.wizard.cupCode = '2026649029';

  const bMe = document.getElementById('choiceBeneficiaryMe');
  if (bMe) bMe.classList.add('selected');
  const bOther = document.getElementById('choiceBeneficiaryOther');
  if (bOther) bOther.classList.remove('selected');

  const rSSN = document.getElementById('choiceRegimeSSN');
  if (rSSN) rSSN.classList.add('selected');
  const rALPI = document.getElementById('choiceRegimeALPI');
  if (rALPI) rALPI.classList.remove('selected');

  const p1 = document.getElementById('prescCard1');
  if (p1) p1.classList.add('selected');
  const p2 = document.getElementById('prescCard2');
  if (p2) p2.classList.remove('selected');

  const check1 = document.getElementById('checkNoteOperatore');
  if (check1) check1.checked = true;
  const check2 = document.getElementById('checkPrivacyConsent');
  if (check2) check2.checked = true;

  goToScreen('screen-step-beneficiary');
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
  goToScreen('screen-home');
});
