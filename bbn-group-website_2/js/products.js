// BBN Group — product catalogue + enquiry builder
// Product data migrated from the previous bbngroup.com.au site.

var CATALOGUE = [
  { id: 'forged-clamps', name: 'Forged Clamps', blurb: 'Drop forged couplers for structural scaffold connections.', items: [
    'Double Coupler', 'Dual Purpose Double Coupler', 'Dual Purpose Swivel Coupler',
    'Forged Girder Coupler', 'Putlog Coupler', 'Swivel Coupler'
  ]},
  { id: 'pressed-steel-clamps', name: 'Pressed Steel Clamps', blurb: 'Pressed couplers and pins for general connections.', items: [
    'Fencing Coupler', 'Joint Pin'
  ]},
  { id: 'quick-lock-system', name: 'Quick Lock System', blurb: 'Fast modular scaffolding components.', items: [
    '1 Board Hop-Up', '2 Board Hop-Up', 'Braces', 'Ledger', 'Tie Bar', 'Transom', 'Vertical Standard'
  ]},
  { id: 'jacks-base-plates', name: 'Jacks & Base Plates', blurb: 'Founding and tying hardware for every scaffold.', items: [
    'Adjustable Jacks (Pipe OD 38mm)', 'Base Plates', 'Wall Tie Bracket'
  ]},
  { id: 'props-column-clamps', name: 'Props & Column Clamps', blurb: 'Structural support for formwork and slabs.', items: [
    'Column Clamp', 'Props'
  ]},
  { id: 'steel-boards', name: 'Steel Boards', blurb: 'Durable steel working platforms.', items: [
    'Internal Corner Panel', 'Steel Boards'
  ]},
  { id: 'special-products', name: 'Special Products', blurb: 'Specialised components and accessories.', items: [
    'Aluminium Claw', 'Aluminium Spigot', 'Casted Ring Nut', 'Forged Ring Bolt', 'Forged Wedge',
    'Frame Ring', 'Pallet Bowl', 'Pig Tails', 'Ready Lock Transom', 'Scaffolding Leather Kit',
    'Steel Pallet', 'Tension Pin', 'Toe Board Bracket', 'Universal Bracket', 'Universal Sleeve'
  ]},
  { id: 'fencing-site-supplies', name: 'Fencing & Site Supplies', blurb: 'Temporary fencing and consumables for site.', items: [
    'Temporary Fence', 'Clamps for Fencing', 'Fence Panel Shoes', 'Shade Cloth', 'Uni-Mesh',
    'MIG Wire', 'Tie Wire', 'Steel Strapping'
  ]}
];

(function () {
  var mount = document.getElementById('catalogue');
  var enquiry = {}; // name -> qty

  /* ---------- render catalogue ---------- */
  function slug(n) {
    return n.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-');
  }
  var html = '';
  CATALOGUE.forEach(function (cat) {
    html += '<div class="cat-block" id="' + cat.id + '">';
    html += '<div class="cat-head reveal"><p class="label">' + cat.name + '</p><p class="cat-blurb">' + cat.blurb + '</p></div>';
    html += '<div class="prod-grid">';
    cat.items.forEach(function (name) {
      var safe = name.replace(/"/g, '&quot;');
      html += '<article class="prod-card reveal">' +
        '<div class="prod-media"><img src="images/products/' + slug(name) + '.jpg" alt="' + safe + '" loading="lazy" onerror="this.src=\'images/product-ph.svg\'"></div>' +
        '<h3>' + name + '</h3>' +
        '<div class="prod-actions">' +
          '<div class="qty"><button type="button" class="q-minus" aria-label="Decrease quantity">−</button>' +
          '<input type="number" min="1" max="9999" value="1" aria-label="Quantity for ' + safe + '">' +
          '<button type="button" class="q-plus" aria-label="Increase quantity">+</button></div>' +
          '<button type="button" class="add-btn" data-name="' + safe + '">Add to Enquiry</button>' +
        '</div></article>';
    });
    html += '</div></div>';
  });
  mount.insertAdjacentHTML('beforeend', html);

  // observe the newly added reveal elements (main.js ran before us)
  var io2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io2.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  mount.querySelectorAll('.reveal').forEach(function (el) { io2.observe(el); });

  /* ---------- enquiry state ---------- */
  var fab = document.getElementById('enquiryFab');
  var fabCount = document.getElementById('fabCount');
  var drawer = document.getElementById('enquiryDrawer');
  var veil = document.getElementById('drawerVeil');
  var itemsEl = document.getElementById('drawerItems');
  var itemsField = document.getElementById('itemsField');

  function count() {
    return Object.keys(enquiry).length;
  }

  function refresh() {
    var n = count();
    fab.hidden = n === 0 && drawer.getAttribute('aria-hidden') === 'true';
    fabCount.textContent = n;
    if (n === 0) {
      itemsEl.innerHTML = '<p class="drawer-empty">No items yet. Add products from the catalogue.</p>';
    } else {
      var rows = '';
      Object.keys(enquiry).forEach(function (name) {
        var safe = name.replace(/"/g, '&quot;');
        rows += '<div class="drawer-row">' +
          '<span class="dr-name">' + name + '</span>' +
          '<div class="qty qty-sm"><button type="button" class="dq-minus" data-name="' + safe + '" aria-label="Decrease">−</button>' +
          '<span class="dr-qty">' + enquiry[name] + '</span>' +
          '<button type="button" class="dq-plus" data-name="' + safe + '" aria-label="Increase">+</button></div>' +
          '<button type="button" class="dr-remove" data-name="' + safe + '" aria-label="Remove ' + safe + '">×</button>' +
          '</div>';
      });
      itemsEl.innerHTML = rows;
    }
    itemsField.value = Object.keys(enquiry).map(function (name) {
      return enquiry[name] + ' x ' + name;
    }).join('\n');
  }

  function openDrawer() {
    drawer.setAttribute('aria-hidden', 'false');
    veil.hidden = false;
    refresh();
  }
  function closeDrawer() {
    drawer.setAttribute('aria-hidden', 'true');
    veil.hidden = true;
    refresh();
  }

  /* ---------- events ---------- */
  mount.addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList.contains('q-minus') || t.classList.contains('q-plus')) {
      var input = t.parentElement.querySelector('input');
      var v = parseInt(input.value, 10) || 1;
      input.value = Math.max(1, v + (t.classList.contains('q-plus') ? 1 : -1));
    }
    if (t.classList.contains('add-btn')) {
      var name = t.getAttribute('data-name');
      var qty = parseInt(t.parentElement.querySelector('input').value, 10) || 1;
      enquiry[name] = (enquiry[name] || 0) + qty;
      t.textContent = 'Added ✓';
      setTimeout(function () { t.textContent = 'Add to Enquiry'; }, 1200);
      refresh();
      fab.hidden = false;
      fab.classList.add('pulse');
      setTimeout(function () { fab.classList.remove('pulse'); }, 500);
    }
  });

  itemsEl.addEventListener('click', function (e) {
    var t = e.target;
    var name = t.getAttribute('data-name');
    if (!name) return;
    if (t.classList.contains('dq-plus')) enquiry[name]++;
    if (t.classList.contains('dq-minus')) enquiry[name] = Math.max(1, enquiry[name] - 1);
    if (t.classList.contains('dr-remove')) delete enquiry[name];
    refresh();
  });

  fab.addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  veil.addEventListener('click', closeDrawer);

  document.getElementById('enquiryForm').addEventListener('submit', function (e) {
    if (count() === 0) {
      e.preventDefault();
      itemsEl.innerHTML = '<p class="drawer-empty" style="color:var(--red);">Add at least one product before sending.</p>';
    }
  });

  refresh();
})();
